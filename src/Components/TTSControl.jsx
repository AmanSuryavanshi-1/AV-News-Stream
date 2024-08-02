import React, { useState } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

const TTSControl = ({ readNews, stopReading, pauseReading, resumeReading, hasArticles }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseReading();
    } else {
      readNews();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    stopReading();
    setIsPlaying(false);
  };

  return (
    <div className="fixed z-50 bottom-4 right-4">
      {hasArticles && (
        <div className="flex items-center p-2 space-x-2 bg-white rounded-full shadow-lg dark:bg-gray-800">
          <button 
            className="flex items-center justify-center w-10 h-10 text-gray-700 transition-colors duration-300 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
          </button>
          <button 
            className="flex items-center justify-center w-10 h-10 text-gray-700 transition-colors duration-300 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-900"
            onClick={handleStop}
          >
            <FaStop />
          </button>
        </div>
      )}
    </div>
  );
};

export default TTSControl;