import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';

const pageSize = 21;
const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchNewsData, setSearchNewsData] =useState();
  const { setNewsCopy } = useOutletContext(); // FOR DISPLAYING & READING NEWS
    // const {news = []} = DataFetch();   // By this we will get categoryWise news 
    // Taking required news data 
    const searchData = async() => {
      const queryUrl = `https://newsapi.org/v2/everything?q=${searchText}&apiKey=72de93b59abd49d09f3d8543e914cfa3&pageSize=${pageSize}`
      try {
        const data = await fetch(queryUrl);
        const json = await data.json();
        setSearchNewsData(json.articles);
        console.log(json);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
    useEffect(()=>{
      searchData();
    },[searchText]);
  

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
          const searchedNews = searchNewsData.filter((i) => 
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
