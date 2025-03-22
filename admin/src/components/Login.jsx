import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import bgImage from '../assets/bg_img.png';


const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('🔍 Sending request:', { email, password });

    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        toast.success('🎉 Login successful!');
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log('❌ Login Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div 
      className='h-screen flex items-start justify-center w-full p-10 pt-44'
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
      
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className='bg-blue-900 shadow-2xl rounded-3xl px-10 py-16 max-w-lg w-full flex flex-col items-center'
      >
        <h1 className='text-3xl font-bold text-white mb-6 text-center'>🔐 Welcome Back!</h1>
        <form onSubmit={onSubmitHandler} className='w-full space-y-5'>
          <div className='flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50'>
            <FaUserAlt className='text-gray-500' />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='w-full ml-3 outline-none bg-transparent text-gray-700'
              type='email'
              placeholder='📧 Enter your email'
              required
            />
          </div>
          <div className='flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50'>
            <FaLock className='text-gray-500' />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='w-full ml-3 outline-none bg-transparent text-gray-700'
              type='password'
              placeholder='🔑 Enter your password'
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='mt-3 w-full py-3 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition font-bold shadow-md'
            type='submit'
          >
            🚀 Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;