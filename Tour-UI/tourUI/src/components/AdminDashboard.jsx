import { useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [userId, setUserId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchBookingsForUser = (event) => {
    event.preventDefault();

    if (!userId) {
      setError("Please enter a user ID.");
      return;
    }

    setLoading(true);
    setError("");

    axios
      .get(`http://localhost:8085/api/bookings/user/${userId}`, {
        headers,
        withCredentials: true,
      })
      .then((res) => {
        setBookings(res.data || []);
      })
      .catch((err) => {
        console.error("Unable to fetch bookings", err);
        setError("Unable to fetch bookings for this user. Please verify the user ID.");
        setBookings([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancelBooking = (bookingId) => {
    axios
      .put(`http://localhost:8085/api/bookings/${bookingId}/cancel`, null, {
        headers,
        withCredentials: true,
      })
      .then(() => {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === bookingId
              ? { ...booking, status: "CANCELLED" }
              : booking
          )
        );
      })
      .catch((err) => {
        console.error("Unable to cancel booking", err);
        setError("Failed to cancel booking.");
      });
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="text-muted">
            Search bookings by user ID and cancel bookings from the admin view.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading bookings…</div>}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form className="row g-3 align-items-end" onSubmit={fetchBookingsForUser}>
            <div className="col-md-8">
              <label className="form-label">User ID</label>
              <input
                type="text"
                className="form-control"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter a user ID to load bookings"
              />
            </div>
            <div className="col-md-4 d-grid">
              <button type="submit" className="btn btn-primary">
                Load Bookings
              </button>
            </div>
          </form>
          <p className="text-muted mt-3 mb-0">
            Note: backend currently provides only user-specific booking lookup and booking cancellation.
          </p>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title">Bookings</h4>

          {bookings.length === 0 && !loading ? (
            <p className="text-muted">No bookings loaded. Search by user ID above.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Package</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => {
                    const packageName = booking.package?.name || booking.packageName || "Package";
                    return (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{packageName}</td>
                        <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                        <td>{booking.status || "CREATED"}</td>
                        <td>
                          {booking.status !== "CANCELLED" ? (
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel
                            </button>
                          ) : (
                            <span className="badge bg-secondary">Cancelled</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
