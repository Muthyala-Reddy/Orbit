import { useEffect, useState } from "react";
import { Link } from "react-router";
 
export default function PaymentProcessing() {
  const [showSuccess, setShowSuccess] = useState(false);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(true);
    }, 2500);
 
    return () => clearTimeout(timer);
  }, []);
 
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
 
      {!showSuccess ? (
        <>
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          />
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
          <Link to="/mybookings"><button className="btn btn-primary">View your bookings</button></Link>
 
        </>
       
      )}
 
 
 
    </div>
  );
}