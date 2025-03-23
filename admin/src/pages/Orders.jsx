import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";

const Ongoing = ({ token }) => {
  const [ongoingGigs, setOngoingGigs] = useState([]);

  const fetchOngoingGigs = async () => {
    try {
        const response = await fetch("http://localhost:4000/api/gigs/ongoing", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}` // Ensure token is included
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch gigs");
        }

        console.log("Fetched ongoing gigs:", data);
    } catch (error) {
        console.error("Error fetching gigs:", error);
    }
};


  useEffect(() => {
    fetchOngoingGigs();
  }, [token]);

  return (
    <div className="p-5 bg-blue-100 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
        <MdOutlineWorkOutline className="text-blue-500" /> Ongoing Gigs 🚀
      </h3>
      <div className="flex flex-col gap-4">
        {ongoingGigs.length > 0 ? (
          ongoingGigs.map((gig, index) => (
            <div key={index} className="border p-5 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300">
              <h4 className="font-bold text-blue-600 text-lg">{gig.title} 🎯</h4>
              <p className="text-gray-600 text-sm mb-2">{gig.description}</p>

              {/* Approved Students Section */}
              <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                <h5 className="font-bold mb-2 text-blue-700">👩‍🎓 Approved Students</h5>
                {gig.approvedStudents.length > 0 ? (
                  gig.approvedStudents.map((student) => (
                    <div key={student.id} className="flex justify-between items-center p-2 rounded-lg">
                      <p className="text-blue-500 cursor-pointer hover:underline">
                        {student.name} ({student.email})
                      </p>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                        onClick={() => handlePayment(gig.gigId, student.id)}
                      >
                        💸 Pay & Complete
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No approved students yet.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center text-lg">No ongoing gigs. Time to relax! 😌</p>
        )}
      </div>
    </div>
  );
};

export default Ongoing;
