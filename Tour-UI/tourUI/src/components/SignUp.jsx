export default function SignUp(){
    return(
        <>
        <p className="fw-bold">Create your Orbit account here</p>
  <div className="container my-4">
  <div className="row g-3">

    <div className="col-md-6">
      <input
        type="text"
        className="form-control"
        placeholder="First Name"
      />
    </div>

    <div className="col-md-6">
      <input
        type="text"
        className="form-control"
        placeholder="Last Name"
      />
    </div>

    <div className="col-md-12">
      <input
        type="email"
        className="form-control"
        placeholder="Email Address"
      />
    </div>

    <div className="col-md-12">
      <input
        type="password"
        className="form-control"
        placeholder="Password"
      />
    </div>

    <div className="col-md-12">
      <button className="btn btn-primary w-100">
        Sign Up
      </button>
    </div>

  </div>
</div>

        </>
    )
}