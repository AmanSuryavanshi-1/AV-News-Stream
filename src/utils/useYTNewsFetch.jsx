import { useEffect, useState } from 'react';

const useYTNewsFetch = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_YT_API_KEY;
  const YouTubeNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&status&maxResults=6&q=latest+news&type=video&key=${API_KEY}&videoEmbeddable=true`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.items) {
        setVideos(data.items);
      }
    } catch (error) {
      console.error('Error fetching YouTube news:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    YouTubeNews();
  }, []);

  return { videos, loading };
}

export default useYTNewsFetch;