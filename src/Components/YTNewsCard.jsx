import React, { useState } from 'react';
import { FaBookmark, FaPlay, FaTrash, FaYoutube } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { BsPersonVideo3 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { addVideoArticle, removeVideoArticle } from '../utils/SaveSlice';

const YTNewsCard = ({ newsVideos, isArticleSaved }) => {
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const dispatch = useDispatch();

  const handlePlay = (videoId) => setPlayingVideoId(videoId);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRemoveClick = (video) => dispatch(removeVideoArticle(video));
  const handleAddClick = (video) => dispatch(addVideoArticle(video));

  return (
    <>
      {newsVideos?.map((video, index) => (
        <div key={index} className="flex flex-col h-auto overflow-hidden transition-all duration-300 rounded-lg shadow-lg bg-primary-grey hover:shadow-xl">
          <div className="relative h-48">
            {playingVideoId === video.id.videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            ) : (
              <>
                <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="object-cover w-full h-full" />
                <button
                  onClick={() => handlePlay(video.id.videoId)}
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 hover:bg-opacity-70"
                >
                  <FaPlay className="w-12 h-12 transition-transform duration-300 transform text-primary-yellow hover:scale-110" />
                </button>
              </>
            )}
          </div>
          <div className="flex flex-col flex-grow p-4">
            <h2 className="mb-2 font-serif text-xl font-bold transition-colors duration-300 text-primary-white line-clamp-2 hover:text-primary-light">
              {video.snippet.title}
            </h2>
            <p className="mb-2 text-sm text-primary-light line-clamp-2">{video.snippet.description}</p>
            <div className="flex items-center justify-between mb-2 text-xs text-primary-light">
              <span className="flex items-center px-2 py-1 rounded-full bg-primary-dark">
                <BsPersonVideo3 className="mr-1" />
                {video.snippet.channelTitle}
              </span>
              <span className="flex items-center">
                <MdDateRange className="mr-1" />
                {formatDate(video.snippet.publishedAt)}
              </span>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <button
                className={`btn btn-xs normal-case flex items-center gap-1 
                  ${isArticleSaved 
                    ? "bg-primary-dark hover:bg-red-700 text-red-500" 
                    : "bg-primary-dark hover:bg-green-700 text-green-500"
                  } border-none px-2 py-1 rounded-full shadow-md hover:shadow-lg transition-all duration-300`}
                onClick={() => isArticleSaved ? handleRemoveClick(video) : handleAddClick(video)}
              >
                {isArticleSaved ? (
                  <>
                    <span className="text-xs">Remove</span>
                    <FaTrash className="w-2 h-2" />
                  </>
                ) : (
                  <>
                    <span className="text-xs">Save</span>
                    <FaBookmark className="w-2 h-2" />
                  </>
                )}
              </button>
              {video.snippet.liveBroadcastContent === 'live' && (
                <span className="px-2 py-1 text-xs font-semibold text-red-500 bg-red-100 rounded-full">LIVE</span>
              )}
            </div>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-2 text-sm text-center transition-colors duration-300 bg-primary-dark text-primary-yellow hover:bg-primary-yellow hover:text-primary-dark"
          >
            <FaYoutube className="mr-1 text-lg" />
            Watch on YouTube
          </a>
        </div>
      ))}
    </>
  );
};

export default YTNewsCard;