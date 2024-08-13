import React, { useState } from 'react';
import { FaPlay, FaYoutube } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { BsPersonVideo3 } from 'react-icons/bs';

const YTNewsCard = ({ videoId, title, description, thumbnail, channelTitle, publishedAt }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="overflow-hidden transition-all duration-300 rounded-lg shadow-lg bg-primary-grey hover:shadow-xl">
      <div className="relative">
        <img src={thumbnail} alt={title} className="object-cover w-full h-48" />
        {!isPlaying ? (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 hover:bg-opacity-70"
          >
            <FaPlay className="w-16 h-16 text-primary-yellow" />
          </button>
        ) : (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          ></iframe>
        )}
      </div>
      <div className="p-4">
        <h2 className="mb-2 font-serif text-xl font-bold text-primary-yellow line-clamp-2">
          {title}
        </h2>
        <p className="h-12 mb-2 text-sm text-primary-light line-clamp-3 max-sm:h-fit">{description}</p>
        <div className="flex items-center justify-between mt-2 text-xs text-primary-light">
          <span className="flex items-center px-2 py-1 rounded bg-primary-dark">
            <BsPersonVideo3 className="mr-1" />
            {channelTitle}
          </span>
          <span className="flex items-center">
            <MdDateRange className="mr-1" />
            {formatDate(publishedAt)}
          </span>
        </div>
      </div>
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center block py-2 text-center transition-colors duration-300 bg-primary-dark text-primary-yellow hover:bg-primary-yellow hover:text-primary-dark"
      >
        <FaYoutube className="mr-2" />
        Watch on YouTube
      </a>
    </div>
  );
};

export default YTNewsCard;