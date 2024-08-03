import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const { setNewsCopy } = useOutletContext(); // FOR DISPLAYING & READING NEWS
    // const {news = []} = DataFetch();   // By this we will get categoryWise news 

  //   Taking required news data 

  //   ~ gives results for every hit on request while searching which can lead to exhaustion of NewsAPi
  //   const [searchNewsData, setSearchNewsData] =useState();
  //     const searchData = async() => {
  //     if (searchText) {
  //     // const queryUrl = `https://newsapi.org/v2/everything?q=${searchText}&apiKey=72de93b59abd49d09f3d8543e914cfa3&pageSize=${pageSize}`
  //     try {
  //       const queryUrl = `/api/search?query=${encodeURIComponent(searchText)}`;
  //       const data = await fetch(queryUrl);
  //       if (!data.ok) {
  //         throw new Error(`HTTP error! status: ${data.status}`);
  //       }

  //       const json = await data.json();
  //       setNewsCopy(json.articles || []);
  //       console.log(json);
  //     } catch (error) {
  //       console.error('Error fetching search results:', error);
  //     }
  //   }
  // }
  //   useEffect(()=>{
  //     searchData();
  //   },[searchText]);
  
  //   const handleSearch = async() =>{
  //     await searchData();
  //     if (searchNewsData && searchNewsData.length > 0) {
  //       const searchedNews = searchNewsData.filter((i) => 
  //         {return i.title?.toLowerCase().includes(searchText.toLowerCase())
  //           || i.description?.toLowerCase().includes(searchText.toLowerCase())
  //           || i.author?.toLowerCase().includes(searchText.toLowerCase())
  //         });
  //         setNewsCopy(searchedNews);
  //     } else {
  //       setNewsCopy([]);  // Set to empty array if no results
  //     }
  //   }

    const handleSearch = async () => {
      if (searchText) {
        try {
          const queryUrl = `/api/search?query=${encodeURIComponent(searchText)}`;
          const response = await fetch(queryUrl);
          const data = await response.json();
          
          if (data.articles && data.articles.length > 0) {
            setNewsCopy(data.articles);
          } else {
            setNewsCopy([]);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
          setNewsCopy([]);
        }
      }
    }


  return (
    <div  className="flex items-center w-full mt-2 md:mt-0 md:w-auto">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full px-3 py-1 rounded-l-full bg-primary-grey text-primary-light focus:outline-none"
      />
      <button type="submit" className="px-6 py-2 transition-colors duration-200 rounded-r-full bg-primary-yellow text-primary-dark hover:bg-primary-light"
        onClick={handleSearch}
      >
        <FaSearch className="w-4 h-4" />
      </button>
    </div>
  )
}

export default SearchBar
