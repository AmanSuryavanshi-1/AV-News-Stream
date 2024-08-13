import React, { useState } from 'react'
import Header from '../About/AboutHeader/Header';
import AboutMe from '../About/AboutMe';
import GithubProfile from '../About/GithubProfile'; 
import RepoData from '../About/RepoData';
import GithubCalendar from '../About/GithubCalendar';
import { GrFormView } from "react-icons/gr";
import { BiHide } from "react-icons/bi";
const About = () => {
  const [showHeaderAndAbout, setShowHeaderAndAbout] = useState(false);

  const toggleHeaderAndAbout = () => {
    setShowHeaderAndAbout(!showHeaderAndAbout);
  };  

  return (
    <div className="relative flex flex-col p-8 items-center h-[90%]">
        <button
          onClick={toggleHeaderAndAbout}
          //   {showHeaderAndAbout ? "View Profile" :  "Hide Profile"}
           className="inline-flex items-center px-6 py-2 transition-all duration-300 border-2 shadow-sm cursor-pointer rounded-2xl shadow-primary-light border-primary-yellow text-primary-light bg-primary-bgColor hover:bg-primary-light hover:text-primary-bgColor hover:border-transparent"
      >
        {showHeaderAndAbout ? (
          <>
            Hide Profile
            <BiHide className="ml-2 text-2xl" />
          </>
        ) : (
          <>
            View Profile
            <GrFormView className="ml-2 text-2xl" />
          </>
        )}
        </button>

      {showHeaderAndAbout && (
        <>
          <Header />
          <AboutMe />
        </>
      )}

      <div>
        <RepoData />
        <GithubProfile />
        <GithubCalendar />
      </div>
    </div>
  );
};

export default About;
