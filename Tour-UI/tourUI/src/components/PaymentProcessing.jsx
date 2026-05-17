import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

import { useRef } from "react";

export default function PaymentProcessing() {

  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state;
  

const hasCalled = useRef(false);


  if (!data) {
    navigate("/", { replace: true });
    return null;
  }

  const bookingData = data.bookingData;
  const paymentMethod = data.paymentMethod;

  const handlePayment = async () => {
  try {

    
    const bookingId = data?.bookingId;
    const amount = data?.amount;
    const paymentMethod = data?.paymentMethod;

    if (!bookingId) {
      console.error("Booking ID missing:", data);
      return;
    }

    await axios.post("http://localhost:8085/api/payments", {
      bookingId: Number(bookingId),
      amount: Number(amount),
      paymentMethod: paymentMethod
    });

    console.log("Payment saved successfully");

  } catch (error) {
    console.error("Payment Failed:", error.response?.data || error);
  }
};




useEffect(() => {

  if (hasCalled.current) return;
  hasCalled.current = true;

  const processPayment = async () => {
    await handlePayment(); 

    setTimeout(() => {
      setShowSuccess(true);
    }, 1500);
  };

  processPayment();

}, []);


  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">

      {!showSuccess ? (
        <>
          <div className="spinner-border text-primary mb-3" role="status" />
          <h5 className="fw-bold">Processing Payment...</h5>
          <p className="text-muted">Please do not refresh the page</p>
        </>
      ) : (
        <>
          <h2 className="text-success fw-bold mb-3">
            Thank you for choosing Orbit!
          </h2>
          <p className="fs-5">
            The rest of the details will be shared with you shortly!!
          </p>

          <Link to="/mybookings">
            <button className="btn btn-primary">
              View your bookings
            </button>
          </Link>
        </>
      )}

    </div>
  );
}
