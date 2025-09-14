import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { User, Stethoscope, DollarSign } from "lucide-react";

const initialStats = [
  {
    label: "Happy Patients",
    value: 24500,
    range: [24000, 26000],
    suffix: "+",
    icon: <User className="w-8 h-8 text-cyan-600" />,
  },
  {
    label: "Qualified Doctors",
    value: 1200,
    range: [1100, 1300],
    suffix: "+",
    icon: <Stethoscope className="w-8 h-8 text-indigo-600" />,
  },
  {
    label: "Total Revenue",
    value: 8.5,
    range: [7.5, 10],
    suffix: "M$",
    decimals: 1,
    icon: <DollarSign className="w-8 h-8 text-green-600" />,
  },
];

const StatsCounter = () => {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) =>
        prevStats.map((stat) => {
          const [min, max] = stat.range || [stat.value, stat.value];
          const newValue = (Math.random() * (max - min) + min).toFixed(
            stat.decimals || 0
          );
          return { ...stat, value: parseFloat(newValue) };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Key Metrics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4 transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Smaller Animated Icon */}
              <div className="p-3 bg-gray-200 rounded-full transition-transform group hover:bg-gray-300">
                <div className="group-hover:scale-105 transition-transform">
                  {stat.icon}
                </div>
              </div>

              {/* Smaller Number + Label */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  <CountUp
                    end={stat.value}
                    duration={2}
                    decimals={stat.decimals || 0}
                  />
                  {stat.suffix}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
