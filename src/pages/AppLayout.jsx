import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import TTSControl from "../Components/TTSControl";
import { useState, useRef, useEffect } from "react";

const AppLayout = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticleIndex, setActiveArticleIndex] = useState(-1);
    const [isPaused, setIsPaused] = useState(false);
    const speechRef = useRef(null);
    const voicesRef = useRef([]);

    useEffect(() => {
        const loadVoices = () => {
            voicesRef.current = window.speechSynthesis.getVoices();
        };

        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const readNews = () => {
        if (!newsArticles || newsArticles.length === 0) {
            alert("No news articles available to read.");
            return;
        }

        if (isPaused) {
            resumeReading();
        } else {
            startReading();
        }
    };

    const startReading = () => {
        let currentIndex = activeArticleIndex === -1 ? 0 : activeArticleIndex;
        const readArticle = () => {
            if (currentIndex < newsArticles.length) {
                setActiveArticleIndex(currentIndex);
                speechRef.current = new SpeechSynthesisUtterance();
                
                // Set voice
                speechRef.current.voice = voicesRef.current.find(voice => voice.name === "Google US English") || voicesRef.current[0];
                
                // Adjust parameters
                speechRef.current.lang = 'en-US';
                speechRef.current.pitch = 1;
                speechRef.current.rate = 0.9;
                speechRef.current.volume = 0.8;
                
                // Use SSML for more control
                speechRef.current.text = `<speak>Article <say-as interpret-as='cardinal'>${currentIndex + 1}</say-as>: <break time='0.5s'/>${newsArticles[currentIndex].title}</speak>`;
                
                speechRef.current.onend = () => {
                    currentIndex++;
                    readArticle();
                };
                window.speechSynthesis.speak(speechRef.current);
            } else {
                setActiveArticleIndex(-1);
                setIsPaused(false);
            }
        };

        readArticle();
    };

    const stopReading = () => {
        window.speechSynthesis.cancel();
        setActiveArticleIndex(-1);
        setIsPaused(false);
    };

    const pauseReading = () => {
        window.speechSynthesis.pause();
        setIsPaused(true);
    };

    const resumeReading = () => {
        window.speechSynthesis.resume();
        setIsPaused(false);
    };

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