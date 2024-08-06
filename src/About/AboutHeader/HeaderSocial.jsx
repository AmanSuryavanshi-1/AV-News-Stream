import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeaderSocial = () => {
  return (
    <div className="grid gap-6 header_socials">
      <Link to="https://www.linkedin.com/in/amansuryavanshi/" target="_blank" rel="noreferrer"
       className="text-2xl text-primary-light"> <BsLinkedin />
       </Link>

      <Link to="https://github.com/AmanSuryavanshi-1" target="_blank" rel="noreferrer"
       className="text-2xl text-primary-light"> <FaGithub />
       </Link>

      <Link to="https://www.instagram.com/__aman_suryavanshi__/" target="_blank" rel="noreferrer"
       className="text-2xl text-primary-light"> <FaInstagram />
       </Link>
    </div>
  );
}

export default HeaderSocial;
