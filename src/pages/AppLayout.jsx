import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import TTSControl from "../Components/TTSControl";
import { useState } from "react";

const AppLayout = () => {

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticleIndex, setActiveArticleIndex] = useState([]);
   const readNews = () => {
        if (!newsArticles || newsArticles.length === 0) {
            alert("No news articles available to read.");
            return;
        }

        let currentIndex = 0;
        const readArticle = () => {
          if (currentIndex < newsArticles.length) {
            setActiveArticleIndex(currentIndex);
            let speech = new SpeechSynthesisUtterance();
            speech.lang = 'en-US';
            speech.text = `Article ${currentIndex + 1}: ${newsArticles[currentIndex].title}`;
            speech.onend = () => {
              currentIndex++;
              readArticle();
            };
            window.speechSynthesis.speak(speech);
          } else {
            setActiveArticleIndex(-1);
          }
        };
    
        readArticle();
      };
    
      const stopReading = () => {
        window.speechSynthesis.cancel();
        setActiveArticleIndex(-1);
      };
   
return (
<div className='min-h-screen bg-primary-bgColor'>
   <Navbar/>
   <TTSControl hasArticles={newsArticles.length > 0} stopReading={stopReading} readNews={readNews} />
   <Outlet context={{ setNewsArticles, activeArticleIndex }} />
   {/* <Outlet />  */}
   {/* <Footer/> */}
</div>
);
}

export default AppLayout;