import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router'

import './index.css'
import App from './App.jsx'
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import StarterPage from './components/StarterPage.jsx'
import SignIn from './components/SignIn.jsx'
import PackageDetails from './components/PackageDetails.jsx'
import Feedback from './components/Feedback.jsx'
import Booking from './components/Booking.jsx'
import PaymentPage from './components/PaymentPage.jsx'
import SignUp from './components/SignUp.jsx'
import BookingList from './components/BookingList.jsx'
import PaymentProcessing from './components/PaymentProcessing.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <NavBar/>

    <Routes>
    <Route path="/home" element={<Home />}/>
    <Route path="/" element={<StarterPage />}/>
    <Route path="/signin" element={<SignIn />}/>
    <Route path="packages/:id" element={<PackageDetails />}/>
    <Route path="/feedback" element={<Feedback />}/>
    <Route path="/booking" element={<Booking/>}/>
    <Route path="/payment" element={<PaymentPage />}/>
    <Route path="/signup" element={<SignUp />}/>
    <Route path="/mybookings" element={<BookingList/>}/>
    <Route path="/payment-processing" element={<PaymentProcessing/>}/>
    </Routes>
    
    </BrowserRouter>
    
  </StrictMode>
)
