import React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import TTSControl from "../Components/TTSControl";
import { useState } from "react";
import useTTS from "../utils/useTTS";
import Footer from './Footer';
const AppLayout = () => {
    const [newsCopy, setNewsCopy] = useState([]);
    const {
        activeArticleIndex,
        isPaused,
        readNews,
        stopReading,
        pauseReading,
        resumeReading,
    } = useTTS(newsCopy);

    return (
        <div className='min-h-screen bg-primary-bgColor'>
            <Navbar />
            <TTSControl 
                readNews={readNews} 
                stopReading={stopReading} 
                pauseReading={pauseReading}
                resumeReading={resumeReading}
                isPaused={isPaused}
                hasArticles={newsCopy.length > 0} 
            />
            <Outlet context={{ setNewsCopy, newsCopy, activeArticleIndex }} />
            <Footer/>
        </div>
    );
}

export default AppLayout;