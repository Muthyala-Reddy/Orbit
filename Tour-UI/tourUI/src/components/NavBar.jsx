import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


export default function NavBar() {
  

  return (
    <>
      <nav className="navbar navbar-expand bg-warning px-4">
        <a className="navbar-brand fw-bold" href="#hero">
          Orbit <span> </span>
        </a>

        <ul className="navbar-nav ms-auto me-3">
          <li className="nav-item">
            <a className="nav-link active" href="#hero">
              Home
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#service">
              Services
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#recommendation">
              Places
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">
              Contact Us
            </a>
          </li>
        </ul>

        <button className="btn btn-light">Sign Up</button>
      </nav>
    </>
  );
}