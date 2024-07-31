import { useEffect, useState } from 'react'
import NewsCard from '../Components/NewsCard'
import { useParams } from 'react-router-dom';

const pageSize=21;
const page =1;
const country='us';
// const category = 'technology';
const apiKey = import.meta.env.VITE_API_KEY;

const News = ( ) =>{
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

  const { category } = useParams();
  
  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(category)} - AI NewsMate`;
    NewsData();
  },[category]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((i, index) => (
              <NewsCard 
                key={index}
                title={i.title ? i.title : ' '}
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
    </div>
    </>
  )
}

export default News
