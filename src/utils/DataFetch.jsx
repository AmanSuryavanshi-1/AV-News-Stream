import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

const DataFetch = () => {
  const { setNewsCopy } = useOutletContext();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const fetchAPI = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const fetchNewsapiAPI = async () => {
    let url = '/api/news';
    if (category) {
      url += `?category=${category}`;
    }
    const json = await fetchAPI(url);
    return json.articles || [];
  };

  const fetchGNewsAPI = async () => {
    const apikey = '9dc8fb63eb67d27205e56edc0cd6742e';
    const url = `https://gnews.io/api/v4/top-headlines?category=${category || 'general'}&lang=en&country=in&max=9&apikey=${apikey}`;
    const json = await fetchAPI(url);
    return json.articles || [];
  };

  const NewsData = async () => {
    try {
      const [NewsOrgArticles, GNewsArticles] = await Promise.all([
        fetchNewsapiAPI(),
        fetchGNewsAPI()
      ]);

      const mergedArticles = [...GNewsArticles, ...NewsOrgArticles];

      // Sort articles with valid image URLs on top
      const sortedArticles = mergedArticles.sort((a, b) => {
        if (a.urlToImage && !b.urlToImage) return -1;
        if (!a.urlToImage && b.urlToImage) return 1;
        return 0;
      });

      console.log(sortedArticles);
      setNews(sortedArticles);
      setNewsCopy(sortedArticles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    NewsData();
  }, [category, setNewsCopy]);

  return { news, loading };
};

export default DataFetch;