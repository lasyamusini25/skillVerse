import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import menu_icon from '../../assets/menu-icon.png';
import { FaHome, FaGraduationCap, FaInfoCircle, FaUniversity, FaComments, FaEnvelope, FaMoneyBillWave } from 'react-icons/fa';

const Navbar = () => {
    const [sticky, setSticky] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [mobileMenu, setMobileMenu] = useState(false);
    const toggleMenu = () => {
        setMobileMenu(!mobileMenu);
    };

    return (
        <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
            <img src={logo} alt="Logo" className='logo' />
            <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
                {/* ✅ Home Link (Always Visible) */}
                <li>
                    {location.pathname === '/' ? (
                        <Link to='hero' smooth={true} offset={0} duration={500}>
                            <FaHome /> Home
                        </Link>
                    ) : (
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <FaHome /> Home
                        </NavLink>
                    )}
                </li>

                {/* ✅ These Links Always Visible */}
                <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}><FaInfoCircle /> About</NavLink></li>
                <li><NavLink to="/programs" className={({ isActive }) => isActive ? 'active' : ''}><FaGraduationCap /> Programs</NavLink></li>
                <li><NavLink to="/campus" className={({ isActive }) => isActive ? 'active' : ''}><FaUniversity /> Campus</NavLink></li>
                <li><NavLink to="/testimonials" className={({ isActive }) => isActive ? 'active' : ''}><FaComments /> Testimonials</NavLink></li>
                <li>
                    <NavLink to="/contact" className={({ isActive }) => `${isActive ? 'active' : ''} btn`}>
                        <FaEnvelope /> Contact
                    </NavLink>
                </li>
                {/* ✅ Earnly Redirect (Opens New Page) */}
                <li>
                    <button onClick={() => window.location.replace("http://localhost:5174/")}>
                        <FaMoneyBillWave /> EarnLy
                    </button>
                </li>

            </ul>
            <img src={menu_icon} alt="Menu" className='menu-icon' onClick={toggleMenu} />
        </nav>
    );
};

export default Navbar;
