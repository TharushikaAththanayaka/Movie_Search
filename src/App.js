import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
import MovieDetails from './components/MovieDetails/MovieDetails';
import { useState } from 'react';
function App() {
 
  return (
    <>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movie />} />  
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
