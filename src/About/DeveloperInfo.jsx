import React from 'react';
import { FaExternalLinkAlt, FaCode, FaRocket } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const DeveloperInfo = () => {
  return (
    <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
      <div className="relative overflow-hidden transition-all duration-500 shadow-lg bg-gradient-to-br from-primary-dark via-primary-bgColor to-primary-grey rounded-3xl hover:shadow-2xl hover:shadow-primary-yellow/20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 bg-primary-yellow blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 bg-primary-light blur-3xl"></div>
        
        <div className="relative px-6 py-10 sm:p-12">
          <div className="flex items-center justify-center mb-6">
            <HiSparkles className="mr-3 text-4xl text-primary-yellow animate-pulse" />
            <h2 className="font-serif text-3xl font-bold text-center sm:text-4xl text-primary-light">
              Want to Know More?
            </h2>
            <HiSparkles className="ml-3 text-4xl text-primary-yellow animate-pulse" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Developer Portfolio Card */}
            <div className="p-6 transition-all duration-300 border-2 group rounded-2xl bg-primary-bgColor/50 backdrop-blur-sm border-primary-yellow/30 hover:border-primary-yellow hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <FaCode className="mr-3 text-3xl text-primary-yellow" />
                <h3 className="text-xl font-bold text-primary-light">Meet the Developer</h3>
              </div>
              <p className="mb-6 leading-relaxed text-primary-white">
                Explore my portfolio to discover more projects, skills, and the journey behind creating innovative web solutions.
              </p>
              <a
                href="https://amansuryavanshi-dev.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 font-semibold transition-all duration-300 border-2 shadow-lg rounded-2xl shadow-primary-yellow/20 border-primary-yellow text-primary-bgColor bg-primary-yellow hover:bg-primary-light hover:shadow-primary-light/40 hover:transform hover:-translate-y-1"
              >
                Visit Portfolio
                <FaExternalLinkAlt className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Project Details Card */}
            <div className="p-6 transition-all duration-300 border-2 group rounded-2xl bg-primary-bgColor/50 backdrop-blur-sm border-primary-light/30 hover:border-primary-light hover:transform hover:scale-105">
              <div className="flex items-center mb-4">
                <FaRocket className="mr-3 text-3xl text-primary-light" />
                <h3 className="text-xl font-bold text-primary-light">Project Deep Dive</h3>
              </div>
              <p className="mb-6 leading-relaxed text-primary-white">
                Dive into the technical details, architecture, and development process of AV News Stream in this comprehensive blog post.
              </p>
              <a
                href="https://amansuryavanshi-dev.vercel.app/blogs/av-news-stream"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 font-semibold transition-all duration-300 border-2 shadow-lg rounded-2xl shadow-primary-light/20 border-primary-light text-primary-bgColor bg-primary-light hover:bg-primary-yellow hover:border-primary-yellow hover:shadow-primary-yellow/40 hover:transform hover:-translate-y-1"
              >
                Read More
                <FaExternalLinkAlt className="ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Bottom decorative text */}
          <div className="mt-8 text-center">
            <p className="text-sm italic text-primary-yellow/70">
              Built with passion • Designed for excellence • Crafted with care
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperInfo;
