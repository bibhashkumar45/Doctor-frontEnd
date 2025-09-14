import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-16 my-20 px-6 md:px-12 text-gray-100 min-h-screen">
      {/* 👋 Welcome Section */}
 <div className="w-full flex justify-center">
  <div className="text-center w-full max-w-2xl md:max-w-3xl p-8 md:p-12 bg-gradient-to-r from-blue-900/80 via-gray-800/80 to-blue-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-600/30 animate-fade-in scale-100 hover:scale-105 transition-transform duration-700">
    <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 drop-shadow-lg mb-6">
      Your Health, Our Priority
    </h1>
    <p className="mt-4 text-base md:text-lg text-gray-200 font-medium drop-shadow">
      Connect with top verified doctors and manage your appointments easily, all in one place.
    </p>
    <button
      onClick={() => {
        navigate('/doctors');
        scrollTo(0, 0);
      }}
      className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg text-base md:text-lg hover:scale-105 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
    >
      Explore Doctors
    </button>
  </div>
</div>

      {/* 🌟 Top Doctors Preview */}
      <div className="w-full">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 mb-8 text-center drop-shadow-lg animate-fade-in">Top Doctors You Can Book</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {doctors.slice(0, 8).map((doctor, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
              }}
              className="group relative bg-gradient-to-br from-gray-800/80 via-blue-900/70 to-gray-900/80 border border-blue-600/20 rounded-2xl shadow-xl cursor-pointer transition-all duration-500 hover:scale-[1.06] hover:shadow-2xl hover:border-blue-400/40 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-700/80 hover:via-blue-600/70 hover:to-blue-900/80 backdrop-blur-md animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Attractive overlay on whole card hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500 bg-gradient-to-br from-blue-400/30 via-cyan-400/20 to-transparent pointer-events-none z-10"></div>
              <div className="relative z-20 flex flex-col items-center">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-48 object-cover rounded-t-2xl border-b border-blue-600/20 transition-transform duration-500 ease-in-out group-hover:scale-110 group-active:scale-95"
                  style={{
                    boxShadow: '0 4px 24px 0 rgba(0, 180, 255, 0.15)',
                  }}
                />
                <div className="absolute inset-0 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-blue-500/40 via-transparent to-transparent pointer-events-none"></div>
              </div>
              <div className="p-4 relative z-20">
                <div className={`flex items-center gap-2 text-sm ${doctor.available ? 'text-green-400' : 'text-red-400'}`}>
                  <span className={`w-3 h-3 rounded-full ${doctor.available ? 'bg-green-400' : 'bg-red-400'} shadow-md`}></span>
                  <span className="font-medium">{doctor.available ? 'Available Now' : 'Currently Unavailable'}</span>
                </div>
                <p className="text-gray-100 text-xl font-semibold mt-3">{doctor.name}</p>
                <p className="text-cyan-300 text-sm mt-1">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              navigate('/doctors');
              scrollTo(0, 0);
            }}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-12 py-3 rounded-full shadow-lg font-semibold hover:scale-105 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
          >
            View All Doctors
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopDoctors;