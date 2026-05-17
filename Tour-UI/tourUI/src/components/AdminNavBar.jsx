import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router";
 
export default function AdminNavBar({ setIsLoggedIn }) {
  const navigate = useNavigate();
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
 
    setIsLoggedIn(false);
    navigate("/signin");
  };
 
  return (
    <nav className="navbar navbar-expand bg-dark fixed-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold text-warning" to="/admin">
          Orbit Admin
        </Link>
 
        <ul className="navbar-nav ms-auto me-3">
          <li className="nav-item">
            <Link className="nav-link text-light" to="/admin">
              Dashboard
            </Link>
          </li>
 
          
        </ul>
 
        <button
          className="btn btn-outline-warning"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}