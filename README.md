# AV NewsStream

**AV NewsStream** is the ultimate platform for streaming, reading, and listening to the latest news from diverse sources, designed to transform your news consumption experience.

## Access the App

- [AV NewsStream](https://avnews.vercel.app/)

## View the Code

- [GitHub Repository](https://github.com/AmanSuryavanshi-1/AV-News-Stream)

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
- **Lazy Loading:** Implemented lazy loading to optimize the loading of the About page and images, ensuring they load efficiently and only when needed.
- **Error Handling:** A dedicated error component improves the user experience by gracefully handling errors.
- **Email.js Integration:** Confirms sent messages via the contact form, enhancing communication reliability.
- **Accessibility Features:** The voice assistant feature ensures news is accessible to all users, including those with visual impairments.
- **Seamless Text-to-Speech Integration:** Utilizes text-to-speech technology to provide a hands-free and effortless browsing experience, allowing users to multitask while the app reads articles aloud.
- **Real-Time Updates:** Ensures users have access to the latest news articles and videos, presented in real time.
- **Enhanced User Interaction:** Combines conversational voice control with real-time updates, revolutionizing the way users interact with news.

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

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/news-aggregator-app.git
    cd AV-News-Stream
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your API keys:

    ```env
    VITE_API_KEY=your_newsapi_key
    ```

## Deployment

1. Install backend dependencies:

    ```bash
    npm install node-fetch express cors dotenv
    ```

2. Create a `server.js` file and add the following code:

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

3. Create a `vercel.json` file with the following content:

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

4. Run the backend server:

    ```bash
    npm run start
    ```

5. Start the frontend:

    ```bash
    npm run dev
    ```

## Conclusion

AV NewsStream offers a novel way to consume news by integrating text-to-speech technology, real-time updates, and voice-controlled navigation. Experience news like never before!

## License

This project is licensed under the [MIT License](LICENSE).
