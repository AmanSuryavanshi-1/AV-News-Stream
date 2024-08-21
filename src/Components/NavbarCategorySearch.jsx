import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiAtom, BiFootball, BiHealth, BiMicrochip, BiMoviePlay, BiNews } from 'react-icons/bi';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaNewspaper} from 'react-icons/fa';
import SearchBar from './SearchBar';

const NavbarCategorySearch = () => {
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


  return (
    <div className="p-2 my-8 rounded-3xl">
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
          {/* Searching */}
              <SearchBar/>
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
