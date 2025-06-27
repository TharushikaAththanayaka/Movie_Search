import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo2.png';
import './NavBar.css';

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar_logo">
        <img src={logo} alt="App Logo" />
      </div>
      <nav className="navbar_links">
        <Link to="/" className="navbar_link">Home</Link>
        <Link to="/movies" className="navbar_link">Movies</Link>
       
      </nav>
    </div>
  );
}
