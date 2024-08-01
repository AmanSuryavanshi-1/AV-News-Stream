import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import DataFetch from '../utils/DataFetch';

// const pageSize=21;
// const page =1;
// const country='us';
// const apiKey = import.meta.env.VITE_API_KEY;
const SearchBar = () => {
    const { setNewsCopy } = useOutletContext(); // FOR READING NEWS
    // const [newsCopy, setNewsCopy] = useState([]);
 const {news = []} = DataFetch();   // taking the complete original newsdata for searching in it
    const [searchText, setSearchText] = useState("");
console.log(news);
    // const handleSearch = (e) => {
    //     // e.preventDefault();
    //     // if (searchText.trim() === "") {
    //     //     return;
    //     // }
    //     const searchedNews = news.filter((article) =>
    //         article.title.toLowerCase().includes(searchText.toLowerCase()) ||
    //         (article.description && article.description.toLowerCase().includes(searchText.toLowerCase()))
    //     );
    //     setNewsCopy(searchedNews);
    // };
    // const NewsCopyData = async() =>{
    //     try{  
    //     const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        
    //     // const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`)
    //     const data = await fetch(url);
    //     const json = await data.json();
    //     console.log(json);
    //     setNewsCopy(json?.copy); // For Searching
    //     setNewsArticles(json?.articles); // FOR READING NEWS
    
    //     setLoading(false);
    //     } catch (error) {
    //     console.error("Error fetching news:", error);
    //     setNewsCopy([])
    //     setLoading(false);
    //     }
    // };

  
//   useEffect(()=>{
//     NewsCopyData();
//   },[]);

  return (
    <div  className="flex items-center w-full mt-2 md:mt-0 md:w-auto">
    {/* <form onSubmit={handleSearch}  className="flex items-center flex-grow md:flex-grow-0"> */}
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full px-3 py-1 rounded-l-full bg-primary-grey text-primary-light focus:outline-none"
      />
      <button type="submit" className="px-6 py-2 transition-colors duration-200 rounded-r-full bg-primary-yellow text-primary-dark hover:bg-primary-light"
        onClick={()=>{
          const searchedNews = news.filter((i) => 
            {return i.title?.toLowerCase().includes(searchText.toLowerCase())
              || i.description?.toLowerCase().includes(searchText.toLowerCase())
              || i.author?.toLowerCase().includes(searchText.toLowerCase())
            });
            setNewsCopy(searchedNews);
        }}
      >
        <FaSearch className="w-4 h-4" />
      </button>
      {/* </form> */}
    </div>
  )
}

export default SearchBar
