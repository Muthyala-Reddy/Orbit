import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { destinationPackages } from "./data/packages.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
 
import "./index.css";
import NavBar from "./components/NavBar.jsx";
import AdminNavBar from "./components/AdminNavBar.jsx";
 
import Home from "./components/Home.jsx";
import StarterPage from "./components/StarterPage.jsx";
import SignIn from "./components/SignIn.jsx";
import PackageDetails from "./components/PackageDetails.jsx";
import Feedback from "./components/Feedback.jsx";
import Booking from "./components/Booking.jsx";
import PaymentPage from "./components/PaymentPage.jsx";
import PaymentProcessing from "./components/PaymentProcessing.jsx";
import SignUp from "./components/SignUp.jsx";
import BookingList from "./components/BookingList.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import Contact from "./components/Contact.jsx";
 
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
 
  const role = localStorage.getItem("role");
 
  return (
    <BrowserRouter>
 
      {/* ROLE‑BASED NAVBAR */}
      {isLoggedIn && role === "ADMIN" ? (
        <AdminNavBar setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
 
      <div className="page-content">
        <Routes>
          <Route path="/" element={<StarterPage />} />
          <Route path="/home" element={<Home />} />
 
          <Route
            path="/signin"
            element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
          />
 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/mybookings" element={<BookingList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/package/:id" element={<PackageDetails />} />
 
          <Route
            path="/payment-processing"
            element={<PaymentProcessing />}
          />
 
<Route
  path="/admin"
  element={
    !isLoggedIn ? (
      <Navigate to="/signin" />
    ) : role === "ADMIN" ? (
      <AdminDashboard />
    ) : (
      <Navigate to="/home" />
    )
  }
/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
 
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
 