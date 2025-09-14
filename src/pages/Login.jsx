import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Quotes for overlay
  const medicalQuotes = [
    "“Your health is your wealth — invest in it daily.”",
    "“A good laugh and a long sleep are the best cures.”",
    "“Prevention is better than cure.”",
    "“Health is the greatest gift, contentment the greatest wealth.”",
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % medicalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Images for slideshow
  const signUpImages = [
    "https://img.freepik.com/free-photo/doctor-standing-hospital-corridor_1150-15014.jpg",
    "https://img.freepik.com/free-photo/smiling-medical-team-hospital_23-2149300270.jpg",
    "https://img.freepik.com/free-photo/medical-workers-discussing-hospital-corridor_23-2149300241.jpg",
  ];

  const loginImages = [
    "https://img.freepik.com/free-photo/modern-hospital-reception-with-medical-cross-symbol_23-2148909254.jpg",
    "https://img.freepik.com/free-photo/doctor-talking-with-patient-hospital-reception_23-2149300257.jpg",
    "https://img.freepik.com/free-photo/nurse-helping-patient-hospital-hallway_23-2149300239.jpg",
  ];

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % loginImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Form handler
  const formHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(
          `${backendUrl}/api/user/resister`,
          { name, password, email }
        );
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/user/login`,
          { password, email }
        );
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-100">
      <div className="w-full max-w-6xl h-auto md:h-[80vh] rounded-2xl overflow-hidden shadow-2xl bg-white grid grid-cols-1 md:grid-cols-2">
        <AnimatePresence mode="wait">
          {state === "Sign Up" ? (
            <>
              {/* Left: Form */}
              <motion.div
                key="signup-form"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center relative px-4 sm:px-8 py-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
              >
                <h1 className="absolute text-[50px] sm:text-[70px] md:text-[100px] font-extrabold text-gray-300/20 -z-0 select-none tracking-wider">
                  SIGN UP
                </h1>

                <motion.form
                  onSubmit={formHandler}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 w-full max-w-sm bg-white rounded-xl shadow-xl p-5 sm:p-6 flex flex-col gap-5"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 -mt-2">
                    Create Account
                  </h2>
                  <p className="text-center text-gray-500 text-sm mb-2">
                    Sign up to start booking your appointments
                  </p>

                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition text-sm sm:text-base"
                  >
                    Create Account
                  </motion.button>

                  <p className="text-center text-gray-600 text-sm">
                    Already have an account?{" "}
                    <span
                      onClick={() => setState("Login")}
                      className="text-blue-600 font-semibold cursor-pointer hover:underline"
                    >
                      Login here
                    </span>
                  </p>
                </motion.form>
              </motion.div>

              {/* Right: Image (Slideshow) */}
              <motion.div
                key="signup-image"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden md:flex relative items-center justify-center"
              >
                <img
                  src={signUpImages[imageIndex]}
                  alt="Sign Up"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-black/40 to-transparent"></div>

                <motion.h2
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute bottom-10 text-white text-lg sm:text-xl md:text-2xl font-semibold px-6 text-center max-w-lg drop-shadow-lg"
                >
                  {medicalQuotes[quoteIndex]}
                </motion.h2>
              </motion.div>
            </>
          ) : (
            <>
              {/* Left: Image (Slideshow) */}
              <motion.div
                key="login-image"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden md:flex relative items-center justify-center"
              >
                <img
                  src={loginImages[imageIndex]}
                  alt="Login"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-black/40 to-transparent"></div>

                <motion.h2
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute bottom-10 text-white text-lg sm:text-xl md:text-2xl font-semibold px-6 text-center max-w-lg drop-shadow-lg"
                >
                  {medicalQuotes[quoteIndex]}
                </motion.h2>
              </motion.div>

              {/* Right: Form */}
              <motion.div
                key="login-form"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 60, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center relative px-4 sm:px-8 py-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
              >
                <h1 className="absolute text-[50px] sm:text-[70px] md:text-[100px] font-extrabold text-gray-300/20 -z-0 select-none tracking-wider">
                  LOGIN
                </h1>

                <motion.form
                  onSubmit={formHandler}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 w-full max-w-sm bg-white rounded-xl shadow-xl p-5 sm:p-6 flex flex-col gap-5"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 -mt-2">
                    Welcome Back
                  </h2>
                  <p className="text-center text-gray-500 text-sm mb-2">
                    Login to continue your journey
                  </p>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition text-sm sm:text-base"
                  >
                    Login
                  </motion.button>

                  <p className="text-center text-gray-600 text-sm">
                    Don’t have an account?{" "}
                    <span
                      onClick={() => setState("Sign Up")}
                      className="text-blue-600 font-semibold cursor-pointer hover:underline"
                    >
                      Sign up
                    </span>
                  </p>
                </motion.form>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
