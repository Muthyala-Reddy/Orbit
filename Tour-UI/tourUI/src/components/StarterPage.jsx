import { Link } from 'react-router'
import './styles.css'
export default function StarterPage(){
    return(
<div className="auth-wrapper">
  

  <div className="overlay"></div>

  <div className="content text-center text-white">
    <h1 className="fw-bold">Welcome to Orbit</h1>
    <p className="lead">Travel, beautifully planned</p>
    <Link to="/home"><button className="btn btn-light px-4 mt-3">
      Get Started
    </button></Link>
    
  </div>
</div>
    )
}