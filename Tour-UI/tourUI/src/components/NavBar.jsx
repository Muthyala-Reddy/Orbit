import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router";
import "../Styles/NavBar.module.css";

export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand bg-light fixed-top opacity-75">
      <div className="container-fluid px-4">

        <Link className="navbar-brand fw-bold" to="/home">
          Orbit
        </Link>

        <ul className="navbar-nav ms-auto me-3">
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>

          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/mybookings">
                My Bookings
              </Link>
            </li>
          )}

          <li className="nav-item">
            <a className="nav-link" href="/contact">
              Contact Us
            </a>
          </li>
        </ul>

        {!isLoggedIn ? (
          <Link to="/signin">
            <button className="btn btn-outline-warning">
              Sign In
            </button>
          </Link>
        ) : (
          <button
            className="btn btn-outline-warning"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
