import { useParams } from "react-router"
import { useNavigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

const itinerariesByDuration = {
  "3N/4D": [
    {
      day: "Day 1",
      title: "Arrival & Local Sightseeing",
      description: "Airport pickup, hotel check‑in, evening leisure activity."
    },
    {
      day: "Day 2",
      title: "Full Day Excursion",
      description: "Visit top attractions and scenic viewpoints."
    },
    {
      day: "Day 3",
      title: "Nature & Culture",
      description: "Explore local valleys, markets, or cultural highlights."
    },
    {
      day: "Day 4",
      title: "Departure",
      description: "Breakfast, checkout, and transfer to airport."
    }
  ],

  "4N/5D": [
    {
      day: "Day 1",
      title: "Arrival",
      description: "Airport pickup and hotel check‑in."
    },
    {
      day: "Day 2",
      title: "City Tour",
      description: "Guided city sightseeing and landmarks."
    },
    {
      day: "Day 3",
      title: "Excursion",
      description: "Scenic day trip to nearby attraction."
    },
    {
      day: "Day 4",
      title: "Leisure & Shopping",
      description: "Free time and local shopping."
    },
    {
      day: "Day 5",
      title: "Departure",
      description: "Checkout and airport drop."
    }
  ],

  "6N/7D": [
    {
      day: "Day 1",
      title: "Arrival",
      description: "Arrival and rest day."
    },
    {
      day: "Day 2",
      title: "City Tour",
      description: "Local sightseeing and cultural spots."
    },
    {
      day: "Day 3",
      title: "Excursion",
      description: "Full‑day scenic excursion."
    },
    {
      day: "Day 4",
      title: "Nature Experience",
      description: "Visit valleys, beaches, or mountain viewpoints."
    },
    {
      day: "Day 5",
      title: "Adventure / Leisure",
      description: "Optional activities or leisure day."
    },
    {
      day: "Day 6",
      title: "Shopping & Relaxation",
      description: "Local shopping and relaxation."
    },
    {
      day: "Day 7",
      title: "Departure",
      description: "Hotel checkout and airport drop."
    }
  ]
};





const packages=[{id:1,name:"Mumbai",image_url:"/mumbai.jpg",
    plans:[{
        image_url:"/Mumbai/1.jpg",
        details:"3N/4D",
        price:10000,
        itinerary:itinerariesByDuration["3N/4D"]
    },
    {
        image_url:"/Mumbai/2.jpg",
        details:"4N/5D",
        price:20000,
        itinerary:itinerariesByDuration["4N/5D"]
    },
    {
        image_url:"/Mumbai/3.jpg",
        details:"6N/7D",
        price:30000,
        itinerary:itinerariesByDuration["6N/7D"]
    }]
},
  {id:2,name:"Kashmir",image_url:"/Kashmir.jpg",
    plans:[{
        image_url:"/Kashmir/1.jpg",
        details:"3N/4D",
        price:10000,
        itinerary:itinerariesByDuration["3N/4D"]
    },
    {
        image_url:"/Kashmir/2.jpeg",
        details:"4N/5D",
        price:20000,
        itinerary:itinerariesByDuration["4N/5D"]
    },
    {
        image_url:"/Kashmir/3.jpg",
        details:"6N/7D",
        price:30000,
        itinerary:itinerariesByDuration["6N/7D"]
    }]},
  {id:3,name:"Shimla",image_url:"/Shimla.jpg",
    plans:[{
        image_url:"/Shimla/1.jpg",
        details:"3N/4D",
        price:10000,
        itinerary:itinerariesByDuration["3N/4D"]
    },
    {
        image_url:"/Shimla/2.jpg",
        details:"4N/5D",
        price:20000,
        itinerary:itinerariesByDuration["4N/5D"]
    },
    {
        image_url:"/Shimla/3.jpg",
        details:"6N/7D",
        price:30000,
        itinerary:itinerariesByDuration["6N/7D"]
    }]},
  {id:4,name:"Norway",image_url:"/norway.jpg",
    plans:[{
        image_url:"",
        details:"3N/4D",
        price:10000
    },
    {
        image_url:"",
        details:"4N/5D",
        price:20000
    },
    {
        image_url:"",
        details:"6N/7D",
        price:30000
    }]},
  {id:5,name:"Switzerland",image_url:"/switzerland.jpg",
    plans:[{
        image_url:"",
        details:"3N/4D",
        price:10000
    },
    {
        image_url:"",
        details:"4N/5D",
        price:20000
    },
    {
        image_url:"",
        details:"6N/7D",
        price:30000
    }]},
  {id:6,name:"Dubai",image_url:"/dubai.jpg",
    plans:[{
        image_url:"",
        details:"3N/4D",
        price:10000
    },
    {
        image_url:"",
        details:"4N/5D",
        price:20000
    },
    {
        image_url:"",
        details:"6N/7D",
        price:30000
    }]}]


    




export default function PackageDetails(){
    const {id}=useParams();
    const navigate=useNavigate();
    const pack=packages.find((p)=>p.id===Number(id))
    
    return(
        <>
        <div>
            <h1>{pack.name}</h1>
            {pack.plans.map((p,index)=>(
        <div className="d-flex justify-content-center mb-3 p-2" key={index}>
        <div className="card w-100" style={{ width: "18rem" }}>
        <img src={p.image_url} className="card-img-top plan-img" alt="Orbit" />
        <div className="card-body">
            <h5 className="card-title">{p.details}</h5>
            <p className="card-text">
            Rs. {p.price}
            </p>
            <button className="btn btn-primary" 
            onClick={()=>navigate('/booking',{
                state:{                    
                destination: pack.name,
                duration: p.details,
                price: p.price,
                image: p.image_url,
                itinerary:p.itinerary

                }
            })}
            
            >Book Now</button>
        </div>
        </div>
        </div>

            ))}

        </div>
        
        </>
    )
}