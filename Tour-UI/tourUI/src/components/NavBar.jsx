import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from 'react-router';
 
 
export default function NavBar() {
 
 
  return (
    <>
      <nav className="navbar navbar-expand bg-warning">
  <div className="container-fluid px-4">
    
    <a className="navbar-brand fw-bold" href="/home">
      Orbit
    </a>

    <ul className="navbar-nav ms-auto me-3">
      <li className="nav-item">
        <a className="nav-link active" href="/home">Home</a>
      </li>
      
     <li className="nav-item">
        <a className="nav-link" href="#">My Bookings</a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="#contact">Contact Us</a>
      </li>

      
      
    </ul>

    <Link to="/signin"><button className="btn btn-light">Sign In</button></Link>
    

  </div>
</nav>

    </>
  );
}