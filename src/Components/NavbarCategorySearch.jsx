import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuSearch } from "react-icons/lu";
import { AiOutlineSave } from 'react-icons/ai';
import { BiAtom, BiFootball, BiHealth, BiMicrochip, BiMoviePlay, BiNews } from 'react-icons/bi';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaNewspaper, FaSearch } from 'react-icons/fa';

const NavbarCategorySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    { title: 'Top Headlines', url: '/', icon: <FaNewspaper  className="w-5 h-5" /> },
    { title: 'Entertainment', url: '/news/entertainment', icon: <BiMoviePlay className="w-5 h-5" /> },
    { title: 'Business', url: '/news/business', icon: <BiNews className="w-5 h-5" /> },
    { title: 'Health', url: '/news/health', icon: <BiHealth className="w-5 h-5" /> },
    { title: 'Science', url: '/news/science', icon: <BiAtom className="w-5 h-5" /> },
    { title: 'Sports', url: '/news/sports', icon: <BiFootball className="w-5 h-5" /> },
    { title: 'Technology', url: '/news/technology', icon: <BiMicrochip className="w-5 h-5" /> },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="p-2 my-8 bg-primary-dark rounded-3xl">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="block md:hidden"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {isDropdownOpen ? <HiX className="w-6 h-6 text-primary-light" /> : <HiMenu className="w-6 h-6 text-primary-light" />}
            </button>
            <div className="items-center hidden space-x-6 md:flex">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={category.url}
                  className="flex items-center transition-colors duration-200 whitespace-nowrap text-primary-light hover:text-primary-yellow"
                >
                  {category.icon}
                  <span className="ml-1 text-sm">{category.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center w-full mt-2 md:mt-0 md:w-auto">
            <form onSubmit={handleSearch} className="flex items-center flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1 rounded-l-full bg-primary-grey text-primary-light focus:outline-none"
              />
              <button type="submit" className="px-6 py-2 transition-colors duration-200 rounded-r-full bg-primary-yellow text-primary-dark hover:bg-primary-light">
                <FaSearch className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        {isDropdownOpen && (
          <div className="md:hidden">
            <div className="flex flex-col mt-2 space-y-2">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={category.url}
                  className="flex items-center transition-colors duration-200 text-primary-light hover:text-primary-yellow"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {category.icon}
                  <span className="ml-1 text-sm">{category.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarCategorySearch;
