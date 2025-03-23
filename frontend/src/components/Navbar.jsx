import React, { useContext, useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { setShowSearch, navigate, token, setToken } = useContext(ShopContext);
  const dropdownRef = useRef(null); // To detect outside clicks

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className='flex items-center justify-between py-5 px-6 bg-[#D6EAF8] text-[#2C3E50] shadow-md mb-20'>
      {/* Logo */}
      <Link to='/'>
        <img 
          src={assets.logo} 
          className='w-[450px] max-h-16 flex-shrink-0 hover:scale-110 transition-transform' 
          alt="SkillVerse Logo" 
        />
      </Link>

      {/* Main Navigation */}
      <ul className='hidden sm:flex gap-6 text-lg'>
        <NavLink to='/' className='hover:text-[#3498DB] transition-colors'>Home</NavLink>
        <NavLink to='/gigs' className='hover:text-[#3498DB] transition-colors'>Find Gigs</NavLink>
        <NavLink to='/about' className='hover:text-[#3498DB] transition-colors'>About Us</NavLink>
        <NavLink to='/contact' className='hover:text-[#3498DB] transition-colors'>Contact</NavLink>
        <li>
          <button 
            onClick={() => window.location.replace("http://localhost:5175/")} 
            className="bg-[#3498DB] text-white px-6 py-2 rounded-full hover:bg-[#2C3E50] transition-colors"
          >
            Client Panel
          </button>
        </li>
      </ul>

      {/* Right-side Icons */}
      <div className='flex items-center gap-6'>
        <img
          onClick={() => {
            setShowSearch(true);
            navigate('/gigs');
          }}
          src={assets.search_icon}
          className='w-6 cursor-pointer hover:scale-110 transition-transform'
          alt="Search"
        />

        {/* Profile Dropdown */}
        <div className='relative' ref={dropdownRef}>
          <img
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className='w-7 cursor-pointer hover:scale-110 transition-transform'
            src={assets.profile_icon}
            alt="Profile"
          />
          {token && dropdownOpen && (
            <div className='absolute flex flex-col right-0 mt-4 bg-white text-gray-700 rounded-md shadow-md w-40 py-3 px-4'>
              <p className='cursor-pointer hover:text-black' onClick={() => navigate('/profile')}>My Profile</p>
              <p className='cursor-pointer hover:text-black' onClick={() => navigate('/orders')}>My Gigs</p>
              <p className='cursor-pointer hover:text-red-500' onClick={logout}>Logout</p>
            </div>
          )}
        </div>

        <img
          onClick={() => setDropdownOpen(true)}
          src={assets.menu_icon}
          className='w-6 cursor-pointer sm:hidden'
          alt="Menu"
        />
      </div>
    </nav>
  );
};

export default Navbar;
