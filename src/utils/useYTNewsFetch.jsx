import { useEffect, useState } from 'react';

const useYTNewsFetch = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Multiple YouTube keys for fallback
  const YT_API_KEYS = [
    import.meta.env.YT_API_KEY_1,
    import.meta.env.YT_API_KEY_2,
    import.meta.env.YT_API_KEY_3
  ].filter(Boolean);

  const YouTubeNews = async () => {
    try {
      setLoading(true);
      
      if (YT_API_KEYS.length === 0) {
        console.error("[YouTube] No API keys configured");
        setVideos([]);
        return;
      }

      console.log(`[YouTube] Attempting to fetch with ${YT_API_KEYS.length} keys available`);

      // Try each key until one works
      for (let i = 0; i < YT_API_KEYS.length; i++) {
        try {
          const apiKey = YT_API_KEYS[i];
          const sanitizedKey = '...' + apiKey.slice(-4);
          
          console.log(`[YouTube] Trying key ${sanitizedKey} (${i + 1}/${YT_API_KEYS.length})`);
          
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=latest+news&type=video&key=${apiKey}&videoEmbeddable=true&order=date`
          );
          
          const data = await response.json();
          
          // Check if successful
          if (response.ok && data.items) {
            setVideos(data.items);
            console.log(`[YouTube] Success with key ${sanitizedKey} - fetched ${data.items.length} videos`);
            return;
          }
          
          // If quota exceeded or error, try next key
          if (data.error) {
            const errorCode = data.error.code;
            const errorMsg = data.error.message;
            
            console.warn(`[YouTube] Key ${sanitizedKey} failed (${errorCode}): ${errorMsg}`);
            
            // 403 typically means quota exceeded
            if (errorCode === 403) {
              console.warn(`[YouTube] Key ${sanitizedKey} quota exceeded, rotating to next key`);
              if (i < YT_API_KEYS.length - 1) {
                continue;
              }
            }
            
            // 400 might be bad request, try next key
            if (errorCode === 400 && i < YT_API_KEYS.length - 1) {
              console.warn(`[YouTube] Key ${sanitizedKey} bad request, trying next key`);
              continue;
            }
          }
          
        } catch (error) {
          const sanitizedKey = '...' + YT_API_KEYS[i].slice(-4);
          console.warn(`[YouTube] Key ${sanitizedKey} network error: ${error.message}`);
          if (i === YT_API_KEYS.length - 1) {
            throw error;
          }
        }
      }
      
      // If all keys failed
      console.error("[YouTube] All keys exhausted");
      setVideos([]);
      
    } catch (error) {
      console.error('[YouTube] Error fetching news:', error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    YouTubeNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { videos, loading };
}

export default useYTNewsFetch;