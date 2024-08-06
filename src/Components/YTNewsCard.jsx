// src/YTNewsCard.js
import React, { useState } from 'react';

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
    <div className="video-item">
      <h3>{title}</h3>
      {!isPlaying ? (
        <div className="video-thumbnail" onClick={handlePlay}>
          <img src={thumbnail} alt={title} />
          <div className="play-button">▶</div>
        </div>
      ) : (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?host=https://www.youtube-nocookie.com`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        ></iframe>
      )}
      <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
      Watch on YouTube
    </a>
      <p>{description}</p>
      <p>Channel: {channelTitle}</p>
      <p>Published: {formatDate(publishedAt)}</p>
    </div>
  );
};

export default YTNewsCard;