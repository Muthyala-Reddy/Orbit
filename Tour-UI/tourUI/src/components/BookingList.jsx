import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingList() {

  const [bookings, setBookings] = useState([]);
//   const userId = localStorage.getItem("userId"); // stored at login/signup

  useEffect(() => {
   

    axios
      .get(`http://localhost:8085/api/bookings/user/0`, {
        withCredentials: true
      })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings", err);
      });

  }, []);

  return (
    <div className="container mt-4">
      <h2>My Bookings</h2>

      {bookings.length === 0 && (
        <p>No bookings found</p>
      )}

      {bookings.map((b) => (
        <div className="card mb-3" key={b.id}>
          <div className="card-body">
            <h5 className="card-title">Booking ID: {b.id}</h5>
           
            <p><b>No. of People:</b> {b.numberOfPeople}</p>
            <p><b>Total Amount:</b> ₹{b.totalAmount}</p>
            <p><b>Status:</b> {b.status}</p>
            <p><b>Date:</b> {b.bookingDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
