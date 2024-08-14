import React from 'react'
import img from '../../assets/AS main.png'; // Ensure this path is correct
import { FaAward } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { VscFolderLibrary } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

const AboutMe = () => {
  return (
    <div className="flex items-center justify-center h-full mx-2 mb-4 sm:mx-8">
      <div className="w-full max-w-6xl px-2 mx-2 sm:px-4 sm:mx-12">
        <h5 className="mb-2 text-xs text-center uppercase text-primary-yellow">Get To Know</h5>
        <h2 className="mb-4 font-serif text-2xl font-bold text-center sm:mb-8 sm:text-3xl text-primary-light">About Me</h2>

        <div className="grid items-center grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative flex items-center justify-center mb-4">
            <div className="absolute shadow-lg shadow-primary-light w-56 sm:w-72 h-48 sm:h-64 bg-primary-yellow rounded-2xl transform transition duration-300 hover:rotate-[-10deg]"></div>
            <div className="w-56 sm:w-72 h-48 sm:h-64 overflow-hidden transform rotate-[-5deg] duration-300 bg-white shadow-lg rounded-2xl transition hover:rotate-0">
              <img src={img} loading='eager' alt="AboutImage" className="object-cover w-full h-full" />
            </div>
          </div>

          <div className="about_content">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <article className="p-4 sm:p-6 text-center transition-all duration-300 border-2 rounded-2xl shadow-sm shadow-primary-light bg-primary-bgColor border-primary-yellow hover:shadow-sm hover:shadow-primary-light hover:bg-primary-dark transform hover:translate-y-[-10px]">
                <FaAward className="mx-auto mb-2 text-2xl sm:text-3xl text-primary-yellow" />
                <h5 className="mb-2 font-serif text-base font-bold sm:text-lg text-primary-light">Experience</h5>
                <small className="text-xs text-primary-white">1+ Years Working</small>
              </article>

              <article className="p-4 sm:p-6 text-center transition-all duration-300 border-2 rounded-2xl shadow-sm shadow-primary-light bg-primary-bgColor border-primary-yellow hover:shadow-sm hover:shadow-primary-light hover:bg-primary-dark transform hover:translate-y-[-10px]">
                <FiUsers className="mx-auto mb-2 text-2xl sm:text-3xl text-primary-yellow" />
                <h5 className="mb-2 font-serif text-base font-bold sm:text-lg text-primary-light">Worked With</h5>
                <small className="text-xs text-primary-white">2+ Companies</small>
              </article>

              <article className="p-4 sm:p-6 text-center transition-all duration-300 border-2 rounded-2xl shadow-sm shadow-primary-light bg-primary-bgColor border-primary-yellow hover:shadow-sm hover:shadow-primary-light hover:bg-primary-dark transform hover:translate-y-[-10px]">
                <VscFolderLibrary className="mx-auto mb-2 text-2xl sm:text-3xl text-primary-yellow" />
                <h5 className="mb-2 font-serif text-base font-bold sm:text-lg text-primary-light">Projects</h5>
                <small className="text-xs text-primary-white">35+ Completed</small>
              </article>
            </div>

            <div className="flex justify-center mt-6 sm:mt-8">
              <Link to="/contact"  className="flex items-center justify-center px-4 py-2 transition-all duration-300 border-2 shadow-sm cursor-pointer sm:px-5 sm:py-3 rounded-2xl shadow-primary-light bg-primary-yellow text-primary-bgColor border-primary-white hover:bg-primary-light hover:text-primary-bgColor hover:border-transparent">
                <button className='font-sans text-xs sm:text-sm'>Let's Talk</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <p className="max-w-6xl my-6 text-base leading-6 text-justify sm:my-10 sm:text-lg sm:leading-7 text-primary-light">
            Hi, I'm a web developer and UI/UX designer with a passion for creating beautiful, functional, and user-centered digital experiences. I am always looking for new and innovative ways to bring my visions to life. I believe that design is about more than just making things look pretty - it's about solving problems and creating intuitive, enjoyable experiences for users. Whether I'm working on a website or a mobile app, I bring my commitment to design excellence and user-centered thinking to every project I work on. I look forward to the opportunity to bring my skills and passion to the next project.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutMe