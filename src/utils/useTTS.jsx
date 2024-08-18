import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useTTS = (articles) => {
  const [activeArticleIndex, setActiveArticleIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const speechRef = useRef(null);
  const voicesRef = useRef([]);
  const location = useLocation();
<<<<<<< HEAD

  const loadVoices = () => {
    voicesRef.current = window.speechSynthesis.getVoices();
    // Ensure a consistent voice is selected, or use a default one
    const preferredVoice = voicesRef.current.find(voice => voice.name === "Google US English");
    if (!preferredVoice && voicesRef.current.length > 0) {
      // Set a default fallback voice
      voicesRef.current[0] = voicesRef.current[0];
    }
  };
=======
  
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
>>>>>>> 915e1645d569ef6fd137778f26552c92aa7895a4

  useEffect(() => {
    // Load voices and set the voices list whenever they change
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  useEffect(() => {
    // Reset TTS when route changes
    stopReading();
  }, [location]);

  const readNews = () => {
    if (!articles || articles.length === 0) {
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
      if (currentIndex < articles.length) {
        setActiveArticleIndex(currentIndex);
        speechRef.current = new SpeechSynthesisUtterance();

        // Ensure to use a consistent voice if available, or fallback to default
        speechRef.current.voice = voicesRef.current.find(voice => voice.name === "Google US English") || voicesRef.current[0];
        speechRef.current.lang = speechRef.current.voice.lang || 'en-US';
        speechRef.current.pitch = 0.9;
        speechRef.current.rate = 1.1;
        speechRef.current.volume = 0.8;

        speechRef.current.text = `Article ${currentIndex + 1}: ${articles[currentIndex].title}`;

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

  return {
    activeArticleIndex,
    isPaused,
    readNews,
    stopReading,
    pauseReading,
    resumeReading,
  };
};

export default useTTS;
