import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { FaRegMoneyBillAlt, FaRegStar, FaSmileBeam } from 'react-icons/fa';
import { MdOutlineWorkOutline } from 'react-icons/md';

const Ongoing = ({ token }) => {
  const [ongoingGigs, setOngoingGigs] = useState([]);

  const fetchOngoingGigs = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${backendUrl}/api/gig/ongoing`, { headers: { token } });
      if (response.data.success) {
        setOngoingGigs(response.data.gigs.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReviewSubmit = async (gigId, studentId, review) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/gig/review`,
        { gigId, studentId, review },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('🎉 Review submitted successfully!');
        fetchOngoingGigs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePayment = async (gigId, studentId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/gig/complete`,
        { gigId, studentId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('💸 Payment processed and gig closed!');
        fetchOngoingGigs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOngoingGigs();
  }, [token]);

  return (
    <div className='p-5 bg-blue-100 rounded-lg shadow-lg'>
      <h3 className='text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2'>
        <MdOutlineWorkOutline className='text-blue-500' /> Ongoing Gigs 🚀
      </h3>
      <div className='flex flex-col gap-4'>
        {ongoingGigs.length > 0 ? (
          ongoingGigs.map((gig, index) => (
            <div key={index} className='border p-5 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300'>
              <h4 className='font-bold text-blue-600 text-lg'>{gig.title} 🎯</h4>
              <p className='text-gray-600 text-sm mb-2'>{gig.description}</p>
              <p className='text-gray-800 font-semibold flex items-center gap-2'>
                <FaRegMoneyBillAlt className='text-green-500' /> Stipend: ${gig.stipend} | ⏳ Duration: {gig.duration}
              </p>

              <div className='mt-4 bg-blue-50 p-3 rounded-lg'>
                <h5 className='font-bold mb-2 text-blue-700'>👩‍🎓 Selected Student</h5>
                <div className='flex justify-between items-center p-2 rounded-lg'>
                  <p
                    className='text-blue-500 cursor-pointer hover:underline'
                    onClick={() => window.open(`/student/${gig.student.id}`, '_blank')}
                  >
                    {gig.student.name} 🏆
                  </p>
                  <button
                    className='bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition'
                    onClick={() => handlePayment(gig._id, gig.student.id)}
                  >
                    💸 Process Payment & Close
                  </button>
                </div>
              </div>

              <div className='mt-4'>
                <h5 className='font-bold mb-2 text-blue-700'>⭐ Review Work</h5>
                <textarea
                  className='w-full border p-2 rounded-md focus:ring focus:ring-blue-300'
                  placeholder='📝 Leave feedback for the student...'
                  onBlur={(e) => handleReviewSubmit(gig._id, gig.student.id, e.target.value)}
                ></textarea>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-center text-lg'>No ongoing gigs. Time to relax! 😌</p>
        )}
      </div>
    </div>
  );
};

export default Ongoing;