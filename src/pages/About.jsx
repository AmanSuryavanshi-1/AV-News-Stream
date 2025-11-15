import React from 'react'
import RepoData from '../About/RepoData';
import DeveloperInfo from '../About/DeveloperInfo';

const About = () => {
  return (
    <div className="relative flex flex-col items-center min-h-screen p-4 sm:p-8">
      <div className="w-full max-w-7xl">
        <RepoData />
        <DeveloperInfo />
      </div>
    </div>
  );
};

export default About;
