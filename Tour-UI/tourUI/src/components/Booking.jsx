import { useLocation } from "react-router";
import { useState } from "react";
import BookingModal from "./BookingModal";
import './styles.css'

export default function Booking() {
  const { state } = useLocation();
  const [showModal,setshowModal]=useState(false);

  if (!state) return <h2>No booking selected</h2>;


  const handleClick=()=>{
    
        setshowModal(true)
       
        
    

  }

  return (
    <>
    <div >
    <div className="container d-flex justify-content-center flex-column align-self text-center">
    
      <img src={state.image} alt="img" className="w-100 booking-img"/>
     
    </div>
    <br/>
    <br/>

    
<div className="d-flex flex-row justify-content-center">
<ul className="list-group">
  {state.itinerary.map((item, idx) => (
    <li key={idx} className="list-group-item m-1 shadow">
      <strong>{item.day}: {item.title}</strong>
      <p className="mb-0">{item.description}</p>
    </li>
  ))}
</ul>    
    
</div>    


 <br/>
 <br/>

 <p className="fw-bold">Main Contact Information</p>

<div className="row g-3">
  <div className="col-md-4">
    <label className="form-label">Full Name</label>
    <input type="text" className="form-control" />
  </div>

  <div className="col-md-4">
    <label className="form-label">Contact Number</label>
    <input type="tel" className="form-control" />
  </div>

  <div className="col-md-4">
    <label className="form-label">Email Address</label>
    <input type="email" className="form-control" />
  </div>
</div>

<br/>
<br/>



    <div className="card">
  <div className="card-header">
    Booking Confirmation
  </div>
  <div className="card-body">
    <h5 className="card-title">{state.destination}</h5>
    <p className="card-text">{state.duration}<br/>
        Rs. {state.price}
    </p>
    <a className="btn btn-primary" onClick={handleClick}>Confirm</a>
  </div>
</div>
</div>

    
<BookingModal
        show={showModal}
        onClose={() => setshowModal(false)}
      />





    </>
    


  );
}