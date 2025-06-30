import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
import MovieDetails from './components/MovieDetails/MovieDetails';

// ✅ Create React Query client
const queryClient = new QueryClient();

function App() {
  return (
    // ✅ Wrap the entire app with QueryClientProvider
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
