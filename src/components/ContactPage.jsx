import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-800">
        CONTACT <span className="text-purple-600">ME</span>
      </h1>

      <div className="flex flex-col md:flex-row items-stretch gap-10 max-w-6xl w-full">
        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <div className="relative overflow-hidden rounded-2xl shadow-lg max-h-[400px] w-full md:w-auto">
            <img
              src={assets.contact_image}
              alt="Doctor with child"
              className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Glass Effect Container */}
          <div className="backdrop-blur-sm bg-white/30 border border-white/40 rounded-2xl p-8 shadow-lg flex flex-col gap-6">
            {/* Office Info */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">My College</h2>
              <p className="text-gray-700">Chandigarh University</p>
              <p className="text-gray-700">Mohali,Panjab, India</p>
              <p className="mt-2 text-gray-700">Tel: 6207907432</p>
              <p className="text-gray-700">Email: bibhashk971@gmail.com</p>
            </div>

            {/* Careers Info */}
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">CAREERS AT AppointMe</h2>
              <p className="mb-4 text-gray-700">Learn more about me and my team.</p>
              <button className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700 hover:shadow-xl transition duration-300">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
