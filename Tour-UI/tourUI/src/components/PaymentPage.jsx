import { useState } from "react";import { useNavigate } from "react-router";

export default function PaymentPage() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({});

  const validateAndPay = () => {
    const newErrors = {};

    if (paymentMethod === "Card") {
      if (!cardNumber.trim()) newErrors.cardNumber = "Required";
      if (!expiry.trim()) newErrors.expiry = "Required";
      if (!cvv.trim()) newErrors.cvv = "Required";
    }
    if (paymentMethod === "UPI") {
      if (!upiId.trim()) newErrors.upiId = "Required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    navigate("/payment-processing");
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

              <input
                type="text"
                className={`form-control mb-2 ${errors.cardNumber ? "is-invalid" : ""}`}
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              {errors.cardNumber && <div className="invalid-feedback">Please fill this</div>}

              <div className="row g-2">
                <div className="col">
                  <input
                    type="text"
                    className={`form-control ${errors.expiry ? "is-invalid" : ""}`}
                    placeholder="Expiry (MM/YY)"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                  {errors.expiry && <div className="invalid-feedback">Required</div>}
                </div>

                <div className="col">
                  <input
                    type="password"
                    className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                  {errors.cvv && <div className="invalid-feedback">Required</div>}
                </div>
              </div>

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
              {errors.upiId && <div className="invalid-feedback">Please fill this</div>}

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
