import React, { useState } from "react";
import "./Programs.css";
import program_1 from "../../assets/program-1.png";
import program_2 from "../../assets/program-2.png";
import program_3 from "../../assets/program-3.png";
import program_icon_1 from "../../assets/program-icon-1.png";
import program_icon_2 from "../../assets/program-icon-2.png";
import program_icon_3 from "../../assets/program-icon-3.png";

const Programs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    {
      id: 1,
      image: program_1,
      icon: program_icon_1,
      text: "Offer Gigs 🫂📊",
      description: "Connect with startups and businesses to offer your skills and earn money. Post gigs and find opportunities that match your expertise."
    },
    {
      id: 2,
      image: program_2,
      icon: program_icon_2,
      text: "Skill Hub 💡",
      description: "Join a community where you can learn new skills, share knowledge, and collaborate on projects to improve your portfolio."
    },
    {
      id: 3,
      image: program_3,
      icon: program_icon_3,
      text: "Income Streams 💰",
      description: "Discover various ways to monetize your skills, from freelancing to passive income streams through digital content creation."
    },
  ];

  const Popup = ({ program, onClose }) => {
    return (
      <div className="popup-box">
        <div className="popup-content">
          <button className="close-button" onClick={onClose}>✖</button>
          <h2 className="popup-title">{program.text}</h2>
          <p className="popup-description">{program.description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="programs-container">
      <h2 className="programs-title">Our Programs</h2>
      <p className="programs-subtitle">
        Explore our unique programs designed to enhance your skills and income.
      </p>
      <div className="programs">
        {programs.map((program, index) => (
          <div
            key={program.id}
            className="program"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedProgram(program)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={hoveredIndex === index ? program.icon : program.image}
              alt={program.text}
              className="program-image"
            />
            <div className="caption">
              <p>{program.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Use the Popup component */}
      {selectedProgram && (
        <Popup program={selectedProgram} onClose={() => setSelectedProgram(null)} />
      )}
    </div>
  );
};

export default Programs;