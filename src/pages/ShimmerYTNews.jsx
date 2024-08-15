import React from 'react';

const YTNewsCardShimmer = () => {
  return (
    <div className="flex flex-col h-auto overflow-hidden rounded-lg shadow-lg bg-primary-grey animate-pulse">
      <div className="relative h-48 bg-gray-700"></div>
      <div className="flex flex-col flex-grow p-4">
        <div className="w-3/4 h-6 mb-2 bg-gray-600 rounded"></div>
        <div className="h-4 mb-2 bg-gray-600 rounded"></div>
        <div className="w-5/6 h-4 mb-2 bg-gray-600 rounded"></div>
        <div className="flex items-center justify-between mb-2">
          <div className="w-1/3 h-4 px-2 py-1 bg-gray-600 rounded-full"></div>
          <div className="w-1/4 h-4 bg-gray-600 rounded"></div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="w-1/5 h-5 bg-gray-600 rounded-full"></div>
          <div className="w-2/5 h-5 bg-gray-600 rounded-xl"></div>
          <div className="w-1/4 h-8 bg-gray-600 rounded-3xl"></div>
        </div>
      </div>
      <div className="h-10 bg-gray-700"></div>
    </div>
  );
};

const ShimmerYTNews = () => {
  return (
    <div className="min-h-screen font-sans bg-primary-bgColor text-primary-white">
      <div className="container px-4 py-8 mx-auto">
        <div className="w-3/4 h-12 mx-auto mb-8 bg-gray-700 rounded"></div>
        <div className="container px-4 mx-auto">
          <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
            {[...Array(6)].map((_, index) => (
              <YTNewsCardShimmer key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerYTNews;