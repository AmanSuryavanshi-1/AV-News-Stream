import React from 'react';
import logo from '../../assets/AV_Main Logo.png';
import { BsLinkedin, BsTwitterX } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { IoHomeOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { HiOutlineUser } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-primary-dark via-primary-grey to-primary-dark border-t border-primary-yellow/20 h-[10vh] min-h-[80px] overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-yellow rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-light rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex items-center justify-between h-full max-w-7xl mx-auto px-6">
        
        {/* Left: Logo & Copyright */}
        <div className="flex items-center space-x-4">
          <img src={logo} loading='lazy' alt="AV News Stream" className="object-contain w-20 h-10 brightness-110" />
          <div className="hidden sm:block w-px h-8 bg-primary-yellow/20"></div>
          <p className="hidden sm:block text-xs font-medium text-primary-light/70">
            &copy; {new Date().getFullYear()} <span className="text-primary-yellow">Aman Suryavanshi</span>
          </p>
        </div>

        {/* Center: Navigation Icons */}
        <nav className="hidden md:flex items-center space-x-2">
          <Link 
            to="/" 
            className="group relative p-2.5 rounded-lg bg-primary-bgColor/50 backdrop-blur-sm border border-primary-yellow/10 hover:border-primary-yellow/40 transition-all duration-300 hover:scale-110"
            title="Home"
          >
            <IoHomeOutline className="w-5 h-5 text-primary-light group-hover:text-primary-yellow transition-colors duration-300" />
          </Link>
          <Link 
            to="/about" 
            className="group relative p-2.5 rounded-lg bg-primary-bgColor/50 backdrop-blur-sm border border-primary-yellow/10 hover:border-primary-yellow/40 transition-all duration-300 hover:scale-110"
            title="About"
          >
            <IoInformationCircleOutline className="w-5 h-5 text-primary-light group-hover:text-primary-yellow transition-colors duration-300" />
          </Link>
          <a 
            href="https://amansuryavanshi-dev.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative p-2.5 rounded-lg bg-primary-bgColor/50 backdrop-blur-sm border border-primary-yellow/10 hover:border-primary-yellow/40 transition-all duration-300 hover:scale-110"
            title="Portfolio"
          >
            <HiOutlineUser className="w-5 h-5 text-primary-light group-hover:text-primary-yellow transition-colors duration-300" />
          </a>
        </nav>

        {/* Right: Social Links */}
        <div className="flex items-center space-x-2">
          <a 
            href="https://www.linkedin.com/in/aman-suryavanshi-6b0aba347/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-primary-bgColor/50 backdrop-blur-sm border border-primary-yellow/10 text-primary-light hover:bg-primary-yellow hover:text-primary-bgColor hover:border-primary-yellow transition-all duration-300 hover:scale-110"
            title="LinkedIn"
          >
            <BsLinkedin className="w-4 h-4" />
          </a>
          <a 
            href="https://github.com/AmanSuryavanshi-1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-primary-bgColor/50 backdrop-blur-sm border border-primary-yellow/10 text-primary-light hover:bg-primary-yellow hover:text-primary-bgColor hover:border-primary-yellow transition-all duration-300 hover:scale-110"
            title="GitHub"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a 
            href="https://twitter.com/_AmanSurya" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-primary-bgColor/50 backdrop-blur-sm border border-primary-yellow/10 text-primary-light hover:bg-primary-yellow hover:text-primary-bgColor hover:border-primary-yellow transition-all duration-300 hover:scale-110"
            title="Twitter"
          >
            <BsTwitterX className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Copyright */}
        <p className="sm:hidden absolute bottom-1 left-0 right-0 text-center text-[10px] text-primary-light/50">
          &copy; {new Date().getFullYear()} <span className="text-primary-yellow">AS</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
