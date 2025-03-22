import React, { useState } from "react";
import "./Contact.css";
import msg_icon from "../../assets/msg-icon.png";
import mail_icon from "../../assets/mail-icon.png";
import phone_icon from "../../assets/phone-icon.png";
import location_icon from "../../assets/location-icon.png";
import white_arrow from "../../assets/white-arrow.png";

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // Replace with your actual Web3Forms key
    formData.append("access_key", "e37980a4-e938-4af7-ba45-786471047af4");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setResult("Message sent successfully! ✅");
        event.target.reset();
      } else {
        setResult("Failed to send message. ❌ Try again.");
      }
    } catch (error) {
      setResult("Error sending message. ❌ Check your internet connection.");
    }
  };

  return (
    <div className="contact">
      <div className="contact-col">
        <h3>
          Send us a message <img src={msg_icon} alt="Message Icon" />
        </h3>
        <p>
          Feel free to reach out through the contact form or find our contact
          information below. Your feedback, questions, and suggestions are
          important to us as we strive to provide exceptional service to our
          university community.
        </p>
        <ul>
          <li>
            <img src={mail_icon} alt="Mail Icon" />
            lasyamusini3@gmail.com
          </li>
          <li>
            <img src={phone_icon} alt="Phone Icon" />
            +91 9542109924
          </li>
          <li>
            <img src={location_icon} alt="Location Icon" />
            Hyderabad
          </li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input type="text" name="name" placeholder="Enter your name" required />

          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="Enter your mobile number" required />

          <label>Write your message here</label>
          <textarea name="message" rows="6" placeholder="Enter your message" required></textarea>

          <button type="submit" className="btn dark-btn">
            Submit Now <img src={white_arrow} alt="Arrow Icon" />
          </button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;
