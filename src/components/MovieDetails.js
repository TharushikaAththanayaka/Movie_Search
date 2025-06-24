import React from 'react';
import { useLocation } from 'react-router-dom';
import './MovieDetails.css'; 

export default function MovieDetails() {
  const { state } = useLocation();
  const movie = state?.movie;

  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className='container1'>
   <div className="movie-details">
  <img src={movie.Poster} alt={movie.Title} />
  <div className="details-text">
    <h2>{movie.Title} ({movie.Year})</h2>
    <div className="detail"><strong>Ratings:</strong> ⭐ {movie.imdbRating}</div>
    <div className="detail"><strong></strong> {movie.Plot}</div>
    <div className="detail"><strong>Genre:</strong> {movie.Genre}</div>
    <div className="detail"><strong>Actors:</strong> {movie.Actors}</div>
    <br/>
    
    <a
      className="watch"
      href={`https://www.imdb.com/title/${movie.imdbID}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Watch Movie
    </a>
  </div>
</div>
</div>
  );
}
