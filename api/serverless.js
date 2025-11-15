// Vercel Serverless Function Wrapper
// This ensures proper environment variable handling in Vercel's serverless environment

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import ApiKeyManager, { ERROR_TYPES } from '../src/utils/ApiKeyManager.js';

const app = express();
app.use(cors());

// Initialize API Key Manager with environment variables
// In Vercel, process.env automatically includes variables set in dashboard
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

const pageSize = 10;

// News endpoint
app.get('/api/news', async (req, res) => {
  const { category, page: requestedPage } = req.query;
  const currentPage = parseInt(requestedPage) || 1;
  let lastError = null;
  
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
  
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok && data.status === 'ok') {
        apiKeyManager.reportSuccess('newsapi', apiKey);
        return res.json(data);
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
      apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.NETWORK_ERROR);
      lastError = error.message;
    }
  }
  
  res.status(503).json({ 
    error: 'All API keys exhausted or rate limited',
    details: lastError,
    articles: [] 
  });
});

// Search endpoint
app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ 
      error: 'Search query is required',
      articles: [] 
    });
  }
  
  let lastError = null;
  
  while (apiKeyManager.isServiceAvailable('newsapi')) {
    const apiKey = apiKeyManager.getNextKey('newsapi');
    if (!apiKey) break;

    try {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}&pageSize=${pageSize}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok && data.status === 'ok') {
        apiKeyManager.reportSuccess('newsapi', apiKey);
        return res.json(data);
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
      apiKeyManager.reportFailure('newsapi', apiKey, ERROR_TYPES.NETWORK_ERROR);
      lastError = error.message;
    }
  }
  
  res.status(503).json({ 
    error: 'All API keys exhausted or rate limited',
    details: lastError,
    articles: [] 
  });
});

// Health check
app.get('/api/health', (req, res) => {
  const apiStatus = apiKeyManager.getAllStatus();
  
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: apiStatus,
    env_check: {
      key1_set: !!process.env.VITE_NEWS_API_KEY_1,
      key2_set: !!process.env.VITE_NEWS_API_KEY_2,
      key3_set: !!process.env.VITE_NEWS_API_KEY_3
    }
  });
});

// Export for Vercel serverless
export default app;
