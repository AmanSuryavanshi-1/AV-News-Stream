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
        <div className="flex items-center p-1.5 space-x-1.5 bg-primary-yellow rounded-full shadow-lg">
          <button 
            className={`flex items-center justify-center w-10 h-10 text-primary-dark transition-colors duration-300 rounded-full ${
              isPlaying ? 'bg-primary-light hover:bg-primary-white' : 'bg-primary-white hover:bg-primary-light'
            }`}
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg ml-0.5" />}
          </button>
          <button 
            className="flex items-center justify-center w-10 h-10 transition-colors duration-300 rounded-full text-primary-dark bg-primary-white hover:bg-primary-light"
            onClick={handleStop}
          >
            <FaStop className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TTSControl;