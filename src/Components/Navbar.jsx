import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/ASlogo.png';
import { MdOutlineAddShoppingCart, MdOutlineShoppingCartCheckout, MdOutlineNetworkWifi } from "react-icons/md";
import { LiaInfoSolid } from "react-icons/lia";
import { LuLogIn } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { RiSignalWifiOffLine } from "react-icons/ri";
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';

const Navbar = () => {
  const [btnName, setBtnName] = useState("Login");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const navLinks = [
    { title: 'Home', url: '/', icon: <AiOutlineHome className="w-6 h-6 mr-2" /> },
    { title: 'About', url: '/about', icon: <LiaInfoSolid className="w-6 h-6 mr-2" /> },
    { title: 'Entertainment', url: '/contact', icon: <IoCallOutline className="w-6 h-6 mr-2" /> },
    { title: 'Business', url: '/business', icon: <IoCallOutline className="w-6 h-6 mr-2" /> },
    { title: 'Health', url: '/health', icon: <IoCallOutline className="w-6 h-6 mr-2" /> },
    { title: 'Science', url: '/science', icon: <IoCallOutline className="w-6 h-6 mr-2" /> },
    { title: 'Sports', url: '/sports', icon: <IoCallOutline className="w-6 h-6 mr-2" /> },
    { title: 'Technology', url: '/technology', icon: <IoCallOutline className="w-6 h-6 mr-2" /> },
  ];

  return (
    <nav className="bg-primary-bgColor">
      <div className="flex items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center">
          <img className="w-20 h-20" loading="eager" src={mainLogo} alt="Logo" />
        </Link>

        {!isMobile ? (
          <div className="flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <Link key={index} to={link.url} className="flex items-center text-primary-light hover:text-primary-white">
                {link.icon}
                <span>{link.title}</span>
              </Link>
            ))}
            <Link
              to="/auth"
              onClick={() => setBtnName(btnName === "Login" ? "Logout" : "Login")}
              className="flex items-center text-primary-light hover:text-primary-white"
            >
              {btnName === "Login" ? <LuLogIn className="w-6 h-6 mr-2" /> : <CiLogout className="w-6 h-6 mr-2" />}
              {btnName}
            </Link>
            {/* <div title={onlineStatus ? "Connected to internet" : "Offline"} className="text-primary-light">
              {onlineStatus ? <MdOutlineNetworkWifi className="w-6 h-6" /> : <RiSignalWifiOffLine className="w-6 h-6" />}
            </div> */}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            {/* <Link to="/cart" className="relative text-primary-light hover:text-primary-white">
              <MdOutlineAddShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <div className="absolute flex items-center justify-center w-5 h-5 text-sm font-bold rounded-full text-primary-bgColor bg-primary-yellow -top-4 -right-2">
                  {cartItems.length}
                </div>
              )}
            </Link> */}
            <button onClick={toggleModal} className="text-primary-light hover:text-primary-white">
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-4/5 max-w-md p-6 rounded-lg bg-primary-bgColor">
            <div className="flex justify-end">
              <button onClick={toggleModal} className="text-primary-light hover:text-primary-white">
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col mt-4 space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  className="flex items-center text-primary-light hover:text-primary-white"
                  onClick={toggleModal}
                >
                  {link.icon}
                  <span>{link.title}</span>
                </Link>
              ))}
              <Link
                to="/auth"
                onClick={() => {
                  setBtnName(btnName === "Login" ? "Logout" : "Login");
                  toggleModal();
                }}
                className="flex items-center text-primary-light hover:text-primary-white"
              >
                {btnName === "Login" ? <LuLogIn className="w-6 h-6 mr-2" /> : <CiLogout className="w-6 h-6 mr-2" />}
                {btnName}
              </Link>
              {/* <div className="flex items-center text-primary-light">
                {onlineStatus ? <MdOutlineNetworkWifi className="w-6 h-6 mr-2" /> : <RiSignalWifiOffLine className="w-6 h-6 mr-2" />}
                <span>{onlineStatus ? "Online" : "Offline"}</span>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;