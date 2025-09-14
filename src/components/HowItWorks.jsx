import React from "react";
import { FaUserMd, FaCalendarCheck, FaNotesMedical } from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserMd className="text-white text-2xl" />,
      title: "Find A Doctor",
      desc: "Discover skilled doctors based on specialization and location.",
    },
    {
      id: 2,
      icon: <FaCalendarCheck className="text-white text-2xl" />,
      title: "Book Appointment",
      desc: "Effortlessly book appointments at your convenience.",
    },
    {
      id: 3,
      icon: <FaNotesMedical className="text-white text-2xl" />,
      title: "Get Services",
      desc: "Receive personalized healthcare services tailored to your needs.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Discover, book, and experience personalized healthcare effortlessly
          with our user-friendly Doctor Appointment Website.
        </p>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative bg-white p-6 rounded-lg shadow-md flex-1 flex flex-col items-center group"
            >
              {/* Icon with Flip + Float */}
              <motion.div
                whileHover={{ rotateY: 180, scale: 1.1 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-14 h-14 flex items-center justify-center bg-blue-600 rounded-full shadow-md mb-3 cursor-pointer perspective"
              >
                {step.icon}
              </motion.div>

              {/* Title & Description */}
              <h3 className="text-md font-semibold text-gray-900 mb-1">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>

              {/* Arrow Connector */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 md:block hidden">
                  <span className="text-blue-400 text-2xl font-bold">→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Connector Arrow */}
        <div className="md:hidden mt-6 flex justify-between items-center">
          {steps.map((_, index) =>
            index < steps.length - 1 ? (
              <span key={index} className="text-blue-400 text-xl font-bold">
                →
              </span>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
