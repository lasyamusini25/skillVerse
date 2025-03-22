import React from 'react';
import './About.css';
import about_img from '../../assets/about.png';
import { FaRocket, FaLaptopCode, FaLightbulb, FaUsers, FaPlayCircle } from 'react-icons/fa';

const About = ({ setPlayState }) => {
  return (
    <div className='about'>
      <div className="about-left">
        <img src={about_img} alt="About SkillVerse" className='about-img' />
        <FaPlayCircle className='play-icon' onClick={() => setPlayState(true)} />
      </div>
      <div className="about-right">
        <h1>🚀 ABOUT SKILLVERSE</h1>
        <h2>Unlock Your Potential. Get Paid for Your Skills!</h2>
        <p><FaLaptopCode /> Whether you're a <b>designer</b>, <b>coder</b>, <b>writer</b>, or <b>marketer</b>—SkillVerse is your gateway to <b>paid gigs</b>! Connect with clients, showcase your <b>talent</b>, and start <b>earning</b> today.</p>
        <p><FaLightbulb /> <b>Innovate & Excel</b> – Learn, create, and collaborate with industry professionals. Gain hands-on experience while getting rewarded for your expertise.</p>
        <p><FaUsers /> <b>Join the Community</b> – Be part of a <b>vibrant</b> network of <b>freelancers and businesses</b>. Build your <b>portfolio</b>, land <b>exciting projects</b>, and level up your career.</p>
        <p>🔥 <b>Your skills deserve to shine!</b> Start your journey with SkillVerse and turn your passion into profit.</p>
      </div>
    </div>
  );
}

export default About;
