import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router";

export default function SignIn({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password
    };

    axios
      .post("http://localhost:8085/api/users/login", loginData)
      .then((res) => {
        // ✅ store auth data
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);

        // ✅ UPDATE REACT STATE (this fixes navbar instantly)
        setIsLoggedIn(true);

        navigate("/home");
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  return (
    <>
      <div className="signinbg">
        <div className="text-center signpage-head">
          <h1 className="fw-bold text-light mb-5">Orbit</h1>
        </div>

        <div className="bg-white p-5 box-cover">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-dark fw-bold">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-dark fw-bold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>

            <p className="mt-3 text-center">
              If you don’t have an account{" "}
              <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
