import { useEffect, useState } from 'react'
import NewsCard from '../Components/NewsCard'

const pageSize=20;
const page =1;
const country='us';
const category = 'technology';
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
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
    <div>
      <h1>News</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((i, index) => (
          <NewsCard 
            key = {index}
            // newsInfo = {i}
            title={i.title ? i.title: ' '}
            description={i.description ? i.description.slice(0, 180) : ' '}
            imageUrl={i.urlToImage}
            newsUrl={i.url}
            author={i.author}
            date={i.publishedAt}
            source={i.source.name}
           />
        ))}
      </div>
    </div>
    )}
    </>
  )
}

export default Body
