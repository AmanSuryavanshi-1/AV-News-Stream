// Vercel Serverless Function - Health Check
import ApiKeyManager from '../src/utils/ApiKeyManager.js';

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
  
  const apiStatus = apiKeyManager.getAllStatus();
  
  return res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: apiStatus,
    env_check: {
      key1_set: !!process.env.VITE_NEWS_API_KEY_1,
      key2_set: !!process.env.VITE_NEWS_API_KEY_2,
      key3_set: !!process.env.VITE_NEWS_API_KEY_3
    }
  });
}
