import React from 'react';
import useYTNewsFetch from '../utils/useYTNewsFetch';
import YTNewsCard from '../Components/YTNewsCard';

const YTNews = () => {
  const { videos, loading } = useYTNewsFetch();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary-bgColor">
        <span className="loading loading-spinner loading-lg text-primary-yellow"></span>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary-bgColor text-primary-white">
        <p className="font-sans text-2xl">No videos available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-primary-bgColor text-primary-white">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 font-serif text-3xl font-bold text-center md:text-4xl lg:text-5xl text-primary-yellow">
          Watch Latest News Videos
        </h1>
        <div className="container px-4 mx-auto">
          <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
            <YTNewsCard
              newsVideos={videos}
              // activeVideoId={videos[0].id.videoId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YTNews;