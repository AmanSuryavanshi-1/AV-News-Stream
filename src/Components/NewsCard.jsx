import React from 'react'
import { FaUser, FaCalendarAlt, FaImage, FaExternalLinkAlt, FaBookmark, FaTrash } from 'react-icons/fa'
import useFallbackImage from '../utils/useFallbackImage';
import { useDispatch } from 'react-redux';
import { addArticle, removeArticle } from '../utils/SaveSlice';

const NewsCard = ({ newsData, activeArticleIndex, isArticleSaved }) => {

  // console.log(source);
  // Default descriptions
  const defaultDescriptions = [
    "Stay informed with the latest updates on this developing story. Our news team is working to bring you more details as they become available.",
    "Breaking news: This is a developing story. Check back for updates as we continue to gather information from our sources.",
    "In-depth coverage: Our reporters are investigating this story from all angles. More comprehensive details will be provided soon.",
    "Our team is investigating this breaking news. More details will follow as they become available.",
    "We are actively following this story and will provide more information as soon as it becomes available.",
    "Keep an eye on this space for more updates. Our reporters are on the ground gathering the latest details.",
    "Our newsroom is committed to bringing you the latest updates on this situation as it unfolds."
  ];

  // Function to get a random default description
  const getDefaultDescription = () => {
    const randomIndex = Math.floor(Math.random() * 7);
    return defaultDescriptions[randomIndex];
  };

  // Handling Null images
  const handleImageError = useFallbackImage();

  // Adding Save functionality
  const dispatch = useDispatch(); 
  const handleAddClick = (article) =>{
    dispatch(addArticle(article));
  }

  // Adding remove feature if article get added to saved
  const handleRemoveClick = (article) => {
    dispatch(removeArticle(article));
  }

  return (
    <>
    {newsData.map((article, index) => {
        const { 
          title, 
          description, 
          urlToImage, 
          image, 
          url, 
          source, 
          author, 
          publishedAt 
        } = article;
  // Use description if available and not empty, otherwise use a default description
  const displayDescription = description && description.trim() !== "" ? description.slice(0, 180) : getDefaultDescription();
  const imageUrl = urlToImage || image;
  const newsUrl = url || (source && source.url);
    return(
      <div key={index} className={`font-sans card bg-primary-grey shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden ${
        index === activeArticleIndex ? 'ring-4 ring-primary-yellow scale-105' : ''
      }`}>
        <figure className="relative">
          <img
            src={imageUrl || ""}
            alt={title}
            onError={handleImageError}
            loading='lazy'
            className="object-cover w-full h-64"
          />
          <div className="absolute px-3 py-2 font-bold top-3 left-3 badge bg-primary-yellow text-primary-dark">
            {source && typeof source === 'object' ? (source.name || 'Unknown Source') : (source || 'Unknown Source')}
          </div>
        </figure>
        
        <div className="p-5 card-body">
          <h2 className="mb-3 font-serif text-2xl font-bold card-title line-clamp-2 text-primary-white">{title}</h2>
          <p className="mb-4 text-sm text-primary-light line-clamp-3">{displayDescription}</p>
          
          <div className="flex items-center justify-between mb-4 text-xs text-primary-light">
            <span className="flex items-center">
              <FaUser className="w-3 h-3 mr-2" />
              {author || 'Unknown Author'}
            </span>
            <span className="flex items-center">
              <FaCalendarAlt className="w-3 h-3 mr-2" />
              {new Date(publishedAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="items-center justify-between mt-auto card-actions">
            <a 
              href={newsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 normal-case transition-colors duration-300 rounded-2xl btn bg-primary-yellow hover:bg-primary-light text-primary-dark hover:text-primary-dark btn-sm"
            >
              Read More
              <FaExternalLinkAlt className="w-3 h-3" />
            </a>
            <button
              className={`btn btn-sm normal-case flex items-center gap-2 
                ${isArticleSaved 
                  ? "bg-primary-bgColor hover:bg-primary-grey text-primary-light border-red-500" 
                  : "bg-primary-bgColor hover:bg-primary-grey text-primary-light border-green-500"
                } border-1 px-4 py-2 rounded-3xl shadow-md hover:shadow-lg`}
              onClick={() => isArticleSaved ? handleRemoveClick(article) : handleAddClick(article)}
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
              {/* {isArticleSaved ? "Remove" : "Save"}
              <FaBookmark className="w-3 h-3" />
            </button> */}
          </div>
        </div>
      </div>  
      );
    })}
    </>
  )
}

export default NewsCard