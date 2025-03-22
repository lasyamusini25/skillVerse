import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#005C97] to-[#363795] text-white min-h-screen py-16 px-8 md:px-24 overflow-hidden flex flex-col items-center">
      
      {/* Floating Animated Blobs */}
      <div className="absolute top-[-80px] left-[-100px] w-[250px] h-[250px] bg-blue-400 opacity-30 rounded-full animate-blob"></div>
      <div className="absolute bottom-[-80px] right-[-100px] w-[200px] h-[200px] bg-blue-500 opacity-40 rounded-full animate-blob"></div>

      {/* Contact Us Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1E90FF] to-[#87CEEB] drop-shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
          📞 Let's Connect!
        </p>
      </motion.div>

      {/* Contact Details Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col md:flex-row gap-12 items-center"
      >
        {/* Image Section */}
        <motion.img 
          whileHover={{ scale: 1.1, rotate: 3 }}
          className="w-full md:max-w-[500px] rounded-xl shadow-xl border-4 border-gray-500 transform transition-all duration-300"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Contact Info */}
        <div className="flex flex-col justify-center gap-8 md:w-2/4 text-2xl leading-loose text-white">
          <motion.p 
            className="font-extrabold tracking-wide text-3xl cursor-pointer"
            whileHover={{ scale: 1.1, color: "#87CEEB" }}
          >
            📍 Visit SkillVerse Hyderabad
          </motion.p>
          <p className="text-gray-300">Hitech City, Hyderabad, India</p>

          <motion.p 
            className="font-extrabold tracking-wide text-3xl cursor-pointer"
            whileHover={{ scale: 1.1, color: "#87CEEB" }}
          >
            ☎️ Reach Out to Us
          </motion.p>
          <p className="text-gray-300">
            Phone: <span className="font-semibold text-white">+91 98765 43210</span> <br />
            Email: <span className="font-semibold text-white">support@skillversehyderabad.com</span>
          </p>

          <motion.p 
            className="font-extrabold tracking-wide text-3xl cursor-pointer"
            whileHover={{ scale: 1.1, color: "#87CEEB" }}
          >
            🚀 Want to List a Gig?
          </motion.p>
          <p className="text-gray-300">We’re always on the lookout for new talent. Connect with us today!</p>

          {/* Interactive Button */}
          
        </div>
      </motion.div>

      {/* Newsletter Section with Padding & Margin */}
      <div className="w-full mt-16 p-8 bg-[#004A80] rounded-xl shadow-xl">
        <NewsletterBox />
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: scale(1); border-radius: 40% 60% 60% 40%; }
          50% { transform: scale(1.1); border-radius: 60% 40% 40% 60%; }
          100% { transform: scale(1); border-radius: 40% 60% 60% 40%; }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out alternate;
          filter: blur(60px);
          position: absolute;
          z-index: -1;
        }
      `}</style>

    </div>
  );
};

export default Contact;
