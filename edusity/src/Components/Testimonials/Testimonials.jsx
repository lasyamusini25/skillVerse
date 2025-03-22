import React, { useRef } from 'react';
import './Testimonials.css';
import next_icon from '../../assets/next-icon.png';
import back_icon from '../../assets/back-icon.png';
import user_1 from '../../assets/user-1.png';
import user_2 from '../../assets/user-2.png';
import user_3 from '../../assets/user-3.png';
import user_4 from '../../assets/user-4.png';

const Testimonials = () => {
  const slider = useRef();
  let tx = 0;

  const slideForward = () => {
    if (tx > -50) {
      tx -= 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  const slideBackward = () => {
    if (tx < 0) {
      tx += 25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
  };

  return (
    <div className='testimonials'>
      <img src={next_icon} alt="Next" className='next-btn' onClick={slideForward} />
      <img src={back_icon} alt="Back" className='back-btn' onClick={slideBackward} />
      <div className="slider">
        <ul ref={slider}>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_1} alt="User 1" />
                <div>
                  <h3>Neha Verma ✨</h3> {/* Girl name */}
                  <span>📍 Skillverse Hyderabad</span>
                </div>
              </div>
              <p>
                🚀 Skillverse Hyderabad provided me with hands-on learning opportunities that truly enhanced my skills. The mentorship and real-world projects helped me gain confidence in my field. 💡
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_2} alt="User 2" />
                <div>
                  <h3>Rahul Sharma 🎯</h3> {/* Boy name */}
                  <span>📍 Skillverse Hyderabad</span>
                </div>
              </div>
              <p>
                📚 The interactive courses and expert faculty at Skillverse Hyderabad made my learning journey exciting and rewarding. The practical exposure I gained has been invaluable for my career. 🔥
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_3} alt="User 3" />
                <div>
                  <h3>Pooja Iyer 🌟</h3> {/* Girl name */}
                  <span>📍 Skillverse Hyderabad</span>
                </div>
              </div>
              <p>
                💼 I highly recommend Skillverse Hyderabad to anyone looking to upskill. The projects and industry connections gave me an edge in job interviews and real-world problem-solving. 💪
              </p>
            </div>
          </li>
          <li>
            <div className="slide">
              <div className="user-info">
                <img src={user_4} alt="User 4" />
                <div>
                  <h3>Aditya Rao 🚀</h3> {/* Boy name */}
                  <span>📍 Skillverse Hyderabad</span>
                </div>
              </div>
              <p>
                🎯 The personalized guidance at Skillverse Hyderabad helped me discover my potential. The diverse learning environment and peer collaborations were a game-changer for me. 🔥
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Testimonials;
