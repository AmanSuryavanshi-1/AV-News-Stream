import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom';

const DataFetch = () => {
    
  const { setNewsCopy } = useOutletContext(); // FOR READING NEWS

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true); 
    const { category } = useParams();  
  const NewsData = async() =>{

    try{  
      // let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      // If there's is category then appending that in link else it will show top headlines
      let url = '/api/news';
      if(category)[
        url += `?category=${category}`
      ]
      // const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`)
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      const json = await data.json();
      // console.log(json);
      setNews(json?.articles || []);
      setNewsCopy(json?.articles || []); // FOR DISPLAYING & READING NEWS 

      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([])
      setLoading(false);
    }
  };

  
  useEffect(()=>{
    NewsData();
  },[category, setNewsCopy]);

  return {news, loading}
}

export default DataFetch
