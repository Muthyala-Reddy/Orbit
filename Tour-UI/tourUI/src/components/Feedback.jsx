import React from "react";
 
function Feedback() {
  return (
    <section id="testimonials" className="container my-4">
      <h4 className="text-center fw-bold mb-4">Happy Customers</h4>
 
      <div className="row g-3 justify-content-center">
        {/* Testimonial 1 */}
        <div className="col-md-3">
          <div className="card h-100 shadow-sm p-2">
            <div className="fs-2 text-warning mb-1">❝</div>
 
            <p className="text-muted small">
              Samim travel has such a user-friendly website. The booking process
              was quick and easy.
            </p>
 
            <div className="d-flex align-items-center mt-2">
              <div
                className="rounded-circle bg-secondary"
                style={{ width: "40px", height: "40px" }}
              ></div>
 
              <div className="ms-2">
                <h6 className="mb-0 fs-6">Rahi Ahmed</h6>
                <small className="text-muted">CEO • webtechbyrahi</small>
              </div>
            </div>
          </div>
        </div>
 
        {/* Testimonial 2 */}
        <div className="col-md-3">
          <div className="card h-100 shadow-sm p-2">
            <div className="fs-2 text-warning mb-1">❝</div>
 
            <p className="text-muted small">
              Great communication and very helpful during our booking process.
            </p>
 
            <div className="d-flex align-items-center mt-2">
              <div
                className="rounded-circle bg-secondary"
                style={{ width: "40px", height: "40px" }}
              ></div>
 
              <div className="ms-2">
                <h6 className="mb-0 fs-6">Anthony Tony</h6>
                <small className="text-muted">Researcher • wikipedia</small>
              </div>
            </div>
          </div>
        </div>
 
        {/* Testimonial 3 */}
        <div className="col-md-3">
          <div className="card h-100 shadow-sm p-2">
            <div className="fs-2 text-warning mb-1">❝</div>
 
            <p className="text-muted small">
              Amazing service and great holiday rewards. Highly recommended.
            </p>
 
            <div className="d-flex align-items-center mt-2">
              <div
                className="rounded-circle bg-secondary"
                style={{ width: "40px", height: "40px" }}
              ></div>
 
              <div className="ms-2">
                <h6 className="mb-0 fs-6">John Lee</h6>
                <small className="text-muted">CEO • Grant Thornton</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
export default Feedback;