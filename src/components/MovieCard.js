import React from 'react'
import { useState} from 'react'
import '../components/MovieCard.css'


export default function MovieCard({movie,onSeeMore}) {   
  return (
    <div className='movie_card'>
        <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}//if movie poster is not available,generate temporary or fallback image
        alt={movie.Title}
        className="movie-poster"
      />
      <div className='movie_info'>
        <h2>{movie.Title}</h2>
        <h3>{movie.Year}</h3>
        <p>⭐ {movie.imdbRating}</p>
      </div>
    
    <div className='movie_button'>
        <button onClick={() => onSeeMore(movie)}>See More</button>
        </div>
    </div>
    
  )
}
