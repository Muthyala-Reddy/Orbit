import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function BookingModal(props) {
  const { show, onClose, packageId, destination, duration, price, image } = props;
  const navigate=useNavigate();

  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  
const [hotelType, setHotelType] = useState("3star");
const [vehicleType, setVehicleType] = useState("hatchback");
const [includeFlight, setIncludeFlight] = useState(true);
const [buffet, setBuffet] = useState(false);

const [contactName, setContactName] = useState("");
const [contactPhone, setContactPhone] = useState("");
const [errors, setErrors] = useState({});

const days = Number(duration.split("/")[0].replace("N", ""));


const totalAmount = Number(price) * Number(numberOfPeople);


const validate = () => {
  let newErrors = {};

  if (!contactName.trim()) {
    newErrors.contactName = "Name is required";
  }

  if (!contactPhone.trim()) {
    newErrors.contactPhone = "Phone number is required";
  } else if (!/^\d{10}$/.test(contactPhone)) {
    newErrors.contactPhone = "Enter valid 10-digit number";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};





  let extraAmount = 0;


    if (hotelType === "4star") extraAmount += 4500;
    if (hotelType === "5star") extraAmount += 8000;

    if (vehicleType === "sedan") extraAmount += 2500;
    if (vehicleType === "luxury") extraAmount += 5000;


    if (!includeFlight) extraAmount -= numberOfPeople*2500;

    if (buffet) extraAmount += (750*numberOfPeople)*days;

const updatedTotal = totalAmount + extraAmount;

  const handleConfirm = () => {
     if (!validate()) return;
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    
    if (!token || !userId) {
      setShowLoginPopup(true);
      return;
    }

    const payload = {
      userId: Number(userId),
      tourId: Number(packageId),
      numberOfPeople: Number(numberOfPeople),
      totalAmount: Number(updatedTotal)
    };

    onClose();

    navigate('/payment',{state:payload});
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
              <label className="fw-bold">Hotel Selection</label>
              <div className="d-flex gap-3 mt-2 justify-content-center">

              <div>
                <input
                  type="radio"
                  name="hotel"
                  value="3star"
                  checked={hotelType === "3star"}
                  onChange={(e) => setHotelType(e.target.value)}
                />
                <span className="ms-1">3⭐ (Default)</span>
              </div>

              <div>
                <input
                  type="radio"
                  name="hotel"
                  value="4star"
                  checked={hotelType === "4star"}
                  onChange={(e) => setHotelType(e.target.value)}
                />
                <span className="ms-1">4⭐ (+4500)</span>
              </div>

              <div>
                <input
                  type="radio"
                  name="hotel"
                  value="5star"
                  checked={hotelType === "5star"}
                  onChange={(e) => setHotelType(e.target.value)}
                />
                <span className="ms-1">5⭐ (+8000)</span>
              </div>

</div>


              <hr />
              <label className="fw-bold">Transport Selection</label>
              <div className="d-flex gap-3 mt-2 justify-content-center">

              <div>
                <input
                  type="radio"
                  name="vehicle"
                  value="hatchback"
                  checked={vehicleType === "hatchback"}
                  onChange={(e) => setVehicleType(e.target.value)}
                />
                <span className="ms-1">Hatchback (Default)</span>
              </div>

              <div>
                <input
                  type="radio"
                  name="vehicle"
                  value="sedan"
                  checked={vehicleType === "sedan"}
                  onChange={(e) => setVehicleType(e.target.value)}
                />
                <span className="ms-1">Sedan (+2500)</span>
              </div>

              <div>
                <input
                  type="radio"
                  name="vehicle"
                  value="luxury"
                  checked={vehicleType === "luxury"}
                  onChange={(e) => setVehicleType(e.target.value)}
                />
                <span className="ms-1">Luxury (+5000)</span>
              </div>

            </div>

              <hr />
              <label className="fw-bold">Flight Option</label>

              <div className="mt-2">
                <input
                  type="checkbox"
                  checked={includeFlight}
                  onChange={() => setIncludeFlight(!includeFlight)}
                />
                <span className="ms-2">
                  Include Flight (Uncheck = -2500 per person)
                </span>
              </div>

              <hr />
              <label className="fw-bold">Meal Option</label>

              <div className="mt-2">
                <input
                  type="checkbox"
                  checked={buffet}
                  onChange={() => setBuffet(!buffet)}
                />
                <span className="ms-2">
                  Buffet (+750/day)
                </span>
              </div>

              

              <hr/>
              <label className="mt-3">No. of People</label>
              
              <select
                className="form-select"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>


              <hr />
              <label className="fw-bold">Primary Contact</label>

              <input
                className="form-control mt-2"
                placeholder="Enter Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />


                            
              {errors.contactName && (
                <small className="text-danger">{errors.contactName}</small>
              )}


              <input
                className="form-control mt-2"
                placeholder="Enter Phone Number"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />


              {errors.contactPhone && (
                <small className="text-danger">{errors.contactPhone}</small>
              )}

              <div className="alert alert-info mt-3">
                <b>Total Amount:</b> Rs. {updatedTotal}
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