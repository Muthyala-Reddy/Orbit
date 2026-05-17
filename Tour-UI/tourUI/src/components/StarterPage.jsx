import { Link } from 'react-router';
import './styles.css';

export default function StarterPage() {
  return (
    <div className="hero-wrapper">

   
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/beach2.mp4" type="video/mp4" />
      </video>

      <div className="overlay"></div>

  
      <div className="hero-content text-center">
        <h1 className="hero-title">Welcome to Orbit</h1>
        <p className="hero-subtitle">Travel, beautifully planned</p>

        <Link to="/home">
          <button className="btn btn-light hero-btn">
            Get Started
          </button>
        </Link>

    
      </div>

    </div>
  );
}