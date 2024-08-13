import React from 'react'
import { FaUser, FaCalendarAlt, FaImage } from 'react-icons/fa'
import useFallbackImage from '../utils/useFallbackImage';
import { useDispatch } from 'react-redux';
import { addArticle, removeArticle } from '../utils/SaveSlice';

const NewsCard = ({ newsData, activeArticleIndex,isArticleSaved }) => {

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
        <div key={index}  className={`overflow-hidden transition-all duration-300 shadow-xl bg-primary-grey card hover:shadow-2xl ${
          index === activeArticleIndex ? 'ring-4 ring-primary-yellow scale-105' : ''
        }`}>
          <figure className="relative h-48">
            <img
              src={imageUrl || ""}
              alt={title}
              onError={handleImageError} 
              loading='lazy'
              className="object-cover w-full h-full"
            />
            <div className="absolute px-2 py-1 text-xs font-bold rounded-full top-2 left-2 badge badge-primary">
            {source && typeof source === 'object' ? (source.name || 'Unknown Source') : (source || 'Unknown Source')}
            </div>
          </figure>
          <div className="p-4 card-body">
            <h2 className="mb-2 text-xl font-bold card-title line-clamp-3">{title}</h2>
            <p className="mb-4 text-sm text-gray-600 line-clamp-5">
              {displayDescription}
            </p>
            <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
              <span className="flex items-center">
                <FaUser className="w-4 h-4 mr-1" />
                {author || 'Unknown Author'}
              </span>
              <span className="flex items-center">
                <FaCalendarAlt className="w-4 h-4 mr-1" />
                {new Date(publishedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="justify-end card-actions">
              <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="normal-case btn btn-primary btn-sm">
                Read More
              </a>
              <button 
              className={`px-4 py-1 text-sm font-semibold transition-all duration-300 rounded-md shadow-md border-2 border-primary-light
                ${isArticleSaved
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-green-500 hover:bg-green-600"
                } text-white`}
              onClick={()=> isArticleSaved ? handleRemoveClick(article) : handleAddClick(article)}>{isArticleSaved ?  "REMOVE" : "Save"}</button>
            </div>
          </div>
        </div>
      );
    })}
    </>
  )
}

export default NewsCard