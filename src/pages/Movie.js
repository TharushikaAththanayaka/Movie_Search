import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import './Movie.css';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';


const API_KEY = 'a4367180';
const initialTitles = ['Inception', 'Titanic', 'Avatar', 'Interstellar', 'The Matrix', 'Gladiator', 'The Godfather', 'Forrest Gump', 'The Dark Knight', 'The Avengers'];

export default function Movie() {
  const [allMovies, setAllMovies] = useState([]);
   const [searchTitle, setSearchTitle] = useState('');
   const [searchYear, setSearchYear] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  



const navigate = useNavigate();

const handleSeeMore = (movie) => {
  navigate(`/movies/${movie.imdbID}`, { state: { movie } });
};

  useEffect(() => {
    const fetchMovies = async () => {
      const results = await Promise.all(
        initialTitles.map(async (title) => {
          const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
          return await res.json();
        })
      );
      setAllMovies(results.filter((m) => m.Response === 'True'));
    };

    fetchMovies();
  }, []);

  const filteredMovies = allMovies.filter((movie) => {
  const query = searchQuery.toLowerCase().trim();
  const isYear = /^\d{4}$/.test(query); // checks if it's a 4-digit year
  return isYear
    ? movie.Year === query
    : movie.Title.toLowerCase().includes(query);
});


  return (
    <div className="content">
      <div className="search-bar">
  <input
    type="text"
    placeholder="Search by title or year..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <button>
    <FaSearch />
  </button>
</div>

      <div className="movie-grid">
        {filteredMovies.map((movie) => (
        <MovieCard
        key={movie.imdbID}
        movie={movie}
        
        onSeeMore={() => handleSeeMore(movie)}
      />

        ))}
      </div>
    </div>
  );
}
