import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/AV_Main Logo.png';
import { LiaInfoSolid } from "react-icons/lia";
import { LuLogIn } from "react-icons/lu";
import { CiBookmark, CiLogout } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdOutlineNewspaper } from "react-icons/md";
import { TbNotes } from 'react-icons/tb';

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
    { title: 'News', url: '/', icon: <MdOutlineNewspaper  className="w-5 h-5" /> },
    { title: 'About', url: '/about', icon: <LiaInfoSolid className="w-5 h-5" /> },
    { title: 'Contact', url: '/contact', icon: <IoCallOutline className="w-5 h-5" /> },
    { title: 'Notes', url: '/notes', icon: <TbNotes  className="w-5 h-5" /> },
    { title: 'Saved News', url: '/saved', icon: <CiBookmark  className="w-5 h-5" /> },
    // <Link
    //           to="/saved"
    //           className="flex items-center ml-4 transition-colors duration-200 text-primary-light hover:text-primary-yellow"
    //         >
    //           <AiOutlineSave className="w-5 h-5" />
    //           <span className="ml-1 text-sm">Saved</span>
    //         </Link>
  ];

  return (
    <nav className="font-sans shadow-md bg-primary-bgColor">
      <div className="container flex items-center justify-between px-4 py-2 mx-auto">
        <Link to="/" className="flex items-center">
          {/* <img className="w-24 h-20 filter invert sepia saturate-200 hue-rotate-60 brightness-110 contrast-100" loading="eager" src={mainLogo} alt="Logo" /> */}
          <img className="w-24 h-16" loading="eager" src={mainLogo} alt="Logo" /> 
          {/* <img className="w-40 h-16" loading="eager" src={mainLogo} alt="Logo" />  */}

        </Link>

        {!isMobile ? (
          <div className="flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <Link key={index} to={link.url} className="flex items-center transition-colors duration-200 text-primary-light hover:text-primary-yellow">
                {link.icon}
                <span className="ml-1">{link.title}</span>
              </Link>
            ))}
            <Link
              to="/auth"
              onClick={() => setBtnName(btnName === "Login" ? "Logout" : "Login")}
              className="flex items-center transition-colors duration-200 text-primary-light hover:text-primary-yellow"
            >
              {btnName === "Login" ? <LuLogIn className="w-5 h-5" /> : <CiLogout className="w-5 h-5" />}
              <span className="ml-1">{btnName}</span>
            </Link>
          </div>
        ) : (
          <button onClick={toggleModal} className="transition-colors duration-200 text-primary-light hover:text-primary-yellow">
            <FaBars className="w-6 h-6" />
          </button>
        )}
      </div>


      {/* Mobile Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-4/5 max-w-md p-6 rounded-lg shadow-xl bg-primary-bgColor">
            <div className="flex justify-end mb-4">
              <button onClick={toggleModal} className="transition-colors duration-200 text-primary-light hover:text-primary-yellow">
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  className="flex items-center transition-colors duration-200 text-primary-light hover:text-primary-yellow"
                  onClick={toggleModal}
                >
                  {link.icon}
                  <span className="ml-2">{link.title}</span>
                </Link>
              ))}
              <Link
                to="/auth"
                onClick={() => {
                  setBtnName(btnName === "Login" ? "Logout" : "Login");
                  toggleModal();
                }}
                className="flex items-center transition-colors duration-200 text-primary-light hover:text-primary-yellow"
              >
                {btnName === "Login" ? <LuLogIn className="w-5 h-5" /> : <CiLogout className="w-5 h-5" />}
                <span className="ml-2">{btnName}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;