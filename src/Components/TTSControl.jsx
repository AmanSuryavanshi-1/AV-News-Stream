import React from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

const TTSControl = ({ readNews, stopReading, pauseReading, resumeReading, isPaused, hasArticles }) => {
  return (
    <div className="fixed z-50 bottom-4 right-4">
      {hasArticles && (
        <div className="flex items-center p-2 space-x-2 bg-white rounded-full shadow-lg dark:bg-gray-800">
          <button 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isPaused ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'
            }`}
            onClick={isPaused ? resumeReading : readNews}
          >
            <FaPlay className={isPaused ? '' : 'ml-1'} />
          </button>
          {!isPaused && (
            <button 
              className="flex items-center justify-center w-10 h-10 text-gray-700 transition-colors duration-300 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-yellow-900"
              onClick={pauseReading}
            >
              <FaPause />
            </button>
          )}
          <button 
            className="flex items-center justify-center w-10 h-10 text-gray-700 transition-colors duration-300 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900"
            onClick={stopReading}
          >
            <FaStop />
          </button>
        </div>
      )}
    </div>
  );
};

export default TTSControl;