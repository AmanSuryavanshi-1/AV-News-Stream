import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import DataFetch from '../utils/DataFetch';

const SearchBar = () => {
    const { setNewsCopy } = useOutletContext(); // FOR READING NEWS
    const {news = []} = DataFetch();   // taking the complete original newsdata for searching in it
    const [searchText, setSearchText] = useState("");
    // console.log(news);

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
