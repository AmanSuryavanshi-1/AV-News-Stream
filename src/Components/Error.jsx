import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai"; // Example: using AiOutlineHome from react-icons/ai

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary-light via-primary-yellow to-yellow-200">
      <div className="p-10 text-center transition duration-500 transform shadow-2xl bg-primary-bgColor rounded-2xl hover:scale-105">
        <div className="flex justify-center mb-4">
          <AiOutlineHome className="w-16 h-16 text-primary-yellow animate-bounce" /> {/* Example: using AiOutlineHome */}
        </div>
        <h1 className="mb-4 text-6xl font-bold text-primary-yellow">OOPS!!!</h1>
        <h2 className="mb-2 text-2xl font-semibold text-primary-light">Something went wrong</h2>
        <h3 className="mb-4 text-lg text-primary-light">Check URL path again</h3>
        <h4 className="mb-6 text-lg text-primary-light">
          {err.status}: {err.statusText}
        </h4>
        <button className="px-6 py-2 transition duration-300 rounded-full shadow-md bg-primary-yellow text-primary-bgColor hover:bg-primary-light">
            <Link to="/" className="flex items-center"> 
            <AiOutlineHome className="w-5 h-5 mr-2" /> 
            Go Back Home
            </Link>
            
        </button>
      </div>
    </div>
  );
};

export default Error;