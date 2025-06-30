import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Movie.css';

const API_KEY = 'a4367180';
const DEFAULT_SEARCH = 'action';

//Parse user query string into title + optional year
const parseQuery = (query) => {
  const yearMatch = query.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? yearMatch[0] : '';
  const title = query.replace(year, '').trim();
  return { title: title || DEFAULT_SEARCH, year };
};

//Fetch movies and enrich with detailed info
const fetchMovies = async ({ queryKey }) => {
  const [_key, { title, page, year }] = queryKey;
  const { data } = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&page=${page}`);
  if (data.Response === 'False') throw new Error(data.Error);

  const enriched = await Promise.all(
    data.Search.map((movie) =>
      axios
        .get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`)
        .then((res) => res.data)
    )
  );

  return year ? enriched.filter((m) => m.Year === year) : enriched;
};

export default function Movie() {
  const [searchQuery, setSearchQuery] = useState('');
  const [parsedQuery, setParsedQuery] = useState({ title: DEFAULT_SEARCH, year: '' });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // useQuery with React Query v5 object syntax
  const {
    data: movies = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['movies', { title: parsedQuery.title, year: parsedQuery.year, page }],
    queryFn: fetchMovies,
    keepPreviousData: true,
  });

  const handleSearch = () => {
    const parsed = parseQuery(searchQuery.trim());
    setParsedQuery(parsed);
    setPage(1);
    refetch();
  };

  const handleSeeMore = (movie) => {
    navigate(`/movies/${movie.imdbID}`, { state: { movie } });
  };

  //Remove duplicates by imdbID
  const UMovies = Array.from(new Map(movies.map((m) => [m.imdbID, m])).values());

  return (
    <div className="content">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or year..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button aria-label="search" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <div className="movie-grid">
        {isLoading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : isError ? (
          <p style={{ textAlign: 'center' }}>Failed to fetch movies.</p>
        ) : (
          UMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onSeeMore={() => handleSeeMore(movie)} />
          ))
        )}
      </div>

      {/*  Simple pagination by updating page number */}
      {!isLoading && !isError && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={() => setPage((prev) => prev + 1)}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
