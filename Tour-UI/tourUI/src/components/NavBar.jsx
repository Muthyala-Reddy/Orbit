import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router";

export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setIsLoggedIn(false);   // ✅ update React state
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand bg-primary">
      <div className="container-fluid px-4">

        <Link className="navbar-brand fw-bold" to="/home">
          Orbit
        </Link>

        <ul className="navbar-nav ms-auto me-3">
          <li className="nav-item">
            <Link className="nav-link active" to="/home">
              Home
            </Link>
          </li>

          {/* ✅ Show only after login */}
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/mybookings">
                My Bookings
              </Link>
            </li>
          )}

          <li className="nav-item">
            <a className="nav-link" href="#contact">
              Contact Us
            </a>
          </li>
        </ul>

        {/* ✅ Conditional Auth Button */}
        {!isLoggedIn ? (
          <Link to="/signin">
            <button className="btn btn-light">Sign In</button>
          </Link>
        ) : (
          <button className="btn btn-light" onClick={handleLogout}>
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}