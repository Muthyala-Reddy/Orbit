import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Link } from 'react-router';
export default function SignIn(){
    return(
        <>
        <div className='signinbg'>
             <div className='text-center signpage-head'>
            <h1 className='fw-bold text-light mb-5'>Orbit</h1>
            </div>


            <div className='bg-white p-5 box-cover'>

            <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label text-dark fw-bold">
                Email Address
                </label>

                <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                />

                
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label text-dark fw-bold">
                Password
                </label>

                <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                />
            </div>

            

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            <p className='mt-2'>If you don't have an account click here  <Link to="/signup"><p>Sign Up</p></Link></p>
        </form>

            </div>
            

        </div>
        
        
        
        
        
        
        
    </>
    )
}






  
    
 