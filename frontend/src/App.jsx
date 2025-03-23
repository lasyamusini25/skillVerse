import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Login from './pages/Login';  // ✅ Student Login
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import GigList from "./components/GigList";
import GigDetails from './components/GigDetails';  
import Earnly from "./pages/Earnly";  // ✅ Import Earnly Page
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/login' element={<Login />} />  {/* ✅ Student Login */}
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/gigs' element={<GigList />} />
        <Route path="/gig/:gigId" element={<GigDetails />} />
        <Route path='/earnly' element={<Earnly />} />  {/* ✅ Earnly Page */}
        <Route path='/profile' element={<ProfilePage  />} />  {/* ✅ Earnly Page */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
