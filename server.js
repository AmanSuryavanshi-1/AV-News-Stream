import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import ApiKeyManager, { ERROR_TYPES } from './src/utils/ApiKeyManager.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();

// Enhanced CORS configuration for all browsers including Perplexity
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false,
  maxAge: 86400
}));

// Additional CORS headers middleware for maximum compatibility
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Debug: Log environment variables (only first few chars for security)
console.log('[Server] Environment check:');
console.log('VITE_NEWS_API_KEY_1:', process.env.VITE_NEWS_API_KEY_1 ? '...' + process.env.VITE_NEWS_API_KEY_1.slice(-4) : 'NOT SET');
console.log('VITE_NEWS_API_KEY_2:', process.env.VITE_NEWS_API_KEY_2 ? '...' + process.env.VITE_NEWS_API_KEY_2.slice(-4) : 'NOT SET');
console.log('VITE_NEWS_API_KEY_3:', process.env.VITE_NEWS_API_KEY_3 ? '...' + process.env.VITE_NEWS_API_KEY_3.slice(-4) : 'NOT SET');

// Initialize API Key Manager with all services
const apiKeyManager = new ApiKeyManager({
  services: {
    newsapi: {
      keys: [
        process.env.VITE_NEWS_API_KEY_1,
        process.env.VITE_NEWS_API_KEY_2,
        process.env.VITE_NEWS_API_KEY_3
      ].filter(Boolean),
      rateLimitCooldown: 3600000,  // 1 hour
      errorCooldown: 300000,        // 5 minutes
      maxRetries: 3
    }
  }
});

console.log('[Server] ApiKeyManager initialized with', apiKeyManager.getKeyStatus('newsapi')?.totalKeys || 0, 'keys');

const pageSize = 10; // Reduced for better pagination

//~ server.js for avoiding CORS requests for fetching news based categories
app.get('/api/news', async (req, res) => {
  // Ensure CORS headers are set
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const { category, page: requestedPage } = req.query;
  const currentPage = parseInt(requestedPage) || 1;
  let lastError = null;
  
  // Try all available keys using ApiKeyManager
  while (apiKeyManager.isServiceAvailable('newsapi')) {
    const apiKey = apiKeyManager.getNextKey('newsapi');
    if (!apiKey) break;

    try {
      // Use category-based headlines without country restriction for better results
      let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&page=${currentPage}&pageSize=${pageSize}`;
      
      if (category) {
        url += `&category=${category}`;
      } else {
        url += `&category=general`;
      }
  
      const response = await fetch(url);
      const data = await response.json();
      
      // Check if request was successful
      if (response.ok && data.status === 'ok') {
        apiKeyManager.reportSuccess('newsapi', apiKey);
        return res.json(data);
      }
      
      // Handle rate limit
      if (data.code === 'rateLimited' || response.status === 429) {
        apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.RATE_LIMIT);
        lastError = 'Rate limit exceeded';
        continue;
      }
      
      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.AUTH_ERROR);
        lastError = data.message || 'Authentication failed';
        continue;
      }
      
      // Other API errors
      apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.API_ERROR);
      lastError = data.message || 'API error';
      
    } catch (error) {
      apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.NETWORK_ERROR);
      lastError = error.message;
    }
  }
  
  // All keys exhausted
  console.error('[API] All NewsAPI keys exhausted');
  res.status(503).json({ 
    error: 'All API keys exhausted or rate limited',
    details: lastError,
    articles: [] 
  });
});  

//~ server.js for avoiding CORS requests for fetching news based on search term
app.get('/api/search', async (req, res) => {
  // Ensure CORS headers are set
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ 
      error: 'Search query is required',
      articles: [] 
    });
  }
  
  let lastError = null;
  
  // Try all available keys using ApiKeyManager
  while (apiKeyManager.isServiceAvailable('newsapi')) {
    const apiKey = apiKeyManager.getNextKey('newsapi');
    if (!apiKey) break;

    try {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}&pageSize=${pageSize}`;
      const response = await fetch(url);
      const data = await response.json();
      
      // Check if request was successful
      if (response.ok && data.status === 'ok') {
        apiKeyManager.reportSuccess('newsapi', apiKey);
        return res.json(data);
      }
      
      // Handle rate limit
      if (data.code === 'rateLimited' || response.status === 429) {
        apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.RATE_LIMIT);
        lastError = 'Rate limit exceeded';
        continue;
      }
      
      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.AUTH_ERROR);
        lastError = data.message || 'Authentication failed';
        continue;
      }
      
      // Other API errors
      apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.API_ERROR);
      lastError = data.message || 'API error';
      
    } catch (error) {
      apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.NETWORK_ERROR);
      lastError = error.message;
    }
  }
  
  // All keys exhausted
  console.error('[API] All NewsAPI search keys exhausted');
  res.status(503).json({ 
    error: 'All API keys exhausted or rate limited',
    details: lastError,
    articles: [] 
  });
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  // Ensure CORS headers are set
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const apiStatus = apiKeyManager.getAllStatus();
  
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: apiStatus
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  const newsApiStatus = apiKeyManager.getKeyStatus('newsapi');
  console.log(`📰 NewsAPI keys configured: ${newsApiStatus ? newsApiStatus.totalKeys : 0}`);
});
