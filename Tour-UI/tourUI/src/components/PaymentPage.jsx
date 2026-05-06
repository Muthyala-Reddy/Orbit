import { useState } from "react";
import { Link,useNavigate } from "react-router";

export default function PaymentPage(){
    const navigate=useNavigate();
    const[paymentMethod,setPaymentMethod]=useState("Card");

    const onConfirm=()=>{
        navigate('/payment-processing')
    }



    return(

        <>
        <div className="d-flex flex-column justify-content-center">
            <div className="mb-3 m-3">
                <label className="form-label fw-bold">Choose your payment method:</label>
                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value={'Card'}>Card Payment</option>
                  <option value={'UPI'}>UPI</option>
                 
                </select>
              </div>

        </div>


        {paymentMethod === "Card" && (
  <div className="card p-3 m-3">
    <h5>Card Payment</h5>

    <input
      type="text"
      className="form-control mb-2"
      placeholder="Card Number"
    />

    <div className="d-flex gap-2">
      <input
        type="text"
        className="form-control"
        placeholder="Expiry"
      />
      <input
        type="password"
        className="form-control"
        placeholder="CVV"
      />
    </div>
    <button className="btn btn-primary m-2"onClick={onConfirm}>Make Payment</button>
  </div>
)}

{paymentMethod === "UPI" && (
    <div className="card p-3 m-3 d-flex justify-content-end">
    <h5>UPI Payment</h5>

    <input
      type="text"
      className="form-control mb-2"
      placeholder="UPI ID"
    />
    <button className="btn btn-primary m-2" onClick={onConfirm}>Make Payment</button>
  </div>
)}


        </>
        
    )
}