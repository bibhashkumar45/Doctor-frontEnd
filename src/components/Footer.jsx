import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="contact-section" className="w-full text-black mt-16 border-t border-gray-300">
      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">AppointMe</h3>
          <p className="text-sm leading-relaxed">Chandigarh University, Mohali, India</p>
          <p className="text-sm mt-2">+6207907432</p>
          <p className="text-sm">bibhashk971@gmail.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors">
                Doctors
              </a>
            </li>

            <li>
              <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#contact-section" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#medical" className="text-gray-700 hover:text-blue-600 transition-colors">
                Medical
              </a>
            </li>
            <li>
              <a href="#operation" className="text-gray-700 hover:text-blue-600 transition-colors">
                Operation
              </a>
            </li>
            <li>
              <a href="#laboratory" className="text-gray-700 hover:text-blue-600 transition-colors">
                Laboratory
              </a>
            </li>
            <li>
              <a href="#icu" className="text-gray-700 hover:text-blue-600 transition-colors">
                ICU
              </a>
            </li>
            <li>
              <a href="#patient-ward" className="text-gray-700 hover:text-blue-600 transition-colors">
                Patient Ward
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-700 transition transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-sky-500 hover:text-sky-700 transition transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-red-600 hover:text-red-800 transition transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.linkedin.com/in/bibhash4587/"
              className="text-blue-700 hover:text-blue-900 transition transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 py-6 px-6 w-full text-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Design By Bibhash Kumar -{" "}
          <span className="text-red-500">&hearts;</span> . All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
