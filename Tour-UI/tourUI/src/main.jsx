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
import ConfirmationPage from './components/ConfirmationPage.jsx'
import SignUp from './components/SignUp.jsx'



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
    <Route path="/confirmation" element={<ConfirmationPage />}/>
    <Route path="/signup" element={<SignUp />}/>
    </Routes>
    
    </BrowserRouter>
    
  </StrictMode>
)
