import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
const adminUrl = import.meta.env.Admin_Url;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const scrollToFooter = () => {
    if (location.pathname === "/") {
      const footer = document.getElementById("contact-section");
      if (footer) footer.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollToFooter: true } });
    }
  };

  useEffect(() => {
    if (location.state?.scrollToFooter) {
      const footer = document.getElementById("contact-section");
      if (footer) footer.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/doctors", label: "All Doctors" },
    { to: "/about", label: "About" },
    { to:"/contact", label: "Contact"},
    {
      to:`https://doctor-admin-dashboard-alpha.vercel.app`,
      label: "Admin Panel",
      isExternal: true,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-30 bg-white shadow-md">
      <div className="max-w-7xl mx-auto md:px-12 flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <div>
          <img
            onClick={() => navigate("/")}
            className="w-30 h-20 cursor-pointer text-blue-500"
            src={assets.logo}
            alt="Logo"
          />
        </div>

        {/* CENTER: Nav Links */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-8 font-medium text-gray-700 items-center">
            {navLinks.map(({ to, label, isScroll, isExternal }) =>
              isScroll ? (
                <li
                  key={label}
                  onClick={scrollToFooter}
                  className="cursor-pointer relative pb-1 transition hover:text-primary"
                >
                  {label}
                </li>
              ) : isExternal ? (
                <li key={label}>
                  <a
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-blue-400 text-blue-500 rounded-full hover:bg-blue-50 transition font-medium"
                  >
                    {label}
                  </a>
                </li>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `relative pb-1 transition-all duration-200 ${
                      isActive
                        ? "text-primary border-b-2 border-primary"
                        : "hover:text-primary"
                    }`
                  }
                >
                  {label}
                </NavLink>
              )
            )}
          </ul>
        </div>

        {/* RIGHT: Profile/Login */}
        <div className="hidden md:flex items-center gap-4 relative">
          {token ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  src={userData?.image || "/default-avatar.png"}
                  alt="User"
                />
                <img className="w-4" src={assets.dropdown_icon} alt="Menu" />
              </button>

              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-3"
                >
                  <p
                    onClick={() => {
                      navigate("/my-profile");
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                  >
                    Logout
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary-dark transition"
            >
              Create Account
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="md:hidden flex flex-col justify-between w-7 h-6 focus:outline-none"
        >
          <span
            className={`h-1 bg-gray-800 rounded transition-transform duration-300 ${
              showMenu ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-1 bg-gray-800 rounded transition-opacity duration-300 ${
              showMenu ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-1 bg-gray-800 rounded transition-transform duration-300 ${
              showMenu ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg z-40 p-6 md:hidden"
          >
            <ul className="flex flex-col gap-6 text-lg font-medium text-gray-700">
              {navLinks.map(({ to, label, isScroll, isExternal }) =>
                isScroll ? (
                  <li
                    key={label}
                    onClick={() => {
                      scrollToFooter();
                      setShowMenu(false);
                    }}
                    className="cursor-pointer hover:text-primary"
                  >
                    {label}
                  </li>
                ) : isExternal ? (
                  <li key={label}>
                    <a
                      href={to}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowMenu(false)}
                      className="px-4 py-2 border border-blue-400 text-blue-500 rounded-full hover:bg-blue-50 transition font-medium"
                    >
                      {label}
                    </a>
                  </li>
                ) : (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      isActive ? "text-primary font-semibold" : "hover:text-primary"
                    }
                  >
                    {label}
                  </NavLink>
                )
              )}
            </ul>

            {/* Mobile Auth Buttons */}
            <div className="mt-6">
              {token ? (
                <button
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className="w-full bg-red-500 text-white py-2 rounded-full font-medium"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setShowMenu(false);
                  }}
                  className="w-full bg-primary text-white py-2 rounded-full font-medium"
                >
                  Create Account
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
