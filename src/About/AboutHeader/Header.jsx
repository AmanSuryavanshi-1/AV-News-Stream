import React from 'react';
import HeaderSocial from './HeaderSocial';
import Data from './Data';
import profileImage from '../../../assets/AS Github.png';

const Header = () => {
  return (
    <section id="header" className="w-full min-h-screen p-4 overflow-hidden md:mb-4 md:p-0">
      <div className="container relative flex flex-col items-center justify-center h-full gap-8 mx-auto md:h-5/6">
        <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-8 md:gap-28 pt-8 md:pt-22 items-center">
          <div className="relative order-1 w-64 h-64 mx-auto md:order-3 md:w-96 md:h-96 md:mx-0">
            <img
              src={profileImage}
              alt="Profile"
              loading='eager'
              className="object-cover w-full h-full border-4 shadow-inner md:border-8 border-primary-yellow"
              style={{ animation: "profile__animate 8s ease-in-out infinite 1s" }}
            />
          </div>
          <HeaderSocial className="order-2 md:order-1" />
          <Data className="order-3 md:order-2" />
        </div>
      </div>
    </section>
  );
}

export default Header;