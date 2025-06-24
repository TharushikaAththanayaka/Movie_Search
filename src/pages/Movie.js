import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import './Movie.css';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const API_KEY = 'a4367180';
const DEFAULT_SEARCH = 'action';

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const getMovieDetails = async (id) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=short`);
    const data = await res.json();
    return data;
  };

  const fetchAndEnrichMovies = async (query = DEFAULT_SEARCH, pageNum = 1) => {
    setIsLoading(true);
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${pageNum}`);
    const data = await res.json();

    if (data.Response === 'True') {
      const enriched = await Promise.all(
        data.Search.map((m) => getMovieDetails(m.imdbID))
      );
      setMovies((prev) => [...prev, ...enriched]);
      if (data.Search.length < 10) setHasMore(false);
    } else {
      if (pageNum === 1) setMovies([]); // clear results if new search fails
      setHasMore(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchAndEnrichMovies(searchQuery.trim() || DEFAULT_SEARCH, 1);
  }, [searchQuery]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAndEnrichMovies(searchQuery.trim() || DEFAULT_SEARCH, nextPage);
  };

  const handleSeeMore = (movie) => {
    navigate(`/movies/${movie.imdbID}`, { state: { movie } });
  };

  return (
    <div className="content">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or year..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button><FaSearch /></button>
      </div>

      <div className="movie-grid">
        {movies
          .filter((movie) => {
            const query = searchQuery.toLowerCase().trim();
            const isYear = /^\d{4}$/.test(query);
            return isYear
              ? movie.Year === query
              : movie.Title.toLowerCase().includes(query);
          })
          .map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onSeeMore={() => handleSeeMore(movie)}
            />
          ))}
      </div>

      {hasMore && !isLoading && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
      {isLoading && <p style={{ textAlign: 'center' }}>Loading...</p>}
    </div>
  );
}
