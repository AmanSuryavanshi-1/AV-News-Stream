// Vercel Serverless Function - News Endpoint
import fetch from 'node-fetch';
import ApiKeyManager, { ERROR_TYPES } from '../src/utils/ApiKeyManager.js';

// Initialize API Key Manager
const apiKeyManager = new ApiKeyManager({
  services: {
    newsapi: {
      keys: [
        process.env.VITE_NEWS_API_KEY_1,
        process.env.VITE_NEWS_API_KEY_2,
        process.env.VITE_NEWS_API_KEY_3
      ].filter(Boolean),
      rateLimitCooldown: 3600000,
      errorCooldown: 300000,
      maxRetries: 3
    }
  }
});

const pageSize = 20; // Increased since we're only using NewsAPI now

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { category, page: requestedPage } = req.query;
  const currentPage = parseInt(requestedPage) || 1;
  let lastError = null;
  
  console.log(`[API/News] Request: category=${category}, page=${currentPage}`);
  
  // Try all available keys
  while (apiKeyManager.isServiceAvailable('newsapi')) {
    const apiKey = apiKeyManager.getNextKey('newsapi');
    if (!apiKey) break;

    try {
      let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&page=${currentPage}&pageSize=${pageSize}`;
      
      if (category) {
        url += `&category=${category}`;
      } else {
        url += `&category=general`;
      }
      
      console.log(`[API/News] Fetching from NewsAPI...`);
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok && data.status === 'ok') {
        apiKeyManager.reportSuccess('newsapi', apiKey);
        console.log(`[API/News] Success: ${data.articles?.length || 0} articles`);
        return res.status(200).json(data);
      }
      
      if (data.code === 'rateLimited' || response.status === 429) {
        apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.RATE_LIMIT);
        lastError = 'Rate limit exceeded';
        continue;
      }
      
      if (response.status === 401 || response.status === 403) {
        apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.AUTH_ERROR);
        lastError = data.message || 'Authentication failed';
        continue;
      }
      
      apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.API_ERROR);
      lastError = data.message || 'API error';
      
    } catch (error) {
      console.error(`[API/News] Error:`, error.message);
      apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.NETWORK_ERROR);
      lastError = error.message;
    }
  }
  
  console.error(`[API/News] All keys exhausted`);
  return res.status(503).json({ 
    error: 'All API keys exhausted or rate limited',
    details: lastError,
    articles: [] 
  });
}
