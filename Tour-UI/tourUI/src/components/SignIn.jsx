import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
 
/* ===== Eye Icons ===== */
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
 
const EyeSlashIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" />
  </svg>
);
 
export default function SignIn({ setIsLoggedIn }) {
  const navigate = useNavigate();
 
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
 
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError("");
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    axios
      .post("http://localhost:8085/api/users/login", {
        email: user.email,
        password: user.password
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("name", res.data.user.name);

        
        const pending = localStorage.getItem("pendingBooking");
          if (pending) {
            const { packageId, autoOpen } = JSON.parse(pending);
            localStorage.removeItem("pendingBooking");
            navigate(`/package/${packageId}`, { state: { autoOpen } });
            return;
          }

          
        console.log(res.data);

        setIsLoggedIn(true);
 
        if (res.data.user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      })
      .catch(() => setError("Invalid email or password"));
  };
 
  return (
    <div className="signin-bg d-flex justify-content-center">
      <div className="container d-flex justify-content-end align-items-center py-5 opacity-75">
      <div className="card p-4 signup-card">
        <h3 className="fw-bold text-center mb-2">Welcome Back to Orbit</h3>
        <p className="text-muted text-center mb-4">
          Sign in to continue your journey
        </p>
 
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className={`form-control ${error ? "is-invalid" : ""}`}
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`form-control ${error ? "is-invalid" : ""}`}
                value={user.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
            {error && (
              <div className="invalid-feedback d-block">{error}</div>
            )}
          </div>
 
          <button type="submit" className="btn btn-warning w-100 fw-bold mt-2">
            Sign In
          </button>
        </form>
 
        <p className="mt-3 text-center">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
 
 
    </div>
   
  );
}