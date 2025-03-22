import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Star, Coins } from "lucide-react";

const GigList = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const token = "YOUR_AUTH_TOKEN"; // Replace with actual token logic
        const response = await fetch("http://localhost:4000/api/gigs/list", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.success) {
          setGigs(data.gigs);
        } else {
          console.error("Failed to fetch gigs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching gigs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#6fb3ff] to-[#005bbb] text-white py-16 px-8 md:px-24 overflow-hidden font-['Poppins']">
      {/* Floating Animated Stars */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-40">
        <Star size={300} className="text-blue-400 animate-pulse" />
      </div>
      
      {/* Title with Sparkles */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-7xl font-extrabold text-center mb-10 tracking-wide flex items-center justify-center gap-4"
      >
        <Sparkles className="text-yellow-300 animate-spin" /> 🚀 Explore Gigs <Sparkles className="text-yellow-300 animate-spin" />
      </motion.h1>

      {/* Loading Animation */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-16 h-16 border-8 border-blue-200 border-t-transparent rounded-full"
          ></motion.div>
        </div>
      ) : gigs.length === 0 ? (
        <p className="text-center text-2xl text-gray-200">No gigs available. 😢</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gigs.map((gig, index) => (
            <motion.div
              key={gig._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#e3f2fd] text-gray-900 p-6 rounded-3xl shadow-xl border border-gray-300 hover:shadow-2xl transition-all flex flex-col items-center relative cursor-pointer"
              onClick={() => navigate(`/gig/${gig._id}`)}
            >
              <div className="absolute -top-6 -right-6 bg-yellow-300 p-2 rounded-full shadow-lg animate-bounce">
                <Coins size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold flex items-center gap-2 text-center">
                📌 {gig.title}
              </h2>
              <p className="text-lg text-gray-700 mt-2 text-center">{gig.description}</p>
              <p className="text-lg text-blue-500 font-semibold mt-2 flex items-center">
                💰 Stipend: ${gig.stipend}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GigList;
