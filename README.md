# AV NewsStream

**AV NewsStream** is the ultimate platform for streaming, reading, and listening to the latest news from diverse sources, designed to transform your news consumption experience.

## Access the App

- [AV NewsStream](https://avnews.vercel.app/)

## View the Code

- [GitHub Repository](https://github.com/AmanSuryavanshi-1/AV-News-Stream)

## Problem

1. **Limited Interaction:** Traditional news websites restrict user interaction by primarily offering a "read-only" experience.
2. **Reading Friction:** Users must devote undivided attention to reading, which can be inconvenient and disrupt daily activities.
3. **Information Overload:** The abundance of news sources makes it challenging for users to filter and access relevant, up-to-date content.

## Solutions

1. **Seamless Text-to-Speech Integration:** AV NewsStream provides a hands-free and effortless browsing experience by utilizing text-to-speech technology. This allows users to multitask while the app reads articles aloud, reducing screen time and eye strain.
2. **Real-Time Updates:** The app integrates with multiple APIs, including News API and Gnews.io, to ensure users have access to the latest news articles and videos, presented in real time.
3. **Enhanced User Interaction:** By combining conversational voice control with real-time updates, AV NewsStream revolutionizes the way users interact with news, making the process more engaging and accessible.
4. **Comprehensive Coverage:** The app aggregates news from over 80,000 sources, providing a holistic view of global events across various categories and interests.

## Features

- **Conversational Voice Control:** Users can navigate and access content hands-free using Alan AI’s advanced voice recognition capabilities.
- **Integration of Multiple APIs:**
  - **News API:** Offers a wide range of news articles, including archived content.
  - **Gnews.io:** Provides the latest news, ensuring users are always informed.
  - **YouTube API:** Streams live news videos, delivering up-to-the-minute updates on trending topics.
  - **GitHub API:** Keeps users informed about the latest changes and statistics in their GitHub repositories.
- **Effortless News Streaming:** Enables users to save news articles and videos for later viewing, powered by Redux Toolkit.
- **Advanced Search Functionality:** Users can quickly find relevant articles using a robust search feature that scours thousands of sources.
- **Custom Hooks and Optimizations:** The app includes custom hooks for fallback images and data fetching, ensuring a smooth user experience.
- **Performance Optimization:** Features lazy loading and shimmer UI to enhance loading speed and visual feedback.
- **Error Handling:** A dedicated error component improves the user experience by gracefully handling errors.
- **Email.js Integration:** Confirms sent messages via the contact form, enhancing communication reliability.
- **Accessibility Features:** The voice assistant feature ensures news is accessible to all users, including those with visual impairments.

## Tech Stack and Skills Used

- **React:** Frontend library for building user interfaces.
- **JavaScript:** Core programming language for interactive features.
- **PostCSS:** Tool for transforming CSS with JavaScript plugins.
- **NPM:** Package manager for installing dependencies.
- **HTML:** Standard markup language for creating web pages.
- **JSON:** Data format used for storing and exchanging information.
- **Vercel:** Platform for deploying and hosting web applications.
- **Vite:** Frontend tool for faster development.
- **React Router:** Library for routing in React applications.
- **EmailJS:** Service for sending emails directly from JavaScript.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **CORS:** Mechanism for enabling cross-origin resource sharing.
- **Web Speech API:** Interface for integrating speech recognition and synthesis.
- **React Context:** Tool for managing state across components.
- **DaisyUI:** Library for building user interfaces.
- **Redux Toolkit:** Library for managing state in applications.
- **APIs:** News API, GNews API, YouTube API, GitHub API for diverse functionalities.

## Challenges and Solutions

### Challenge 1: CORS Issue with [NewsAPI.org](http://newsapi.org/)

**Problem:** When trying to fetch data from [NewsAPI.org](http://newsapi.org/) during deployment, a CORS (Cross-Origin Resource Sharing) error occurred. This was because [NewsAPI.org](http://newsapi.org/) only supports CORS for localhost development under their free plan, and deploying it to a different environment caused issues.

**Solution:** The solution involved creating a backend server to handle API requests, thereby bypassing the CORS issue.

1. **Backend Setup:** Installed necessary packages for setting up a backend server.

    ```bash
    npm install node-fetch express cors dotenv
    ```

2. **Server Creation:** Created a `server.js` file using Express to handle API requests and enabled CORS.

    ```javascript
    import express from 'express';
    import cors from 'cors';
    import fetch from 'node-fetch';
    import dotenv from 'dotenv';

    dotenv.config();

    const app = express();
    app.use(cors());

    const API_KEY = process.env.VITE_API_KEY;
    const pageSize = 21;
    const page = 1;
    const country = 'us';

    app.get('/api/news', async (req, res) => {
        const { category } = req.query;
        try {
            let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;

            if (category) {
                url += `&category=${category}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Error fetching news:', error);
            res.status(500).json({ error: 'Failed to fetch news' });
        }
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    ```

3. **Deployment Configuration:** Created a `vercel.json` file to define the build settings and routes for the Vercel deployment.

    ```json
    {
        "version": 2,
        "builds": [
            { "src": "server.js", "use": "@vercel/node" },
            { "src": "dist/**", "use": "@vercel/static" }
        ],
        "routes": [
            { "src": "/api/(.*)", "dest": "server.js" },
            { "src": "/(.*)", "dest": "dist/$1" }
        ]
    }
    ```

4. **Proxy Configuration:** Configured the proxy settings in `vite.config.js` to ensure the frontend could communicate with the backend server.

    ```javascript
    import { defineConfig } from "vite";

    export default defineConfig({
        // ... other config
        server: {
            proxy: {
                '/api': 'http://localhost:3001'
            }
        }
    })
    ```

5. **Data Fetch Adjustment:** Updated the `dataFetch.js` to fetch data from the newly created server endpoint.

### Challenge 2: Search Functionality with CORS

**Problem:** Implementing a search functionality also encountered CORS issues as it required querying the NewsAPI with user input.

**Solution:** Created a CORS-compliant search endpoint in the server and adjusted the search component to use this endpoint.

1. **Server Endpoint for Search:** Added an `/api/search` route in `server.js`.

    ```javascript
    app.get('/api/search', async (req, res) => {
        const { query } = req.query;
        try{
            const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}&pageSize=${pageSize}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
            res.status(500).json({ error: 'Failed to fetch search results' });
        }
    })
    ```

2. **Search Component Update:** Updated `SearchBar.jsx` to remove unnecessary filters and directly fetch results when the search button is clicked.

    ```javascript
    import React, { useState } from 'react'
    import { FaSearch } from 'react-icons/fa';
    import { useOutletContext } from 'react-router-dom';

    const SearchBar = () => {
        const [searchText, setSearchText] = useState("");
        const { setNewsCopy } = useOutletContext(); // FOR DISPLAYING & READING NEWS
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
                    className="flex-1 px-4 py-2 mr-2 text-black border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded hover:bg-indigo-600"
                >
                    <FaSearch className="inline mr-1" />
                    Search
                </button>
            </div>
        )
    }

    export default SearchBar
    ```

## Conclusion

AV NewsStream offers a novel way to consume news by integrating text-to-speech technology, real-time updates, and voice-controlled navigation. Experience news like never before!

## License

This project is licensed under the [MIT License](LICENSE).
