import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import "./index.css";
import NavBar from "./components/NavBar.jsx";
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

  return (
    <BrowserRouter>
      {/* ✅ NAVBAR ALWAYS ON TOP */}
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* ✅ PAGE CONTENT WRAPPER (BUFFER BELOW NAVBAR) */}
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
          <Route path="contact" element={<Contact/>}/>
          <Route
            path="/payment-processing"
            element={<PaymentProcessing />}
          />

          <Route
            path="/admin"
            element={
              localStorage.getItem("role") === "ADMIN"
                ? <AdminDashboard />
                : <Navigate to="/signin" />
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