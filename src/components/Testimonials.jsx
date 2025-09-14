import React from "react";
import { FaStar } from "react-icons/fa";
import { assets } from "../assets/assets_frontend/assets";

const testimonials = [
  {
    name: "Daniel Lester",
    date: "10 January 2025",
    review:
      "The website is super easy to navigate and booking an appointment took less than 2 minutes. The doctor I consulted was very professional and caring throughout the treatment process.",
    image:assets.user1,
    rating: 5,
  },
  {
    name: "Devil Ron",
    date: "25 February 2025",
    review:
      "Amazing experience! I found a specialist within seconds, booked my slot instantly, and even got reminders before my visit. The doctor listened patiently and explained everything clearly.",
   image:assets.user2,
    rating: 4,
  },
  {
    name: "Raffa Anne",
    date: "12 March 2025",
    review:
      "This platform really simplifies healthcare. I didn’t have to wait in long queues anymore. The website is smooth, and the doctors are highly skilled and supportive.",
    image:assets.user3,
    rating: 5,
  },
  {
    name: "William Jack",
    date: "5 April 2025",
    review:
      "Great service! It’s refreshing to have such a user-friendly platform. Booking is effortless and the doctors provide clear, reliable advice. Highly recommend to anyone seeking trusted healthcare.",
    image:assets.user4,
    rating: 3,
  },
];

const Testimonials = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800">
          What Our Clients Say
        </h2>
        <a
          href="#"
          className="text-green-600 hover:underline font-medium text-sm"
        >
          View All →
        </a>
      </div>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 
                       transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{t.name}</h4>
                <p className="text-xs text-gray-500">{t.date}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex text-yellow-400 mb-3">
              {Array.from({ length: t.rating }, (_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Review */}
            <p className="text-sm text-gray-600 leading-relaxed">{t.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
