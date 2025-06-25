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
  const [parsedQuery, setParsedQuery] = useState({ title: DEFAULT_SEARCH, year: '' });

  const navigate = useNavigate();

    const parseQuery = (query) => {
    const yearMatch = query.match(/\b(19|20)\d{2}\b/); //search year as 4 digits
    const year = yearMatch ? yearMatch[0] : ''; //if the year found display the year, if not empty string
    const title = query.replace(year, '').trim(); 
    return { title: title || DEFAULT_SEARCH, year };
  };

  const getMovieDetails = async (id) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=short`);
    return await res.json();
  };

  const fetchAndEnrichMovies = async (title, pageNum = 1, filterYear = '') => {
    setIsLoading(true);
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&page=${pageNum}`);
    const data = await res.json();

    if (data.Response === 'True') {
      let enriched = await Promise.all(
        data.Search.map((m) => getMovieDetails(m.imdbID))
      );

      // Optional client-side year filtering
      if (filterYear) {
        enriched = enriched.filter((movie) => movie.Year === filterYear);
      }

      setMovies((prev) => [...prev, ...enriched]);
      if (data.Search.length < 10) setHasMore(false);//if the data <10, the current page is hit(no load more data)
    } else {
      if (pageNum === 1) setMovies([]);
      setHasMore(false);
    }
    setIsLoading(false);//after all data fetched, close the loading
  };

  const handleSearch = () => {
  const parsed = parseQuery(searchQuery.trim());
    setParsedQuery(parsed);
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchAndEnrichMovies(parsed.title, 1, parsed.year);
  };

  useEffect(() => {
    // Initial load or when parsedQuery changes
    fetchAndEnrichMovies(parsedQuery.title, page, parsedQuery.year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setPage(1);
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onSeeMore={() => handleSeeMore(movie)}
          />
        ))}
      </div>

      

      {hasMore && !isLoading && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={() => setPage((prev) => prev + 1)}>
            Load More
          </button>
        </div>
      )}

      {isLoading && <p style={{ textAlign: 'center' }}>Loading...</p>}
    </div>
  );
}
