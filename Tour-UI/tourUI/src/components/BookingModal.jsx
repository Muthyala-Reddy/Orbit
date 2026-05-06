import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function BookingModal(props) {
  const { show, onClose, packageId, destination, duration, price, image } = props;
  const navigate=useNavigate();

  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalAmount = Number(price) * Number(numberOfPeople);

  const handleConfirm = () => {
    const userId = Number(localStorage.getItem("userId"));

    const payload = {
      userId: userId,
      tourId: Number(packageId),
      numberOfPeople: Number(numberOfPeople),
      totalAmount: Number(totalAmount)
    };

    setLoading(true);

    axios
      .post("http://localhost:8085/api/bookings", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        console.log("Booking created", res.data);
        setLoading(false);
        onClose();
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
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Confirm Booking</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="d-flex gap-3">
                <img src={image} alt="tour" style={{ width: "120px", height: "80px", objectFit: "cover" }} />
                <div>
                  <div><b>Destination:</b> {destination}</div>
                  <div><b>Duration:</b> {duration}</div>
                  <div><b>Price (per person):</b> Rs. {price}</div>
                  <div><b>Package ID:</b> {packageId}</div>
                </div>
              </div>

              <hr />

              <div className="mb-3">
                <label className="form-label">No. of People</label>
                <select
                  className="form-select"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </select>
              </div>

              <div className="alert alert-info mb-0">
                <b>Total Amount:</b> Rs. {totalAmount}
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>

              <button
                type="button"
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

      <div className="modal-backdrop fade show"></div>
    </>
  );
}
