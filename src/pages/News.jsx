import React from 'react';
import { useEffect } from 'react'
import NewsCard from '../Components/NewsCard'
import { useOutletContext, useParams } from 'react-router-dom';
import NavbarCategorySearch from '../Components/NavbarCategorySearch'
import DataFetch from '../utils/DataFetch';

const News = ( ) =>{
  const { newsCopy , activeArticleIndex } = useOutletContext(); // for speech & displaying

  const { loading } = DataFetch();  
  const { category } = useParams();
  
  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(category)} - AI NewsMate`;
  },[category]);

  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };
  return (
    <>
     <div className="min-h-screen font-sans bg-primary-bgColor text-primary-white">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner loading-lg text-primary-yellow"></span>
        </div>
      ) : (
        <div className="container px-4 py-8 mx-auto">
          <h1 className="mb-8 font-serif text-3xl font-bold text-center md:text-4xl lg:text-5xl text-primary-yellow">
            AI NewsMate: Top {capitalizeFirstLetter(category)} Headlines
          </h1>
          
        <NavbarCategorySearch />
        
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <NewsCard 
                newsData={newsCopy}
                activeArticleIndex={activeArticleIndex}
              />
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default News
