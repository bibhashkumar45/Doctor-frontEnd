import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctor from "../components/RelatedDoctor";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { Stethoscope, DollarSign, Briefcase } from "lucide-react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, token, getDoctorData } = useContext(AppContext);

  const navigate = useNavigate();
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState(null);

  // Fetch Doctor Info
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // Generate available slots
  const getAvailableSlot = async () => {
    if (!docInfo) return;
    setDocSlot([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() >= 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlot = [];
      while (currentDate < endTime) {
        let formatedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotData = day + "_" + month + "_" + year;

        const isSlotAvailable =
          docInfo.slots_booked[slotData] &&
          docInfo.slots_booked[slotData].includes(formatedTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlot.push({
            dateTime: new Date(currentDate),
            time: formatedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlot((prev) => [...prev, timeSlot]);
    }
  };

  // Book appointment
  const BookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warn("Please select a time slot first!");
      return;
    }

    try {
      const date = docSlot[slotIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotData = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotData, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAvailableSlot();
  }, [docInfo]);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return (
    docInfo && (
      <div className="mt-8 px-4 md:px-10 lg:px-16 pb-32">
        {/* Doctor Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
        >
          {/* Left: Doctor Image */}
          <div className="md:w-72 relative group">
            <img
              className="w-full h-64 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl transition-transform duration-500 group-hover:scale-105"
              src={docInfo.image}
              alt={docInfo.name}
            />
            <span className="absolute top-3 left-3 bg-green-100 text-green-700 px-3 py-1 text-xs font-medium rounded-full">
              {docInfo.experience}
            </span>
          </div>

          {/* Right: Doctor Info */}
          <div className="flex-1 p-6">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="verified" />
            </h2>
            <p className="text-gray-600 mt-1 flex items-center gap-2">
              <Stethoscope size={16} /> {docInfo.degree} • {docInfo.speciality}
            </p>

            {/* Experience */}
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <Briefcase size={16} className="text-indigo-500" />
              {docInfo.experience}
            </p>

            {/* About */}
            <div className="mt-4">
              <p className="flex items-center gap-2 font-semibold text-gray-800">
                About
                <img className="w-4" src={assets.info_icon} alt="info" />
              </p>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                {docInfo.about}
              </p>
            </div>

            {/* Fees */}
            <p className="mt-4 font-medium text-gray-700 flex items-center gap-2">
              <DollarSign size={16} />
              Appointment Fee:
              <span className="text-indigo-600 font-semibold ml-1">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Booking Slots */}
        <div className="mt-10">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">Select a Slot</h3>

          {/* Date Picker Timeline */}
          <div className="flex gap-3 overflow-x-auto mt-5 pb-2 scrollbar-hide">
            {docSlot.length > 0 &&
              docSlot.map((items, index) => (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSlotIndex(index)}
                  className={`min-w-[70px] text-center px-4 py-3 rounded-xl font-medium transition-all ${
                    slotIndex === index
                      ? "bg-gradient-to-r from-indigo-600 to-purple-500 text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <p>{items[0] && dayOfWeek[items[0].dateTime.getDay()]}</p>
                  <p className="text-sm">{items[0] && items[0].dateTime.getDate()}</p>
                </motion.button>
              ))}
          </div>

          {/* Time Slots */}
          <div className="flex gap-3 flex-wrap mt-6">
            {docSlot.length > 0 &&
              docSlot[slotIndex].map((item, index) => {
                let badge =
                  parseInt(item.time.split(":")[0]) < 12
                    ? "bg-yellow-100 text-yellow-700"
                    : parseInt(item.time.split(":")[0]) < 17
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700";

                return (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      item.time === slotTime
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md scale-105"
                        : `${badge} hover:opacity-80`
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </motion.button>
                );
              })}
          </div>
        </div>

        {/* Sticky Book Appointment Button for Mobile */}
        <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 md:static md:mt-10">
          <button
            onClick={BookAppointment}
            disabled={!slotTime}
            className={`px-8 py-3 w-[90%] md:w-auto rounded-full text-white font-semibold shadow-lg transition-all hover:scale-105 ${
              slotTime
                ? "bg-gradient-to-r from-indigo-600 to-cyan-500 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Book Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <div className="mt-20">
          <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  );
};

export default Appointment;
