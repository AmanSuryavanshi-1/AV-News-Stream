import { useEffect, useState } from 'react'
import NewsCard from '../Components/NewsCard'

const pageSize=20;
const page =1;
const country='in';
const category = 'entertainment';
const apiKey = import.meta.env.VITE_API_KEY;

const Body = () =>{
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const NewsData = async() =>{
    try{  
      const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`)
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
  },[]);
  // const [count, setCount] = useState(0)

  return (
    <>
    {loading ? (
        <p>Loading...</p>
      ) : (
    <div>
      <h1>News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <NewsCard 
            key = {index}
            newsInfo = {article}
           />
        ))}
      </div>
    </div>
    )}
    </>
  )
}

export default Body
