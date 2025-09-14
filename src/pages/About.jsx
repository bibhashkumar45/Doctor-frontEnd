import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { motion } from "framer-motion";
import { FaCalendarCheck, FaUserMd, FaShieldAlt } from "react-icons/fa";

const About = () => {
  const featureData = [
    {
      icon: <FaCalendarCheck size={36} className="text-indigo-600" />,
      title: "Easy Scheduling",
      description:
        "Quickly browse available time slots and book appointments in seconds.",
      delay: 0.5,
    },
    {
      icon: <FaUserMd size={36} className="text-indigo-600" />,
      title: "Verified Doctors",
      description:
        "All doctors are verified professionals with detailed profiles including experience, degrees, and specialties.",
      delay: 0.7,
    },
    {
      icon: <FaShieldAlt size={36} className="text-indigo-600" />,
      title: "Secure & Reliable",
      description:
        "Your data is protected, and all appointments are reliably managed through our system.",
      delay: 0.9,
    },
  ];

  const steps = [
    "Browse through our list of qualified doctors and select a specialty.",
    "Choose an available time slot and book your appointment online.",
    "Receive confirmation and visit the doctor at the scheduled time.",
  ];

  return (
    <div className="mt-10 px-6 lg:px-12 pb-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row items-center gap-10 bg-white shadow-lg rounded-2xl p-8"
      >
        <img
          className="w-full lg:w-1/2 rounded-xl object-cover"
          src={assets.about_image} // Original image
          alt="About Doctor Appointment System"
        />
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            About Our Doctor Appointment System
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our Doctor Appointment System is designed to simplify healthcare
            for patients and doctors alike. With our platform, you can quickly
            find doctors in various specialties, check their availability, and
            book appointments at your convenience. No more waiting in long
            queues or calling multiple clinics – everything is now at your
            fingertips.
          </p>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {featureData.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: feature.delay }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <div className="mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* How it Works Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          How It Works
        </h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 * index }}
            >
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <p className="text-gray-700 text-lg">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-16 bg-indigo-600 text-white rounded-2xl p-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
        <p className="mb-6">
          Simplify your healthcare experience. Find doctors and book appointments instantly.
        </p>
        <button
          onClick={() => (window.location.href = "/doctors")}
          className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:scale-105 transition transform"
        >
          Browse Doctors
        </button>
      </motion.div>
    </div>
  );
};

export default About;
