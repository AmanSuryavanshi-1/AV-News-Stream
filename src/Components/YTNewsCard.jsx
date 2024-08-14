import React, { useState } from 'react';
import { FaBookmark, FaPlay, FaTrash, FaYoutube } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { BsPersonVideo3 } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { addVideoArticle, removeVideoArticle } from '../utils/SaveSlice';
const YTNewsCard = ({ newsVideos, isArticleSaved }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  console.log("newsVideo:", newsVideos);
  const handlePlay = () => {
    setIsPlaying(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const dispatch = useDispatch();

  const handleRemoveClick= (video)=> {
    dispatch(removeVideoArticle(video));
  }
  const handleAddClick= (video)=> {
    dispatch(addVideoArticle(video));
  }

  return (
    <> 
    {newsVideos?.map((video,index) => (
    <div key={index}  className="overflow-hidden transition-all duration-300 rounded-lg shadow-lg bg-primary-grey hover:shadow-xl">
      <div className="relative">
        <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} className="object-cover w-full h-48" />
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
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          ></iframe>
        )}
      </div>
      <div className="p-4">
        <h2 className="mb-2 font-serif text-xl font-bold text-primary-yellow line-clamp-2">
          {video.snippet.title}
        </h2>
        <p className="h-12 mb-2 text-sm text-primary-light line-clamp-3 max-sm:h-fit">{video.snippet.description}</p>
        <div className="flex items-center justify-between mt-2 text-xs text-primary-light">
          <span className="flex items-center px-2 py-1 rounded bg-primary-dark">
            <BsPersonVideo3 className="mr-1" />
            {video.snippet.channelTitle}
          </span>
          <span className="flex items-center">
            <MdDateRange className="mr-1" />
            {formatDate(video.snippet.publishedAt)}
          </span>
        </div>
       
      </div>
      <button
              className={`btn btn-sm normal-case flex items-center gap-2 
                ${isArticleSaved 
                  ? "bg-primary-bgColor hover:bg-primary-grey text-primary-light border-red-500" 
                  : "bg-primary-bgColor hover:bg-primary-grey text-primary-light border-green-500"
                } border-1 px-4 py-2 rounded-3xl shadow-md hover:shadow-lg`}
              onClick={() => isArticleSaved ? handleRemoveClick(video) : handleAddClick(video)}
            >
            {isArticleSaved ? (
              <>
                <span className='text-red-600'>Remove</span>
                <FaTrash className="w-3 h-3 text-red-600" />
              </>
            ) : (
              <>
                <span className='text-green-500'>Save</span>
                <FaBookmark className="w-3 h-3 text-green-500" />
              </>
            )}
          </button> 
          <p>{video.snippet.liveBroadcastContent}</p>
      <a
        href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center block py-2 text-center transition-colors duration-300 bg-primary-dark text-primary-yellow hover:bg-primary-yellow hover:text-primary-dark"
      >
        <FaYoutube className="mr-2" />
        Watch on YouTube
      </a>
    </div>
    ))}
  </>
  );
};

export default YTNewsCard;
