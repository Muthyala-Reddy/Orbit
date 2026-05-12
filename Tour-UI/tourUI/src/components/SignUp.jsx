import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; // ✅ your global CSS

/* ===== Eye Icons (outside JSX) ===== */
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
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
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" />
    <path
      d="M10.6 10.6a3 3 0 0 0 4.24 4.24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

export default function SignUp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!user.name.trim()) newErrors.name = "Please enter your name";
    if (!user.email.trim()) newErrors.email = "Please enter your email address";

    if (!user.password.trim()) newErrors.password = "Please enter a password";
    else if (user.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!user.confirmPassword.trim())
      newErrors.confirmPassword = "Please confirm your password";
    else if (user.confirmPassword !== user.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) return;

    axios
      .post(
        "http://localhost:8085/api/users/signup",
        {
          name: user.name,
          email: user.email,
          password: user.password
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => navigate("/signin"))
      .catch((err) => console.error("Signup failed", err));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div className="card p-4 signup-card">
        <h3 className="fw-bold text-center mb-2">Create an Orbit Account</h3>
        <p className="text-muted text-center mb-4">
          Sign up to explore and book amazing travel experiences
        </p>

        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={user.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={user.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={user.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block">{errors.password}</div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              value={user.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? "Hide confirm password" : "Show confirm password"
              }
            >
              {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
          )}
        </div>

        <button className="btn btn-warning w-100 fw-bold mt-2" onClick={handleSignup}>
          Sign Up
        </button>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
