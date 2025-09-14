import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Book Appointments With Trusted Doctors",
    desc: "Browse our list of verified doctors and schedule appointments easily.",
    img: assets.header_img,
    profile: assets.group_profiles,
  },
  {
    title: "Find Specialists Near You",
    desc: "Quickly connect with experts in your city for fast treatment.",
    img: assets.groupheader1,
    profile: assets.group_profiles,
  },
  {
    title: "24/7 Healthcare Support",
    desc: "Get health advice and book online consultations anytime.",
        img: assets.groupheader2,
    profile: assets.group_profiles,
  },
];

const Header = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false); // pause autoplay when hovering

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Auto-play every 5 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [paused, current]);

  return (
    <div
      className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-500/40 via-blue-400/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-400/30 via-blue-600/20 to-transparent pointer-events-none" />

      {/* Slide Content */}
      <div className="relative flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-[50px] rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.25)] px-8 md:px-16 py-12 w-full max-w-5xl mx-auto border border-white/20 ring-1 ring-white/10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 flex flex-col items-start justify-center gap-6"
          >
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-snug mb-4 
                 text-transparent bg-clip-text animated-gradient relative">
              {slides[current].title}
              <span className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 -z-10"></span>
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-lg font-medium flex items-center gap-4 transition-all duration-500 hover:translate-x-2 hover:text-white">
              <img
                className="w-14 md:w-20 rounded-full shadow-lg border-2 border-cyan-400"
                src={slides[current].profile}
                alt="Doctors"
              />
              {slides[current].desc}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#speciality"
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-2.5 rounded-full text-white text-base font-semibold shadow-md ring-2 ring-cyan-300/30 transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_0_15px_rgba(0,255,255,0.6)]"
              >
                Book Appointment <img src={assets.arrow_icon} alt="" className="w-4 h-4" />
              </a>
              <a
                href="tel:+1234567890"
                className="px-6 py-2.5 rounded-full text-base font-semibold text-white border border-white/60 transition-all duration-300 hover:bg-white/10 hover:scale-105"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Side Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current + "-img"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 flex items-center justify-center relative mt-8 md:mt-0"
          >
            <div className="relative drop-shadow-2xl">
              <div className="p-3 rounded-[2rem] bg-gradient-to-tr from-cyan-400 via-blue-400 to-indigo-500 hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]">
                <img
                  className="w-56 md:w-72 xl:w-80 rounded-2xl shadow-xl object-cover"
                  src={slides[current].img}
                  alt="Slide"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 flex gap-4">
        <button
          onClick={prevSlide}
          className="px-3 py-2 bg-white/20 rounded-full hover:bg-white/40 text-white"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="px-3 py-2 bg-white/20 rounded-full hover:bg-white/40 text-white"
        >
          ▶
        </button>
      </div>

      {/* Gradient Animation for Heading */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient {
          background: linear-gradient(90deg, #00f0ff, #00c3ff, #6b63ff, #00f0ff);
          background-size: 300% 300%;
          animation: gradientShift 6s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Header;
