import React, { useState } from 'react';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Auth = () => {
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    console.log(`${formType} form submitted`);
  };

  return (
    <div className="flex mb-8 items-center justify-center h-[90%] p-4 font-sans bg-primary-bgColor">
      <div className={`relative mt-5 overflow-hidden bg-primary-dark rounded-3xl shadow-xl w-full max-w-[768px] min-h-[480px] ${isActive ? 'active' : ''}`}>
        <div className="absolute top-0 w-full h-full transition-all ease-in-out duration-600">
          
          {/* Sign Up Form */}
          <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out ${isActive ? 'translate-x-0 opacity-100 z-20' : 'translate-x-full opacity-0 z-10'} w-1/2 right-0`}>
            <form onSubmit={(e) => handleSubmit(e, 'signup')} className="flex flex-col items-center justify-center h-full px-6 bg-primary-dark sm:px-10 max-md:px-2">
              <h1 className="mb-4 font-serif text-2xl font-bold text-primary-white max-md:text-xl">Create Account</h1>
              {/* <div className="flex mb-5 space-x-3">
                {[<FaGooglePlusG />, <FaGithub />, <FaLinkedinIn />].map((icon, index) => (
                  <a key={index} href="#" className="flex items-center justify-center w-10 h-10 transition-colors duration-300 rounded-lg bg-primary-yellow text-primary-dark hover:bg-primary-light hover:text-primary-dark">
                    {icon}
                  </a>
                ))}
              </div> */}
              <div className="w-full mt-4">
                <button className="flex items-center justify-center w-full px-4 py-2 text-xs font-medium transition-colors duration-300 border rounded-lg shadow-sm text-primary-grey bg-primary-white border-primary-grey hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow max-md:px-1">
                  <FcGoogle className="mr-2" /> <span>Continue with Google</span>
                </button>
              </div>
              <span className="my-4 text-sm text-center text-primary-white max-md:text-xs">or use your email for registration</span>
              <input type="text" placeholder="Name" className="w-full px-4 py-2 mb-2 text-sm border-none rounded-lg outline-none bg-primary-grey text-primary-white" />
              <input type="email" placeholder="Email" className="w-full px-4 py-2 mb-2 text-sm border-none rounded-lg outline-none bg-primary-grey text-primary-white" />
              <input type="password" placeholder="Password" className="w-full px-4 py-2 mb-2 text-sm border-none rounded-lg outline-none bg-primary-grey text-primary-white" />
              <button type="submit" className="px-12 py-3 mt-4 text-xs font-semibold tracking-wide uppercase transition-colors duration-300 rounded-lg cursor-pointer text-primary-dark bg-primary-yellow hover:bg-yellow-400">Sign Up</button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out ${isActive ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100 z-20'} left-0 w-1/2`}>
            <form onSubmit={(e) => handleSubmit(e, 'signin')} className="flex flex-col items-center justify-center h-full px-6 bg-primary-dark sm:px-10 max-md:px-2">
              <h1 className="mb-4 font-serif text-2xl font-bold text-primary-white max-md:text-xl">Sign In</h1>
              {/* <div className="flex mb-5 space-x-3">
                {[<FaGooglePlusG />, <FaGithub />, <FaLinkedinIn />].map((icon, index) => (
                  <a key={index} href="#" className="flex items-center justify-center w-10 h-10 transition-colors duration-300 rounded-lg bg-primary-yellow text-primary-dark hover:bg-primary-light hover:text-primary-dark">
                    {icon}
                  </a>
                ))}
              </div> */}
              <div className="w-full mt-4">
                <button className="flex items-center justify-center w-full px-4 py-2 text-xs font-medium transition-colors duration-300 border rounded-lg shadow-sm text-primary-grey bg-primary-white border-primary-grey hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow max-md:px-1">
                  <FcGoogle className="mr-2" /> <span>Continue with Google</span>
                </button>
              </div>
              <span className="my-4 text-sm text-center text-primary-white max-md:text-xs">or use your email password</span>
              <input type="email" placeholder="Email" className="w-full px-4 py-2 mb-2 text-sm border-none rounded-lg outline-none bg-primary-grey text-primary-white" />
              <input type="password" placeholder="Password" className="w-full px-4 py-2 mb-2 text-sm border-none rounded-lg outline-none bg-primary-grey text-primary-white" />
              <a href="#" className="my-2 text-sm transition-colors duration-300 text-primary-yellow hover:text-yellow-400">Forgot Your Password?</a>
              <button type="submit" className="px-12 py-3 mt-4 text-xs font-semibold tracking-wide uppercase transition-colors duration-300 rounded-lg cursor-pointer text-primary-dark bg-primary-yellow hover:bg-yellow-400">Sign In</button>
            </form>
          </div>
        </div>

        {/* Toggle Container */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out ${isActive ? '-translate-x-full rounded-r-[150px]' : 'rounded-l-[150px]'} z-50`}>
          <div className={`bg-gradient-to-r from-primary-yellow to-primary-light text-primary-dark relative -left-full h-full w-[200%] ${isActive ? 'translate-x-1/2' : 'translate-x-0'} transition-all duration-600 ease-in-out`}>
            <div className={`absolute flex flex-col items-center justify-center px-8 text-center top-0 h-full w-1/2 ${isActive ? 'translate-x-0' : '-translate-x-[200%]'} transition-all duration-600 ease-in-out max-md:px-2`}>
              <h1 className="mb-2 font-serif text-2xl font-bold max-md:text-xl">Welcome Back!</h1>
              <p className="mb-4 text-sm max-md:text-xs">Enter your personal details to use all of site features</p>
              <button onClick={() => setIsActive(false)} className="px-12 py-3 text-xs font-semibold tracking-wide uppercase transition-colors duration-300 bg-transparent border rounded-lg cursor-pointer text-primary-dark border-primary-dark hover:bg-primary-dark hover:text-primary-white" >Sign In</button>
            </div>
            <div className={`absolute flex flex-col items-center justify-center px-8 text-center top-0 right-0 h-full w-1/2 ${isActive ? 'translate-x-[200%]' : 'translate-x-0'} transition-all duration-600 ease-in-out max-md:px-2`}>
              <h1 className="mb-2 font-serif text-2xl font-bold max-md:text-xl">Hello, Friend!</h1>
              <p className="mb-4 text-sm max-md:text-xs">Register with your personal details to use all of site features</p>
              <button onClick={() => setIsActive(true)} className="px-12 py-3 text-xs font-semibold tracking-wide uppercase transition-colors duration-300 bg-transparent border rounded-lg cursor-pointer text-primary-dark border-primary-dark hover:bg-primary-dark hover:text-primary-white">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;