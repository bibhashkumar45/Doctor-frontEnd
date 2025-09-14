import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between my-24 mx-6 md:mx-12 lg:mx-20 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-500/40 rounded-full blur-3xl"></div>
      </div>

      {/* Left Side */}
      <div className="relative flex-1 text-center md:text-left py-12 md:py-20 px-8 md:px-14 z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-snug drop-shadow-md">
          Book Appointment
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-400">
            With 100+ Trusted Doctors
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-200 max-w-lg">
          Get connected with verified healthcare professionals and schedule your visit in just a few clicks.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-8 px-8 py-3 rounded-full bg-white/90 text-gray-800 font-semibold text-base shadow-lg hover:scale-105 hover:bg-white transition-all duration-300"
        >
          Create Account
        </button>
      </div>

      {/* Right Side */}
      <div className="relative hidden md:flex md:w-1/2 items-center justify-center pr-10 z-10">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
          <img
            className="relative w-full max-w-sm drop-shadow-2xl"
            src={assets.appointment_img}
            alt="Appointment"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
