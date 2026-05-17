import { useParams, Link,useLocation } from "react-router";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import BookingModal from "./BookingModal";



const itinerariesByDuration = {
  "3N/4D": [
    { day: "Day 1", title: "Arrival & Local Sightseeing", description: "Airport pickup, hotel check‑in, evening leisure activity." },
    { day: "Day 2", title: "Full Day Excursion", description: "Visit top attractions and scenic viewpoints." },
    { day: "Day 3", title: "Nature & Culture", description: "Explore local valleys, markets, or cultural highlights." },
    { day: "Day 4", title: "Departure", description: "Breakfast, checkout, and transfer to airport." }
  ],
  "4N/5D": [
    { day: "Day 1", title: "Arrival", description: "Airport pickup and hotel check‑in." },
    { day: "Day 2", title: "City Tour", description: "Guided city sightseeing and landmarks." },
    { day: "Day 3", title: "Excursion", description: "Scenic day trip to nearby attraction." },
    { day: "Day 4", title: "Leisure & Shopping", description: "Free time and local shopping." },
    { day: "Day 5", title: "Departure", description: "Checkout and airport drop." }
  ],
  "6N/7D": [
    { day: "Day 1", title: "Arrival", description: "Arrival and rest day." },
    { day: "Day 2", title: "City Tour", description: "Local sightseeing and cultural spots." },
    { day: "Day 3", title: "Excursion", description: "Full‑day scenic excursion." },
    { day: "Day 4", title: "Nature Experience", description: "Visit valleys, beaches, or mountain viewpoints." },
    { day: "Day 5", title: "Adventure / Leisure", description: "Optional activities or leisure day." },
    { day: "Day 6", title: "Shopping & Relaxation", description: "Local shopping and relaxation." },
    { day: "Day 7", title: "Departure", description: "Hotel checkout and airport drop." }
  ]
};


const destinationPackages = [
  {
    id: 1, name: "Mumbai", image_url: "/mumbai.jpg",
    plans: [
      { image_url: "/Mumbai/1.jpg", details: "3N/4D", price: 10000, itinerary: itinerariesByDuration["3N/4D"] },
      { image_url: "/Mumbai/2.jpg", details: "4N/5D", price: 20000, itinerary: itinerariesByDuration["4N/5D"] },
      { image_url: "/Mumbai/3.jpg", details: "6N/7D", price: 30000, itinerary: itinerariesByDuration["6N/7D"] }
    ]
  },
  {
    id: 2, name: "Kashmir", image_url: "/Kashmir.jpg",
    plans: [
      { image_url: "/Kashmir/1.jpg", details: "3N/4D", price: 10000, itinerary: itinerariesByDuration["3N/4D"] },
      { image_url: "/Kashmir/2.jpeg", details: "4N/5D", price: 20000, itinerary: itinerariesByDuration["4N/5D"] },
      { image_url: "/Kashmir/3.jpg", details: "6N/7D", price: 30000, itinerary: itinerariesByDuration["6N/7D"] }
    ]
  },
  {
    id: 3, name: "Shimla", image_url: "/Shimla.jpg",
    plans: [
      { image_url: "/Shimla/1.jpg", details: "3N/4D", price: 10000, itinerary: itinerariesByDuration["3N/4D"] },
      { image_url: "/Shimla/2.jpg", details: "4N/5D", price: 20000, itinerary: itinerariesByDuration["4N/5D"] },
      { image_url: "/Shimla/3.jpg", details: "6N/7D", price: 30000, itinerary: itinerariesByDuration["6N/7D"] }
    ]
  },
  {
  id: 4, name: "Norway", image_url: "/norway.jpg",
    plans: [
      { image_url: "/Norway/1.jpg", details: "3N/4D", price: 200000, itinerary: itinerariesByDuration["3N/4D"] },
      { image_url: "/Norway/2.jpg", details: "4N/5D", price: 400000, itinerary: itinerariesByDuration["4N/5D"] },
      { image_url: "/Norway/3.jpg", details: "6N/7D", price: 650000, itinerary: itinerariesByDuration["6N/7D"] }
    ]
  },
  {
    id: 5, name: "Switzerland", image_url: "/switzerland.jpg",
    plans: [
      { image_url: "/Switzerland/1.jpg", details: "3N/4D", price: 225000, itinerary: itinerariesByDuration["3N/4D"] },
      { image_url: "/Switzerland/2.jpg", details: "4N/5D", price: 445000, itinerary: itinerariesByDuration["4N/5D"] },
      { image_url: "/Switzerland/3.jpg", details: "6N/7D", price: 613000, itinerary: itinerariesByDuration["6N/7D"] }
    ]
  },
  {
    id: 6, name: "Dubai", image_url: "/dubai.jpg",
    plans: [
      { image_url: "/Dubai/1.jpg", details: "3N/4D", price: 200000, itinerary: itinerariesByDuration["3N/4D"] },
      { image_url: "/Dubai/2.jpg", details: "4N/5D", price: 300000, itinerary: itinerariesByDuration["4N/5D"] },
      { image_url: "/Dubai/3.jpg", details: "6N/7D", price: 400000, itinerary: itinerariesByDuration["6N/7D"] }
    ]
  }
];



export default function PackageDetails() {
  const { id } = useParams();
  const location=useLocation();
  const pack = destinationPackages.find((p) => p.id === Number(id));

  const [tourPackages, setTourPackages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8085/api/tours")
      .then(res => setTourPackages(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error("Failed to fetch /api/tours", err);
        setTourPackages([]);
      });
  }, []);


  useEffect(() => {

  if (!pack) return;

  if (location.state?.autoOpen) {
    const plan = pack.plans.find(
      p => p.details.toLowerCase() === location.state.autoOpen
    );

    if (plan) {
      openBookingModal(plan);
    }
  }
}, [location.state, pack]);


 
  const tourByTitle = useMemo(() => {
    const map = {};
    for (const t of tourPackages) {
      if (t?.title) map[t.title] = t;
    }
    return map;
  }, [tourPackages]);

  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [itineraryPlanTitle, setItineraryPlanTitle] = useState("");
  const [itineraryItems, setItineraryItems] = useState([]);

  const openBookingModal = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const closeBookingModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  const openItinerary = (plan) => {
    setItineraryPlanTitle(`${pack.name} • ${plan.details}`);
    setItineraryItems(plan.itinerary);
    setShowItineraryModal(true);
  };

  const closeItinerary = () => {
    setShowItineraryModal(false);
    setItineraryItems([]);
    setItineraryPlanTitle("");
  };

  if (!pack) {
    return (
      <div className="container my-5">
        <h3 className="fw-bold">Package not found</h3>
        <p className="text-muted">The destination you opened does not exist.</p>
        <Link to="/home" className="btn btn-primary">Go Home</Link>
      </div>
    );
  }

  return (
    <>
      
      <div className="pd-hero">
        <img src={pack.image_url} alt={pack.name} className="pd-hero-img" />
        <div className="pd-hero-overlay">
          <div className="container">
            <Link to="/home" className="pd-breadcrumb">← Back to Home</Link>
            <h1 className="pd-title">{pack.name}</h1>
            <p className="pd-subtitle">
              Choose a plan and click the info icon to view full itinerary.
            </p>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <div className="row g-4">
          {pack.plans.map((p, index) => {
           
            const db = tourByTitle[p.details];

            const displayTitle = db?.title ?? p.details;
            const displayPrice = db?.price ?? p.price;
            const displayDesc = db?.description ?? "Ideal for short & comfortable travel";
           

            return (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card h-100 shadow-sm pd-plan-card">
                  <img
                    src={p.image_url}
                    className="card-img-top"
                    alt={pack.name}
                    style={{ height: "160px", objectFit: "cover" }}
                  />

                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                    
                      <h5 className="fw-semibold mb-0">{displayTitle}</h5>

                
                      <span className="fw-bold text-primary">₹ {displayPrice}</span>
                    </div>

                  
                    <div className="pd-row-between mb-3">
                     
                      <span className="text-muted pd-small">{displayDesc}</span>

                      <button
                        type="button"
                        className="pd-info-btn"
                        onClick={() => openItinerary(p)}
                        aria-label="View itinerary"
                        title="View itinerary"
                      >
                        i
                      </button>
                    </div>

                    
                    
                    <p className="text-muted small mb-2">
                      ⏳ Starts on: {db?.durationDays}th day of every month!!
                    </p>



                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => openBookingModal(p)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showModal && selectedPlan && (
          <BookingModal
            show={showModal}
            onClose={closeBookingModal}
            packageId={pack.id}
            destination={pack.name}
            duration={selectedPlan.details}
            price={selectedPlan.price}
            image={selectedPlan.image_url}
            itinerary={selectedPlan.itinerary}
          />
        )}
      </div>

    
      {showItineraryModal && (
        <>
          <div className="pd-it-backdrop" onClick={closeItinerary}></div>

          <div className="pd-it-modal" role="dialog" aria-modal="true">
            <div className="pd-it-modal-card">
              <div className="pd-it-modal-header">
                <div>
                  <h5 className="mb-0 fw-bold">Itinerary</h5>
                  <small className="text-muted">{itineraryPlanTitle}</small>
                </div>
                <button className="btn btn-sm btn-light" onClick={closeItinerary}>
                  ✕
                </button>
              </div>

              <div className="pd-it-modal-body">
                {itineraryItems.map((d, i) => (
                  <div className="pd-it-day-row" key={i}>
                    <div className="pd-it-day-badge">{d.day}</div>
                    <div>
                      <div className="pd-it-day-title">{d.title}</div>
                      <div className="pd-it-day-desc">{d.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pd-it-modal-footer">
                <button className="btn btn-secondary" onClick={closeItinerary}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}