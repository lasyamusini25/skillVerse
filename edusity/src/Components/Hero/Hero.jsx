import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Hero.css';
import dark_arrow from '../../assets/dark-arrow.png';
import { FaRocket, FaBolt, FaBriefcase, FaLightbulb, FaStar } from 'react-icons/fa';

const textOptions = [
  { text: "Showcase Your Talent 🚀", icon: <FaRocket /> },
  { text: "Turn Skills into Cash 💰", icon: <FaBolt /> },
  { text: "Get Hired Instantly 🎯", icon: <FaBriefcase /> },
  { text: "Innovate & Earn 💡", icon: <FaLightbulb /> },
  { text: "Be a Star Freelancer ⭐", icon: <FaStar /> },
];

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % textOptions.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='hero container'>
      <div className="hero-text">
        <h1>
          {textOptions[currentText].icon} {textOptions[currentText].text}
        </h1>
        <p>Connect with clients, land paid gigs, and turn your expertise into income. Build your portfolio, enhance your visibility, and get hired by top recruiters.</p>
        
      </div>
    </div>
  );
};

export default Hero;
