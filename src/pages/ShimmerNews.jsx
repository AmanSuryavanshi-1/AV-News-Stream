import React from 'react';

const ShimmerNewsCard = () => {
  return (
    <div className="overflow-hidden font-sans shadow-xl card bg-primary-grey animate-pulse">
      <div className="relative">
        <div className="w-full h-64 bg-gray-700"></div>
        <div className="absolute w-24 h-6 px-3 py-2 bg-gray-600 top-3 left-3"></div>
      </div>
      
      <div className="p-5 card-body">
        <div className="w-3/4 h-8 mb-3 bg-gray-600 rounded"></div>
        <div className="mb-4 space-y-2">
          <div className="h-4 bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-600 rounded"></div>
          <div className="w-5/6 h-4 bg-gray-600 rounded"></div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="w-1/3 h-4 bg-gray-600 rounded"></div>
          <div className="w-1/3 h-4 bg-gray-600 rounded"></div>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="w-24 h-8 bg-gray-600 rounded-2xl"></div>
          <div className="w-20 h-8 bg-gray-600 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};

const ShimmerNews = () => {
  return (
    <div className="min-h-screen font-sans bg-primary-bgColor text-primary-white">
      <div className="container px-4 py-8 mx-auto">
        <div className="w-3/4 h-12 mx-auto mb-8 bg-gray-700 rounded"></div>
        
        <div className="h-10 mb-8 bg-gray-700 rounded"></div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <ShimmerNewsCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerNews;