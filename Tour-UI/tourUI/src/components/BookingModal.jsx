import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function BookingModal(props) {
  const { show, onClose, packageId, destination, duration, price, image } = props;
  const navigate=useNavigate();

  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);


  const totalAmount = Number(price) * Number(numberOfPeople);

  const handleConfirm = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // ✅ BLOCK booking if user is NOT logged in
    if (!token || !userId) {
      setShowLoginPopup(true);
      return;
    }

    const payload = {
      userId: Number(userId),
      tourId: Number(packageId),
      numberOfPeople: Number(numberOfPeople),
      totalAmount: Number(totalAmount)
    };

    setLoading(true);

    axios
      .post("http://localhost:8085/api/bookings", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        setLoading(false);
        onClose();
        navigate("/payment");   // ✅ redirect ONLY after success
      })
      .catch((err) => {
        console.error("Booking failed", err);
        setLoading(false);
      });

      navigate('/payment')
  };

  if (!show) return null;

  return (
    <>
      {/* MAIN BOOKING MODAL */}
      <div className="modal fade show" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Confirm Booking</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="d-flex gap-3">
                <img
                  src={image}
                  alt="tour"
                  style={{ width: "120px", height: "80px", objectFit: "cover" }}
                />
                <div>
                  <div><b>Destination:</b> {destination}</div>
                  <div><b>Duration:</b> {duration}</div>
                  <div><b>Price:</b> Rs. {price}</div>
                </div>
              </div>

              <hr />

              <label>No. of People</label>
              <select
                className="form-select"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>

              <div className="alert alert-info mt-3">
                <b>Total Amount:</b> Rs. {totalAmount}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? "Please wait..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LOGIN REQUIRED POPUP */}
      {showLoginPopup && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Sign in required</h5>
              </div>

              <div className="modal-body">
                Please sign in to continue booking.
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowLoginPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <div className="modal-backdrop fade show"></div>
    </>
  );
}