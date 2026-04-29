import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
 
export default function SignUp(){
 
   
       
const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });
 
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
 
const handleClick = () => {
    axios.post(
  "http://localhost:8085/api/users/signup",
  user,
  {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  }
)
.then((res) => {
  console.log("Signup successful", res.data);
})
.catch((err) => {
  console.error("Signup failed", err);
});

  };
 
 
 
  return (
    <>
      <p className="fw-bold">Create your Orbit account here</p>
 
      <div className="container my-4">
        <div className="row g-3">
 
          <div className="col-md-12">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
 
          <div className="col-md-12">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email Address"
              value={user.email}
              onChange={handleChange}
            />
          </div>
 
          <div className="col-md-12">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
 
          <div className="col-md-12">
            <button className="btn btn-primary w-100" onClick={handleClick}>
              Sign Up
            </button>
          </div>
 
        </div>
      </div>
    </>
  );
 
       
}
 
