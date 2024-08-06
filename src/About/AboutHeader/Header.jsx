import React from 'react';
import HeaderSocial from './HeaderSocial';
import Data from './Data';
import profileImage from '../../../assets/AS Github.png';

const Header = () => {
  return (
    <section id="header" className="h-screen overflow-hidden max-md:w-screen max-md:h-full max-md:p-4">
      <div className="container relative flex flex-col items-center justify-center gap-8 mx-auto h-5/6 ">
        <div className="grid grid-cols-[100px_1fr_1fr] gap-28 pt-22 items-center max-md:grid-cols-1 max-md:gap-0">
          <HeaderSocial />
          <Data />
          <div className="relative w-96 h-96">
            <img
              src={profileImage}
              alt="Profile"
              loading='eager'
              className="object-cover w-full h-full border-8 shadow-inner border-primary-yellow"
              style={{ animation: "profile__animate 8s ease-in-out infinite 1s" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
