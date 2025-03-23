import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const List = ({ token }) => {
  const [gigs, setGigs] = useState([]);
  const [selectedGigId, setSelectedGigId] = useState(null);
  const navigate = useNavigate();

  const fetchGigs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/gigs/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setGigs(response.data.gigs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else {
        toast.error("Failed to load gigs");
      }
    } catch (error) {
      toast.error("Error fetching gigs");
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const handleGigClick = (gigId) => {
    setSelectedGigId(selectedGigId === gigId ? null : gigId);
  };

  const handleApproval = async (gigId, studentId, action) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/gigs/update-status/${gigId}`,
        { studentId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(`Student ${action}d successfully`);

        setGigs((prev) =>
          prev.map((gig) =>
            gig._id === gigId
              ? {
                  ...gig,
                  applicants: gig.applicants.map((s) =>
                    s._id === studentId ? { ...s, status: action } : s
                  ),
                }
              : gig
          )
        );
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 p-8 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-white mb-6">🎯 Available Gigs</h2>

      <div className="w-full max-w-4xl">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[2fr_3fr_1fr] items-center py-3 px-4 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg">
          <b>Title</b>
          <b>Description</b>
          <b>Applicants</b>
        </div>

        {/* Gig List with Animation */}
        <div className="mt-4 flex flex-col gap-4">
          {gigs.map((gig) => (
            <motion.div
              key={gig._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg rounded-lg p-4 border border-blue-300"
            >
              <div
                className="grid grid-cols-[2fr_3fr_1fr] items-center cursor-pointer p-3 rounded-lg hover:bg-blue-200 transition"
                onClick={() => handleGigClick(gig._id)}
              >
                <p className="font-bold text-blue-700 hover:underline">{gig.title}</p>
                <p>{gig.description.substring(0, 50)}...</p>
                <p className="text-center font-semibold">{gig.applicants.length}</p>
              </div>

              {/* Expandable Section */}
              <AnimatePresence>
                {selectedGigId === gig._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 p-3 bg-blue-100 rounded-lg border-t"
                  >
                    <p className="font-bold mb-2 text-blue-800">Applicants</p>
                    {gig.applicants.length > 0 ? (
                      gig.applicants.map((student) => (
                        <div key={student._id} className="flex justify-between items-center p-2 bg-white shadow-sm rounded-lg mb-2">
                          <p
                            className="text-blue-600 cursor-pointer hover:underline flex items-center gap-2"
                            onClick={() => navigate(`/student/${student._id}`)}
                          >
                            {student.name}{" "}
                            {student.status === "approve" ? (
                              <span className="text-green-600">✅</span>
                            ) : student.status === "reject" ? (
                              <span className="text-red-600">❌</span>
                            ) : (
                              <span className="text-gray-500">⌛</span>
                            )}
                          </p>
                          <div className="flex gap-2">
                            <button
                              className={`px-3 py-1 rounded-lg transition ${
                                student.status === "approve" ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-700 text-white"
                              }`}
                              onClick={() => handleApproval(gig._id, student._id, "approve")}
                              disabled={student.status === "approve"}
                            >
                              ✔ Approve
                            </button>
                            <button
                              className={`px-3 py-1 rounded-lg transition ${
                                student.status === "reject" ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-700 text-white"
                              }`}
                              onClick={() => handleApproval(gig._id, student._id, "reject")}
                              disabled={student.status === "reject"}
                            >
                              ❌ Reject
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No applicants yet.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
