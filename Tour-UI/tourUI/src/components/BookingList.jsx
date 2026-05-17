import { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/BookingList.css";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    axios
      .get(`http://localhost:8085/api/bookings/user/${userId}`, {
        withCredentials: true
      })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings", err);
      });
  }, [userId]);

  
  const handleCancel = (bookingId) => {
    axios
      .put(`http://localhost:8085/api/bookings/${bookingId}/cancel`)
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.id === bookingId
              ? { ...b, status: "CANCELLED" }
              : b
          )
        );
      })
      .catch((err) => {
        console.error("Failed to cancel booking", err);
      });
  };

  return (
    <div className="container mt-4">
      <div className="booking-header">
        <h2 className="booking-title">My Bookings</h2>
      </div>

      {bookings.length === 0 && (
        <p className="no-bookings">No bookings found</p>
      )}

      <div className="row g-4">
        {bookings.map((b) => (
          <div className="col-lg-4 col-md-6" key={b.id}>
            <div className="card booking-card h-100">
              <div className="card-body booking-details">
                <h6 className="booking-id">Booking ID: {b.id}</h6>

                <p>
                  <b>No. of People:</b> {b.numberOfPeople}
                </p>

                <p>
                  <b>Total Amount:</b> ₹{b.totalAmount}
                </p>

                <p>
                  <b>Date:</b>{" "}
                  {new Date(b.bookingDate).toLocaleDateString()}
                </p>

               
                {b.status === "CANCELLED" && (
                  <p>
                    <b>Status:</b>{" "}
                    <span className="text-danger fw-bold">
                      CANCELLED
                    </span>
                  </p>
                )}

                
                {b.status === "CREATED" && (
                  <button
                    className="cancel-btn mt-2"
                    onClick={() => handleCancel(b.id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
