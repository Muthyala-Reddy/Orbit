import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Classes from "../Styles/Hero.module.css";
import Banner from "../assets/hero.png";
 

import "swiper/css";
import "swiper/css/navigation";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router";
import Feedback from "./Feedback";
import Contact from "./Contact";


const packages=[{id:1,name:"Mumbai",image_url:"/mumbai.jpg"},
  {id:2,name:"Kashmir",image_url:"/Kashmir.jpg"},
  {id:3,name:"Shimla",image_url:"/Shimla.jpg"},
  {id:4,name:"Norway",image_url:"/norway.jpg"},
  {id:5,name:"Switzerland",image_url:"/switzerland.jpg"},
  {id:6,name:"Dubai",image_url:"/dubai.jpg"}]

function Home() {
  return (
    <>
      <section id="hero" className={Classes.heroContainer}>
        <div className={Classes.heroimage}>
          <img src={Banner} alt="" />
        </div>
 
        <div className={Classes.content}>
          <div className={Classes.title}>
            <h1>
              Travel & Explore With{" "}
              <span className={Classes.nickName}>Orbit</span>
            </h1>
            <p>
              Save at least 15% on stays worldwide, from relaxing retreats to
              off-grid adventures
            </p>
          </div>
 
          
        </div>
      </section>

      
<section className="container-fluid py-5 bg-light mb-5">
  <h2 className="text-center fw-bold mb-4">Packages</h2>

  <Swiper
    modules={[Navigation]}
    navigation
    spaceBetween={20}
    slidesPerView={3}
    slidesPerGroup={3}
    breakpoints={{
      0: { slidesPerView: 1, slidesPerGroup: 1 },
      768: { slidesPerView: 2, slidesPerGroup: 2 },
      992: { slidesPerView: 3, slidesPerGroup: 3 },
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

 <Feedback/>

<br/>
<br/>
<hr/>
<Contact/>  


    </>
  );
}
 
export default Home;