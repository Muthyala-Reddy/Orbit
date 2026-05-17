import React from "react";
import Classes from "../Styles/Hero.module.css";
import Banner from "../assets/hero.png";
import "bootstrap/dist/css/bootstrap.min.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router";
import Feedback from "./Feedback";
import Contact from "./Contact";
import ChatWidget from "./ChatWidget";

/* ===== Packages ===== */
const packages = [
  { id: 1, name: "Mumbai", image_url: "/mumbai.jpg" },
  { id: 2, name: "Kashmir", image_url: "/Kashmir.jpg" },
  { id: 3, name: "Shimla", image_url: "/Shimla.jpg" },
  { id: 4, name: "Norway", image_url: "/norway.jpg" },
  { id: 5, name: "Switzerland", image_url: "/switzerland.jpg" },
  { id: 6, name: "Dubai", image_url: "/dubai.jpg" }
];

/* ===== Advertisement Images ===== */
const ads = [
  { id: 1, image: "/ads/ad1.png" },
  { id: 2, image: "/ads/ad2.jpg" },
  { id: 3, image: "/ads/ad1.png" }
];

function Home() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section id="hero" className={Classes.heroContainer}>
        <div className={Classes.heroimage}>
          <img src={Banner} alt="Orbit Travel" />
        </div>

        <div className={Classes.content}>
          <div className={Classes.title}>
            <h1>
              Travel & Explore With{" "}
              <span className={Classes.nickName}>Orbit</span>
            </h1>
            <p>
              Save at least 15% on stays worldwide, from relaxing retreats
              to off‑grid adventures
            </p>

            <a href="#packages">
              <button className="btn btn-warning mt-1 fw-bold">
                Explore Destinations
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== AUTO‑SCROLLING ADS (Swiper autoplay) ===== */}
      <section className="ad-section my-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          slidesPerView={1}
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad.id}>
              <img
                src={ad.image}
                alt="Promotion"
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "12px"
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ===== SIGNUP PROMO (Advertisement-style card) =====
      <section className="container my-4">
        <div className="card shadow-sm p-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h4 className="fw-bold mb-1">New here?</h4>
              <p className="text-muted mb-0">
                Create your Orbit account to book faster, track bookings, and get offers.
              </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <Link to="/signup">
                <button className="btn btn-primary fw-bold w-100 w-md-auto">
                  Sign Up Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* ===== PACKAGES SECTION ===== */}
      <section id="packages" className="container-fluid py-3 bg-light mb-3">
        <h2 className="text-center fw-bold mb-4">Packages</h2>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={3}
          slidesPerGroup={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
          }}
        >
          {packages.map((p) => (
            <SwiperSlide key={p.id}>
              <Link to={`/packages/${p.id}`}>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={p.image_url}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "160px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <p className="card-text fw-semibold">{p.name}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Feedback />
      <hr/>

      {/* ===== Chat widget (Rule-based service) ===== */}
      <ChatWidget />
    </>
  );
}

export default Home;
