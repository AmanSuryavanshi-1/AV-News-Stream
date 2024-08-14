import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NewsCard from '../Components/NewsCard';
import { clearArticles } from '../utils/SaveSlice';
import { FaArrowRight, FaTrash, FaBookmark, FaNewspaper, FaYoutube } from 'react-icons/fa';
import YTNewsCard from '../Components/YTNewsCard';

const Saved = () => {
  const savedArticles = useSelector((store) => store.save.savedArticles);
  const savedVideos = useSelector((store) => store.save.savedVideos);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearArticles());
  }

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-primary-bgColor to-gray-900 text-primary-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="flex items-center justify-center mb-8 space-x-4">
          <FaBookmark className="text-4xl text-primary-yellow" />
          <h1 className="font-serif text-3xl font-bold text-center md:text-4xl text-primary-yellow">
            Saved Content
          </h1>
        </div>
        
        {savedArticles.length + savedVideos.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-lg text-gray-300">
                You have <span className="font-bold text-primary-yellow">{savedArticles.length + savedVideos.length}</span> saved item{savedArticles.length + savedVideos.length !== 1 ? 's' : ''}
              </p>
              <button 
                onClick={handleClearCart}
                className="flex items-center px-4 py-2 text-sm font-medium transition-colors duration-300 bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <FaTrash className="mr-2" />
                Clear All
              </button>
            </div>

            {savedArticles.length > 0 && (
              <div className="mb-12">
                <h2 className="flex items-center mb-6 text-2xl font-semibold text-primary-yellow">
                  <FaNewspaper className="mr-2" />
                  Saved Articles
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <NewsCard
                    newsData={savedArticles}
                    activeArticleIndex={-1}
                    isArticleSaved={true}
                  />
                </div>
              </div>
            )}

            {savedVideos.length > 0 && (
              <div className="mb-12">
                <h2 className="flex items-center mb-6 text-2xl font-semibold text-primary-yellow">
                  <FaYoutube className="mr-2" />
                  Saved Videos
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <YTNewsCard
                    newsVideos={savedVideos}
                    activeArticleIndex={-1}
                    isArticleSaved={true}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 mb-6 text-primary-yellow">
              <FaNewspaper className="w-full h-full" />
            </div>
            <p className="mb-4 text-2xl font-medium text-primary-yellow">Your saved list is empty</p>
            <p className="mb-8 text-lg text-gray-300">Save interesting articles and videos to view them later!</p>
            <Link to="/">
              <button className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-[3px] rounded-full shadow-md border-primary-yellow text-primary-light group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full text-primary-light bg-primary-yellow group-hover:translate-x-0 ease">
                <FaArrowRight/>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full transition-all duration-300 transform text-primary-light group-hover:translate-x-full ease">Browse Content</span>
                <span className="relative invisible">Browse Content</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Saved;