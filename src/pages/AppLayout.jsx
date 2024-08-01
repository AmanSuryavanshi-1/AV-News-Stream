import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import TTSControl from "../Components/TTSControl";
import { useState } from "react";
import useTTS from "../utils/useTTS";
const AppLayout = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const {
        activeArticleIndex,
        isPaused,
        readNews,
        stopReading,
        pauseReading,
        resumeReading,
    } = useTTS(newsArticles);

    return (
        <div className='min-h-screen bg-primary-bgColor'>
            <Navbar />
            <TTSControl 
                readNews={readNews} 
                stopReading={stopReading} 
                pauseReading={pauseReading}
                resumeReading={resumeReading}
                isPaused={isPaused}
                hasArticles={newsArticles.length > 0} 
            />
            <Outlet context={{ setNewsArticles, activeArticleIndex }} />
            {/* <Footer/> */}
        </div>
    );
}

export default AppLayout;