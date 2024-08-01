// src/Components/TTSControl.jsx
import React from 'react';

const TTSControl = ({ readNews, stopReading, hasArticles }) => {
  return (
    <div className="fixed z-50 bottom-4 right-4">
      <button 
        onClick={readNews}
        disabled={!hasArticles}
        className={`px-4 py-2 rounded mr-2 ${
          hasArticles 
            ? "bg-primary-yellow text-primary-dark cursor-pointer" 
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        Read News
      </button>
      <button 
        onClick={stopReading}
        className="px-4 py-2 rounded bg-primary-red text-primary-white"
      >
        Stop Reading
      </button>
    </div>
  );
};

export default TTSControl;