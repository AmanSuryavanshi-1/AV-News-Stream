import React, { useState, useEffect } from 'react';
import NewsCard from '../Components/NewsCard';
import { Link } from 'react-router-dom';

const apiKey = import.meta.env.VITE_API_KEY;
const country = 'us';
const pageSize = 21; // Adjust this number as needed

const HomePage = () => {
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];

  useEffect(() => {
    const fetchTopNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&pageSize=${pageSize}`);
        const data = await response.json();
        setTopNews(data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top news:", error);
        setLoading(false);
      }
    };

    fetchTopNews();
  }, []);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-primary-yellow">Top Headlines</h1>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="loading loading-spinner loading-lg text-primary-yellow"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topNews.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              description={article.description}
              imageUrl={article.urlToImage}
              newsUrl={article.url}
              author={article.author}
              date={article.publishedAt}
              source={article.source.name}
            />
          ))}
        </div>
      )}
 </div>
    
  );
};

export default HomePage;