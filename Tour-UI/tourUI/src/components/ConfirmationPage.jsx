import { Link } from "react-router";

export default function ConfirmationPage(){
    return(
        <div className="d-flex flex-column justify-content-center">
        <h1>Thank you for booking with Orbit!!</h1>
        <p>Have a great journey and do not forget to make memories!!!</p>
        <Link to="/home">
        <button className="btn btn-success">Go back to Home Page</button>
        </Link>
        </div>
        
    )
}