import { useEffect, useState, useRef, useCallback } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

// ============================================
// PRODUCTION-READY NEWS FETCHING SYSTEM
// With Load More Support
// ============================================

// In-memory cache to prevent duplicate API calls
const newsCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes cache

// Track failed APIs to avoid repeated calls
const apiFailureTracker = new Map();
const FAILURE_COOLDOWN = 15 * 60 * 1000; // 15 minutes cooldown after failure

const DataFetch = () => {
  const { setNewsCopy } = useOutletContext();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { category } = useParams();
  const hasFetched = useRef(false);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  
  // Get base URL for API calls (handles both dev and production)
  const getBaseURL = () => {
    // In production, use the current origin
    if (import.meta.env.PROD) {
      return window.location.origin;
    }
    // In development, use localhost
    return '';
  };
  
  const fetchAPI = useCallback(async (url) => {
    // Ensure we use absolute URLs in production for better browser compatibility
    const fullURL = url.startsWith('http') ? url : `${getBaseURL()}${url}`;
    
    console.log(`[Fetch] Requesting: ${fullURL}`);
    
    const response = await fetch(fullURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check if response is actually JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error(`[Fetch] Expected JSON but got: ${contentType}`);
      throw new Error(`Server returned ${contentType} instead of JSON - API routing may be broken`);
    }
    
    return await response.json();
  }, []); // Empty dependency array since getBaseURL and fetch are stable

  const isAPIAvailable = (apiName) => {
    const failure = apiFailureTracker.get(apiName);
    if (!failure) return true;
    
    const timeSinceFailure = Date.now() - failure.timestamp;
    if (timeSinceFailure > FAILURE_COOLDOWN) {
      apiFailureTracker.delete(apiName);
      return true;
    }
    return false;
  };

  const markAPIFailed = (apiName, error) => {
    apiFailureTracker.set(apiName, {
      timestamp: Date.now(),
      error: error.message
    });
    console.warn(`[${apiName}] Marked as failed, cooldown for 15 minutes`);
  };

  const markAPISuccess = (apiName) => {
    if (apiFailureTracker.has(apiName)) {
      apiFailureTracker.delete(apiName);
      console.log(`[${apiName}] Recovered and marked as available`);
    }
  };

  // Remove duplicate articles based on title and URL
  const removeDuplicates = (articles) => {
    const seen = new Map(); // Use Map to track what we've seen
    const unique = [];
    
    articles.forEach(article => {
      if (!article.title) return;
      
      // Create a unique key from title + url
      const titleKey = article.title.toLowerCase().trim().slice(0, 50);
      const urlKey = article.url || '';
      const uniqueKey = `${titleKey}|${urlKey}`;
      
      if (!seen.has(uniqueKey)) {
        seen.set(uniqueKey, true);
        unique.push(article);
      }
    });
    
    return unique;
  };

  // ============================================
  // MAIN FETCH LOGIC
  // ============================================

  const fetchNews = useCallback(async (pageNum = 1, isLoadMore = false) => {
    // API FETCHERS (moved inside to avoid dependency issues)
    const fetchNewsAPI = async (pageNum) => {
      if (!isAPIAvailable('newsapi')) {
        console.log('[NewsAPI] Skipping - in cooldown period');
        return [];
      }

      try {
        let url = `/api/news?page=${pageNum}`;
        if (category) {
          url += `&category=${category}`;
        }
        
        console.log(`[NewsAPI] Fetching from: ${url}`);
        const json = await fetchAPI(url);
        
        // Check if we got an error response
        if (json.error) {
          console.error(`[NewsAPI] API returned error:`, json.error, json.details);
          throw new Error(json.error);
        }
        
        const articles = json.articles || [];
        
        if (articles.length > 0) {
          markAPISuccess('newsapi');
          console.log(`[NewsAPI] ✓ Fetched ${articles.length} articles (page ${pageNum})`);
        } else {
          console.warn(`[NewsAPI] No articles returned for page ${pageNum}`);
        }
        
        return articles;
      } catch (error) {
        console.error('[NewsAPI] Failed:', error.message);
        markAPIFailed('newsapi', error);
        return [];
      }
    };

    const fetchGNews = async () => {
      // GNews is disabled for now - causes CORS issues in some browsers
      // All news will come from NewsAPI through our backend
      console.log('[GNews] Disabled - using NewsAPI only');
      return [];
    };
    // Prevent duplicate calls in React StrictMode (only for initial load)
    if (!isLoadMore && hasFetched.current) return;
    if (!isLoadMore) hasFetched.current = true;

    const cacheKey = `news-${category || 'general'}-page${pageNum}`;
    const cached = newsCache.get(cacheKey);
    
    // Return cached data if still valid (only for initial load)
    if (!isLoadMore && cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`[Cache] ✓ Using cached data (${cached.data.length} articles)`);
      setNews(cached.data);
      setLoading(false);
      return;
    }

    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      console.log(`[Fetch] Starting for category: ${category || 'general'}, page: ${pageNum}`);
      
      // Fetch from NewsAPI only (GNews disabled due to CORS issues in some browsers)
      const [newsAPIArticles, gNewsArticles] = await Promise.allSettled([
        fetchNewsAPI(pageNum),
        fetchGNews()
      ]);

      // Extract successful results
      const newsAPIData = newsAPIArticles.status === 'fulfilled' ? newsAPIArticles.value : [];
      const gNewsData = gNewsArticles.status === 'fulfilled' ? gNewsArticles.value : [];

      // Merge articles
      const newArticles = [...newsAPIData, ...gNewsData];

      if (newArticles.length === 0) {
        console.log('[Fetch] No more articles available');
        setHasMore(false);
        if (isLoadMore) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
        return;
      }

      // For load more, use functional update to get current news
      setNews(currentNews => {
        const beforeCount = currentNews.length;
        const allArticles = isLoadMore ? [...currentNews, ...newArticles] : newArticles;
        
        console.log(`[Merge] Before: ${beforeCount}, New: ${newArticles.length}, Combined: ${allArticles.length}`);
        
        // Remove duplicates from the combined list
        const uniqueArticles = removeDuplicates(allArticles);
        
        console.log(`[Dedupe] After removing duplicates: ${uniqueArticles.length} (removed ${allArticles.length - uniqueArticles.length} duplicates)`);

        // Sort: articles with images first
        const sortedArticles = uniqueArticles.sort((a, b) => {
          const aHasImage = !!(a.urlToImage || a.image);
          const bHasImage = !!(b.urlToImage || b.image);
          
          if (aHasImage && !bHasImage) return -1;
          if (!aHasImage && bHasImage) return 1;
          return 0;
        });

        // Cache the results (only cache page 1)
        if (pageNum === 1) {
          newsCache.set(cacheKey, {
            data: sortedArticles,
            timestamp: Date.now()
          });
        }

        console.log(`[Fetch] ✓ Complete: ${sortedArticles.length} total articles (${newsAPIData.length} NewsAPI + ${gNewsData.length} GNews on page ${pageNum})`);
        
        // Check if we should show "Load More" button
        // If we got fewer than 5 NEW unique articles, stop showing load more
        const newUniqueCount = sortedArticles.length - beforeCount;
        if (isLoadMore && newUniqueCount < 5) {
          console.log(`[LoadMore] Only ${newUniqueCount} new unique articles, hiding button`);
          setHasMore(false);
        }
        
        return sortedArticles;
      });
      
    } catch (error) {
      console.error('[Fetch] ✗ Critical error:', error);
      if (!isLoadMore) {
        setNews([]);
        setNewsCopy([]);
      }
    } finally {
      if (isLoadMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  }, [category, fetchAPI, setNewsCopy]);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage, true);
  }, [page, fetchNews]);

  // Sync news with newsCopy
  useEffect(() => {
    if (news.length > 0) {
      setNewsCopy(news);
    }
  }, [news, setNewsCopy]);

  useEffect(() => {
    // Reset state when category changes
    hasFetched.current = false;
    setPage(1);
    setHasMore(true);
    setNews([]);
    fetchNews(1, false);
  }, [category, fetchNews]);

  return { news, loading, loadingMore, hasMore, loadMore };
};

export default DataFetch;
