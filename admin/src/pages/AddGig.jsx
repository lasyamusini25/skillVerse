import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

const AddGig = ({ token }) => {
  const [gigData, setGigData] = useState({
    title: "",
    description: "",
    stipend: "",
    skillsRequired: "",
    registrationDeadline: "",
    courseDuration: "",
  });
  const [descLength, setDescLength] = useState(0);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "stipend" && value < 0) {
      setError("Stipend cannot be negative");
    } else {
      setError("");
    }
    if (name === "description") {
      setDescLength(value.length);
    }
    setGigData({ ...gigData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (gigData.stipend < 0) {
      return toast.error("Stipend cannot be negative");
    }

    try {
      const formattedGigData = {
        ...gigData,
        stipend: Number(gigData.stipend),
        skillsRequired: gigData.skillsRequired.split(",").map((skill) => skill.trim()),
        courseDuration: Number(gigData.courseDuration),
      };

      const response = await axios.post(`${backendUrl}/api/gigs/add`, formattedGigData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setGigData({
          title: "",
          description: "",
          stipend: "",
          skillsRequired: "",
          registrationDeadline: "",
          courseDuration: "",
        });
        setDescLength(0);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add gig!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 p-6 relative">
      <div className="absolute inset-0 bg-opacity-20 bg-[url('/gig-bg.png')] bg-cover bg-center"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="p-10 bg-white shadow-2xl rounded-xl w-full max-w-3xl z-10"
      >
        <h2 className="text-4xl font-bold text-blue-700 text-center mb-6 flex items-center justify-center gap-2">
          <FaRocket /> Add a New Gig
        </h2>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">
          {[
            { label: "Title", name: "title", type: "text", placeholder: "Gig title" },
            {
              label: `Description (${descLength}/200)`,
              name: "description",
              type: "textarea",
              placeholder: "Describe the gig...",
              maxLength: 200,
            },
            {
              label: "Skills Required (comma separated)",
              name: "skillsRequired",
              type: "text",
              placeholder: "e.g. React, Python, UI/UX",
            },
            {
              label: "Stipend",
              name: "stipend",
              type: "number",
              placeholder: "Enter stipend amount",
              min: 0,
            },
            {
              label: "Registration Deadline",
              name: "registrationDeadline",
              type: "date",
            },
            {
              label: "Course Duration (in weeks)",
              name: "courseDuration",
              type: "number",
              placeholder: "Enter duration",
              min: 1,
            },
          ].map(({ label, name, type, ...rest }) => (
            <div key={name}>
              <label className="block mb-1 font-medium text-gray-800">{label}</label>
              {type === "textarea" ? (
                <motion.textarea
                  whileFocus={{ scale: 1.05 }}
                  name={name}
                  value={gigData[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring focus:ring-blue-300 transition duration-200"
                  {...rest}
                  required
                />
              ) : (
                <motion.input
                  whileFocus={{ scale: 1.05 }}
                  type={type}
                  name={name}
                  value={gigData[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring focus:ring-blue-300 transition duration-200"
                  {...rest}
                  required
                />
              )}
              {name === "stipend" && error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
          >
            🚀 Add Gig
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddGig;
