import React from 'react';
import { useEffect } from 'react'
import NewsCard from '../Components/NewsCard'
import { useOutletContext, useParams } from 'react-router-dom';
import NavbarCategorySearch from '../Components/NavbarCategorySearch'
import DataFetch from '../utils/DataFetch';
import ShimmerNews from './ShimmerNews';

const News = ( ) =>{
  const { newsCopy , activeArticleIndex } = useOutletContext(); // for speech & displaying

  const { loading, loadingMore, hasMore, loadMore } = DataFetch();  
  const { category } = useParams();
  
  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(category)} - AV NewsStream`;
  },[category]);

  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };
  
  return (
    <>
     <div className="min-h-screen font-sans bg-primary-bgColor text-primary-white">
        {loading ? (
          <ShimmerNews />
        ) : (
        <div className="container px-4 py-8 mx-auto">
          <h1 className="mb-8 font-serif text-3xl font-bold text-center md:text-4xl lg:text-5xl text-primary-yellow">
            AV NewsStream: Top {capitalizeFirstLetter(category)} Headlines
          </h1>
          
        <NavbarCategorySearch />
        
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <NewsCard 
                newsData={newsCopy}
                activeArticleIndex={activeArticleIndex}
              />
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-12 mb-8">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-8 py-3 font-semibold transition-all duration-300 rounded-full bg-primary-yellow text-primary-bgColor hover:bg-yellow-400 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loadingMore ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading More...
                  </span>
                ) : (
                  'Load More News'
                )}
              </button>
            </div>
          )}

          {/* End of News Message */}
          {!hasMore && newsCopy.length > 0 && (
            <div className="py-8 text-center text-primary-grey">
              <p className="text-lg">You've reached the end of {capitalizeFirstLetter(category)} news</p>
              <p className="mt-2 text-sm">Check back later for more updates!</p>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  )
}

export default News
