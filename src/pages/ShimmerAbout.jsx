import React from 'react';

const ShimmerBox = ({ width, height }) => (
  <div 
    className={`bg-gray-300 animate-pulse rounded-md ${width} ${height}`}
  ></div>
);

const ShimmerAbout = () => {
  return (
    <div className="relative flex flex-col p-8 items-center h-[90%]">
      <ShimmerBox width="w-36" height="h-10" />
      
      <div className="w-full mt-8">
        <ShimmerBox width="w-full" height="h-64" />
      </div>
      
      <div className="w-full mt-8">
        <ShimmerBox width="w-full" height="h-96" />
      </div>
      
      <div className="w-full mt-8">
        <ShimmerBox width="w-full" height="h-64" />
      </div>
      
      <div className="w-full mt-8">
        <ShimmerBox width="w-full" height="h-48" />
      </div>
    </div>
  );
};

export default ShimmerAbout;