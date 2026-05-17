import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

import ChatWidget from "./ChatWidget";
 
export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
 
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/signin");
  };
 
  return (
    <>
      <nav className="navbar navbar-expand bg-light fixed-top opacity-75">
        <div className="container-fluid px-4">
          <Link className="navbar-brand fw-bold" to="/home">
            Orbit
          </Link>
 
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
 
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/mybookings">My Bookings</Link>
              </li>
            )}
 
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
 
          
            <li className="nav-item">
              <button
                className="btn btn-outline-secondary rounded-circle"
                onClick={() => setChatOpen(!chatOpen)}
                style={{ width: 55, height: 40 }}
              >
              🤖
              </button>
            </li>
 
            <li className="nav-item">
              {!isLoggedIn ? (
                <Link to="/signin">
                  <button className="btn btn-outline-warning">Sign In</button>
                </Link>
              ) : (
                <button className="btn btn-outline-warning" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
 
     <ChatWidget
      open={chatOpen}
      onClose={() => setChatOpen(false)}
    />

    </>
  );
}