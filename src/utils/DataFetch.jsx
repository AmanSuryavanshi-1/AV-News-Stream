import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const pageSize=21;
const page =1;
const country='us';
const apiKey = import.meta.env.VITE_API_KEY;
const DataFetch = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true); 
    const { category } = useParams();  
  const NewsData = async() =>{

    try{  
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      // If there's is category then appending that in link else it will show top headlines
      if(category)[
        url += `&category=${category}`
      ]
      // const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`)
      const data = await fetch(url);
      const json = await data.json();
      console.log(json);
      setNews(json?.articles);
      
    //   setNews(articles.concat(json.articles));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([])
      setLoading(false);
    }
  };

  
  useEffect(()=>{
    NewsData();
  },[category]);

  return {news, loading}
}

export default DataFetch
