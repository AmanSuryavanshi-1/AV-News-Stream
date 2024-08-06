import React from 'react';
import useYTNewsFetch from '../utils/useYTNewsFetch';
import YTNewsCard from '../Components/YTNewsCard';

const YTNews = () => {
  const { videos, loading } = useYTNewsFetch();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (videos.length === 0) {
    return <p>No videos available.</p>;
  }

  return (
    <div>
      <h1>Watch Latest News Videos</h1>
      <div>
        {videos.map((video) => (
          <YTNewsCard
            key={video.id.videoId}
            videoId={video.id.videoId}
            channelTitle={video.snippet.channelTitle}
            description={video.snippet.description}
            live={video.snippet.liveBroadcastContent}
            publishedAt={video.snippet.publishedAt}
            thumbnail={video.snippet.thumbnails.high.url}
            title={video.snippet.title}
          />
        ))}
      </div>
    </div>
  );
};

export default YTNews;
