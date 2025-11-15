import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import mainLogo from '../../assets/AV_Main Logo.png';
import { FiLogIn, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { MdBookmarkBorder, MdOutlineNewspaper, MdOutlineOndemandVideo } from "react-icons/md";
import { TbNotes } from 'react-icons/tb';
import { IoInformationCircleOutline } from 'react-icons/io5';

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
    { title: 'News', url: '/', icon: <MdOutlineNewspaper className="w-5 h-5" /> },
    { title: 'Watch News', url: '/watchNews', icon: <MdOutlineOndemandVideo className="w-5 h-5" /> },
    { title: 'Notes', url: '/notes', icon: <TbNotes className="w-5 h-5" /> },
    { title: 'About', url: '/about', icon: <IoInformationCircleOutline className="w-5 h-5" /> },
  ];

  const SavedLink = () => {
    const savedArticles = useSelector((store) => store.save.savedArticles);
    const savedVideos = useSelector((store) => store.save.savedVideos);
    const totalSaved = savedArticles.length + savedVideos.length;
    return (
      <Link to="/saved" className="flex items-center px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full text-primary-light hover:bg-primary-yellow hover:text-primary-bgColor group">
        <MdBookmarkBorder className="w-5 h-5" />
        <span className="ml-2">Saved</span>
        {totalSaved > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-xs font-bold transition-all duration-300 rounded-full text-primary-bgColor bg-primary-yellow group-hover:bg-primary-bgColor group-hover:text-primary-yellow">
            {totalSaved}
          </span>
        )}
      </Link>
    );
  };

  return (
    // <nav className="font-sans shadow-lg bg-primary-dark">
    <nav className="font-sans">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <Link to="/" className="flex items-center">
          <img className="w-24 h-12 transition-transform duration-300 hover:scale-105" loading="eager" src={mainLogo} alt="Logo" />
        </Link>

        {!isMobile ? (
          <div className="flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <Link key={index} to={link.url} className="flex items-center px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full text-primary-light hover:bg-primary-yellow hover:text-primary-bgColor">
                {link.icon}
                <span className="ml-2">{link.title}</span>
              </Link>          
            ))}
            <SavedLink />
   
            <Link
              to="/auth"
              onClick={() => setBtnName(btnName === "Login" ? "Logout" : "Login")}
              className="flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full text-primary-bgColor bg-primary-yellow hover:bg-primary-light hover:text-primary-yellow"
            >
              {btnName === "Login" ? <FiLogIn className="w-5 h-5" /> : <FiLogOut className="w-5 h-5" />}
              <span className="ml-2">{btnName}</span>
            </Link>
          </div>
        ) : (
          <button onClick={toggleModal} className="p-2 transition-colors duration-300 rounded-full text-primary-light hover:bg-primary-yellow hover:text-primary-bgColor">
            <FiMenu className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Mobile Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-4/5 max-w-md p-6 rounded-lg shadow-xl bg-primary-bgColor">
            <div className="flex justify-end mb-4">
              <button onClick={toggleModal} className="p-2 transition-colors duration-300 rounded-full text-primary-light hover:bg-primary-yellow hover:text-primary-bgColor">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  className="flex items-center px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg text-primary-light hover:bg-primary-yellow hover:text-primary-bgColor"
                  onClick={toggleModal}
                >
                  {link.icon}
                  <span className="ml-1">{link.title}</span>
                </Link>
              ))}
              <SavedLink />
              <Link
                to="/auth"
                onClick={() => {
                  setBtnName(btnName === "Login" ? "Logout" : "Login");
                  toggleModal();
                }}
                className="flex items-center px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg text-primary-bgColor bg-primary-yellow hover:bg-primary-light hover:text-primary-yellow"
              >
                {btnName === "Login" ? <FiLogIn className="w-5 h-5" /> : <FiLogOut className="w-5 h-5" />}
                <span className="ml-3">{btnName}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;