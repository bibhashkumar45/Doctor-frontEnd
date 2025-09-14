import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const specialities = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="mt-8 px-6 lg:px-12">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">
        Find Your <span className="text-indigo-600">Doctor</span>
      </h1>
      <p className="text-gray-500 mt-2 text-center md:text-left">
        Browse through our specialist doctors and book your appointment.
      </p>

      <div className="flex flex-col md:flex-row gap-8 mt-10">
        {/* Sidebar Filter */}
        <div
          className={`${
            showFilter ? "block" : "hidden"
          } md:block md:w-64 bg-white shadow-lg rounded-xl border border-gray-200 p-5 h-fit sticky top-24`}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Filter by Speciality
          </h2>
          <div className="flex flex-col gap-3 text-sm">
            {specialities.map((sp, index) => (
              <button
                key={index}
                onClick={() =>
                  speciality === sp
                    ? navigate("/doctors")
                    : navigate(`/doctors/${sp}`)
                }
                className={`text-left px-4 py-2 rounded-lg border transition-all ${
                  speciality === sp
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterDoc.map((doc, index) => (
            <motion.div
              key={doc._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => navigate(`/appointment/${doc._id}`)}
              className="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Doctor Image */}
              <div className="relative">
                <img
                  className="w-full h-56 object-cover"
                  src={doc.image}
                  alt={doc.name}
                />
                <span
                  className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-medium ${
                    doc.available
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {doc.available ? "Available" : "Not Available"}
                </span>
              </div>

              {/* Doctor Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {doc.name}
                </h3>
                <p className="text-gray-500 text-sm">{doc.speciality}</p>

                <button
                  onClick={() => navigate(`/appointment/${doc._id}`)}
                  className="mt-4 w-full py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile filter toggle */}
      <button
        onClick={() => setShowFilter((prev) => !prev)}
        className="fixed bottom-6 right-6 md:hidden px-5 py-3 rounded-full shadow-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all"
      >
        {showFilter ? "Close Filter" : "Filter"}
      </button>
    </div>
  );
};

export default Doctors;
