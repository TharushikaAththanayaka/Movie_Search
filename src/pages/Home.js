import React from 'react'
import '../pages/Home.css'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

const handleExplore = () => {
  navigate('/movies');
};
  return (
    <div className="container">
  <div className="bg bg1"></div>
  <div className="bg bg2"></div>
  <div className="bg bg3"></div>

  <div className="caption">
    <p>Find Movies That Match Your Mood! 
    Whether you're feeling happy, sad, curious or nostalgic - there's movie waiting for you.</p>
  </div>
  <div className="button">
    <button onClick={handleExplore}>Explore More</button>
  </div>
</div>
  )
}
