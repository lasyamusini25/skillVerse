import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#8ED6FF] text-gray-900 p-12 relative overflow-hidden">
      
      {/* Floating Glow Effects */}
      <div className="absolute top-[-80px] left-1/3 w-72 h-72 bg-white opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-50px] right-1/4 w-64 h-64 bg-white opacity-15 rounded-full blur-2xl"></div>
      
      <div className="flex flex-wrap sm:grid grid-cols-[3fr_1fr_1fr] gap-12 my-10 mt-32 text-lg relative z-10">
        
        {/* Logo + Intro Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="p-8 backdrop-blur-lg bg-white/40 rounded-lg shadow-lg"
        >
          <img 
            src={assets.logo} 
            className="mb-6 w-40 transition-transform transform hover:scale-105 drop-shadow-lg" 
            alt="SkillVerse Logo" 
          />
          <p className="text-gray-800 text-lg leading-relaxed">
            SkillVerse is your gateway to connecting talent with opportunity. 
            We empower students to showcase their skills and collaborate with startups on exciting projects.
          </p>
        </motion.div>

        {/* Platform Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.8 }}
          className="p-8 backdrop-blur-lg bg-white/40 rounded-lg shadow-lg"
        >
          <p className="text-xl font-semibold mb-6 text-gray-900">
            PLATFORM
          </p>
          <ul className="flex flex-col gap-3">
            {["Home", "About Us", "Find Gigs", "Privacy Policy"].map((item, index) => (
              <li 
                key={index} 
                className="hover:text-gray-700 cursor-pointer transition-all duration-300 transform hover:translate-x-2 text-lg"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 0.8 }}
          className="p-8 backdrop-blur-lg bg-white/40 rounded-lg shadow-lg"
        >
          <p className="text-xl font-semibold mb-6 text-gray-900">
            CONTACT US
          </p>
          <ul className="flex flex-col gap-3">
            <li className="hover:text-gray-700 cursor-pointer transition-all duration-300 transform hover:translate-x-2 text-lg">
              +91-9542109924
            </li>
            <li className="hover:text-gray-700 cursor-pointer transition-all duration-300 transform hover:translate-x-2 text-lg">
              support@skillverse.com
            </li>
          </ul>
          
          {/* Social Media Icons */}
          <div className="flex gap-5 mt-6">
            <FaTwitter className="text-blue-600 text-2xl hover:text-blue-800 transition-transform transform hover:scale-110 cursor-pointer" />
            <FaLinkedin className="text-blue-900 text-2xl hover:text-blue-700 transition-transform transform hover:scale-110 cursor-pointer" />
            <FaGithub className="text-gray-800 text-2xl hover:text-gray-600 transition-transform transform hover:scale-110 cursor-pointer" />
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10">
        <hr className="border-gray-400 opacity-50" />
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 1 }}
          className="py-5 text-lg text-center text-gray-800 hover:text-gray-900 transition-colors hover:underline"
        >
          &copy; 2024 SkillVerse - Empowering Talent, Connecting Opportunities.
        </motion.p>
      </div>
    </div>
  );
};

export default Footer;