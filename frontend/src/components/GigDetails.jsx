import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GigDetails = () => {
  const { gigId } = useParams();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGigDetails = async () => {
      console.log("Fetching gig details for ID:", gigId); // Debugging log
      try {
        const response = await fetch(`http://localhost:4000/api/gigs/${gigId}`);
        const data = await response.json();
        console.log("API Response:", data); // Debugging log

        if (data.success && data.gig) {
          setGig(data.gig);
        } else {
          setError("Gig not found.");
        }
      } catch (error) {
        console.error("Error fetching gig details:", error);
        setError("Error fetching gig details.");
      } finally {
        setLoading(false);
      }
    };

    fetchGigDetails();
  }, [gigId]);

  const handleApply = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in first.");
      return;
    }

    console.log("Applying to gig:", gigId); // Debugging log

    try {
      const response = await fetch(`http://localhost:4000/api/gigs/${gigId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        alert("Applied successfully! ✅");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error applying for gig:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black p-6">
      {loading ? (
        <p>Loading...</p>
      ) : gig ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold">{gig.title}</h1>
          <p className="text-lg">{gig.description}</p>
          <p className="mt-2 text-gray-600">Pay: {gig.pay}</p>
          <p className="mt-2 text-gray-600">Category: {gig.category}</p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button onClick={handleApply} className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg">
            Apply Now 🚀
          </button>
        </div>
      ) : (
        <p className="text-red-500">Gig not found.</p>
      )}
    </div>
  );
};

export default GigDetails;
