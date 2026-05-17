import { useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location=useLocation();
  const bookingData=location.state;
  const promoList = ["ORBIT20", "ORBIT10", "NEWUSER"];

  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState("");
  const [finalAmount,setFinalAmount]=useState(bookingData.totalAmount);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [showPromoBox, setShowPromoBox] = useState(false);
  const [promoMsg, setPromoMsg] = useState("");



  
const handlePromoClick = (code) => {
  setPromoCode(code);
};


  
  const detectCardType = (number) => {
    if (number.startsWith("4")) return "Visa";
    if (/^5[1-5]/.test(number)) return "Mastercard";
    if (number.startsWith("3")) return "Amex";
    if (number.startsWith("6")) return "Discover";
    return "";
  };




  const applyPromo = async () => {
  if (isPromoApplied) return;

  setPromoMsg(""); 
  const baseAmount = Number(bookingData.totalAmount);

  
  if (promoCode === "ORBIT20") {
    setFinalAmount(baseAmount * 0.8);
    setIsPromoApplied(true);
    return;
  }

  if (promoCode === "ORBIT10") {
    setFinalAmount(baseAmount * 0.9);
    setIsPromoApplied(true);
    return;
  }

  if (promoCode === "NEWUSER") {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setPromoMsg("Please sign in to use NEWUSER promo");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8085/api/bookings/user/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
       
      });

      if (!res.ok) {
        setPromoMsg("Could not verify NEWUSER eligibility");
        return;
      }

      const bookings = await res.json(); 
      if (Array.isArray(bookings) && bookings.length === 0) {
        setFinalAmount(baseAmount * 0.75);
        setIsPromoApplied(true);
        setPromoMsg("NEWUSER applied (25% off)");
      } else {
        setPromoMsg("NEWUSER promo is only for first booking");
      }
    } catch (err) {
      console.error(err);
      setPromoMsg("Network error while checking NEWUSER promo");
    }

    return;
  }

  
  setPromoMsg("Promo not available yet");
};



  
const removePromo = () => {
  setPromoCode("");
  setIsPromoApplied(false);
  setFinalAmount(bookingData.totalAmount);
};



 const validateAndPay = async () => {
  const newErrors = {};

  if (paymentMethod === "Card") {
    if (!/^\d{16}$/.test(cardNumber)) newErrors.cardNumber = "Card number must be 16 digits";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) newErrors.expiry = "Use format MM/YY";
    if (!/^\d{3}$/.test(cvv)) newErrors.cvv = "CVV must be 3 digits";
  }

  if (paymentMethod === "UPI") {
    if (!upiId.includes("@")) newErrors.upiId = "Enter valid UPI ID (example@upi)";
  }

  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  try {
   
    const bookingRes = await fetch("http://localhost:8085/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...bookingData,
        totalAmount: Number(finalAmount), 
      }),
    });

    if (!bookingRes.ok) {
      console.error("Booking API failed:", bookingRes.status);
      return;
    }

    const savedBooking = await bookingRes.json();

    
    const bookingId = savedBooking?.id ?? savedBooking?.bookingId;

    if (!bookingId) {
      console.error("Booking ID not returned. Booking response =", savedBooking);
      return;
    }

    
    navigate("/payment-processing", {
      replace: true,
      state: {
        bookingId: Number(bookingId),
        amount: Number(finalAmount),
        paymentMethod: paymentMethod === "Card" ? "CARD" : "UPI",
      },
    });

  } catch (error) {
    console.error("Payment flow failed", error);
  }
};

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <h3 className="fw-bold mb-4 text-center">
            Complete Your Payment
          </h3>

          {/* Payment method selector */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Payment Method
            </label>
            <select
              className="form-select"
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setErrors({});
              }}
            >
              <option value="Card">Card Payment</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

         {/* CARD PAYMENT */}
{paymentMethod === "Card" && (
  <div className="border rounded p-3 mt-4">
    <h6 className="fw-semibold mb-3">Card Details</h6>

   
    <div className="position-relative">

      <input
        type="text"
        className={`form-control mb-2 ${errors.cardNumber ? "is-invalid" : ""}`}
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "").slice(0, 16);
          setCardNumber(value);
          setCardType(detectCardType(value));
        }}
      />

    
      {cardType && (
        <span className="card-badge">
          {cardType === "Visa" && "💳 Visa"}
          {cardType === "Mastercard" && "💳 Mastercard"}
          {cardType === "Amex" && "💳 Amex"}
          {cardType === "Discover" && "💳 Discover"}
        </span>
      )}
    </div>

   
    {errors.cardNumber && (
      <div className="invalid-feedback d-block">
        {errors.cardNumber}
      </div>
    )}

   
    <div className="row g-2">
      <div className="col">
        <input
          type="text"
          className={`form-control ${errors.expiry ? "is-invalid" : ""}`}
          placeholder="Expiry (MM/YY)"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        {errors.expiry && (
          <div className="invalid-feedback d-block">
            {errors.expiry}
          </div>
        )}
      </div>

      <div className="col">
        <input
          type="password"
          className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
          placeholder="CVV"
          value={cvv}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 3);
            setCvv(val);
          }}
        />
        {errors.cvv && (
          <div className="invalid-feedback d-block">
            {errors.cvv}
          </div>
        )}
      </div>
    </div>

    <p className="mt-2">Final Amount Payable Rs. {finalAmount}</p>




    <div className="mt-3 position-relative">

  <input
    className="form-control text-center"
    type="text"
    placeholder="Enter promo code"
    value={promoCode}
    disabled={isPromoApplied}
    onFocus={() => setShowPromoBox(true)}
    onBlur={() => setTimeout(() => setShowPromoBox(false), 150)}
    onChange={(e) => setPromoCode(e.target.value)}
  />

 {!isPromoApplied ? (
  <button
    className="btn btn-success w-100 mt-2"
    onClick={applyPromo}
    type="button"
  >
    Apply
  </button>
) : (
  <div className="d-flex gap-2 mt-2">
    <button className="btn btn-success w-75" disabled>
      Promo Applied 
    </button>

    <button
      className="btn btn-danger w-25"
      onClick={removePromo}
      type="button"
    >
      Remove
    </button>
  </div>
)}

  {showPromoBox && !isPromoApplied && (
    <div
      className="card shadow-sm mt-2"
      style={{
        position: "absolute",
        width: "100%",
        zIndex: 50
      }}
    >
      <div className="card-body py-2">
        <p className="mb-2 fw-semibold">Available offers</p>

        <div className="d-flex gap-2 flex-wrap justify-content-center">
          {promoList.map((code, index) => (
            <button
              key={index}
              type="button"
              className="btn btn-outline-primary btn-sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setPromoCode(code);
                setShowPromoBox(false);
              }}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </div>
  )}

{promoMsg && (
  <p className="text-center mt-2 text-muted text-danger">
    {promoMsg}
  </p>
)}

</div>

<br/>
  <br/>
  <br/>
  <br/>
  <br/>


    {/* Submit */}
    <button
      className="btn btn-primary w-100 mt-4"
      onClick={validateAndPay}
    >
      Make Payment
    </button>





    
    

  </div>
)}

          {/* UPI PAYMENT */}
          {paymentMethod === "UPI" && (
            <div className="border rounded p-3 mt-4">
              <h6 className="fw-semibold mb-3">UPI Details</h6>

              <input
                type="text"
                className={`form-control mb-3 ${errors.upiId ? "is-invalid" : ""}`}
                placeholder="UPI ID (example@upi)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />


              <p className="mt-2">Final Amount Payable Rs. {finalAmount}</p>
              {errors.upiId && <div className="invalid-feedback">Please fill this and check if there is an @</div>}


              <div className="mt-3 position-relative">

  <input
    className="form-control text-center"
    type="text"
    placeholder="Enter promo code"
    value={promoCode}
    disabled={isPromoApplied}
    onFocus={() => setShowPromoBox(true)}
    onBlur={() => setTimeout(() => setShowPromoBox(false), 150)}
    onChange={(e) => setPromoCode(e.target.value)}
  />

{!isPromoApplied ? (
  <button
    className="btn btn-success w-100 mt-2"
    onClick={applyPromo}
    type="button"
  >
    Apply
  </button>
) : (
  <div className="d-flex gap-2 mt-2">
    <button className="btn btn-success w-75" disabled>
      Promo Applied
    </button>

    <button
      className="btn btn-danger w-25"
      onClick={removePromo}
      type="button"
    >
      Remove
    </button>
  </div>
)}

{showPromoBox && !isPromoApplied && (
    <div
      className="card shadow-sm mt-2"
      style={{
        position: "absolute",
        width: "100%",
        zIndex: 50
      }}
    >
      <div className="card-body py-2">
        <p className="mb-2 fw-semibold">Available offers</p>

        <div className="d-flex gap-2 flex-wrap justify-content-center">
          {promoList.map((code, index) => (
            <button
              key={index}
              type="button"
              className="btn btn-outline-primary btn-sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setPromoCode(code);
                setShowPromoBox(false);
              }}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
    </div>
  )}



  {promoMsg && (
  <p className="text-center mt-2 text-muted text-danger">
    {promoMsg}
  </p>
)}
  

</div>

    

 <br/>
  <br/>
  <br/>
  <br/>
  <br/>


              <button
                className="btn btn-primary w-100"
                onClick={validateAndPay}
              >
                Make Payment
              </button>
            </div>
          )}



        </div>
      </div>
    </div>
  );
}
