import { Link } from "react-router";

export default function BookingModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Booking Confirmation</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p>You want to go through with your booking ?</p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
           <Link to="/confirmation">
           
           <button className="btn btn-primary">
              Confirm
            </button>
           </Link> 
          </div>

        </div>
      </div>
    </div>
  );
}
``