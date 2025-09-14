import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from "./pages/Doctors"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile"
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {



  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollToFooter) {
      const footer = document.getElementById('contact-section');
      if (footer) footer.scrollIntoView({ behavior: 'smooth' });
      // Clear state so it doesn't scroll again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const loc = useLocation();
  const hideLayout = loc.pathname === "/login";

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/doctors" element={<Doctors />} ></Route>
        <Route path="/doctors/:speciality" element={<Doctors />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/about" element={<About />} ></Route>
        <Route path="/my-profile" element={<MyProfile />} ></Route>
        <Route path="/my-appointments" element={<MyAppointments />} ></Route>
        <Route path="/appointment/:docId" element={<Appointment />} ></Route>
      </Routes>

      {!hideLayout && <Footer id="contact-section" />}
    </div>
  )
}

export default App;
