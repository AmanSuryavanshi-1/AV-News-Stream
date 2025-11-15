/**
 * API Key Manager - Centralized management for multiple API keys
 * Handles rotation, health tracking, and cooldown management
 */

const ERROR_TYPES = {
  RATE_LIMIT: 'rate-limited',
  AUTH_ERROR: 'auth-error',
  NETWORK_ERROR: 'network-error',
  API_ERROR: 'api-error',
  UNKNOWN: 'unknown'
};

const KEY_STATUS = {
  WORKING: 'working',
  RATE_LIMITED: 'rate-limited',
  FAILED: 'failed',
  UNKNOWN: 'unknown'
};

/**
 * Metadata for tracking individual API key health and usage
 */
class KeyMetadata {
  constructor(key) {
    this.key = key;
    this.status = KEY_STATUS.UNKNOWN;
    this.usageCount = 0;
    this.successCount = 0;
    this.failureCount = 0;
    this.lastUsed = null;
    this.lastFailure = null;
    this.lastSuccess = null;
    this.cooldownUntil = null;
    this.errorType = null;
  }

  isAvailable() {
    if (this.cooldownUntil && Date.now() < this.cooldownUntil) {
      return false;
    }
    return this.status !== KEY_STATUS.FAILED || this.failureCount < 5;
  }

  getSuccessRate() {
    if (this.usageCount === 0) return 0;
    return this.successCount / this.usageCount;
  }

  getSanitizedKey() {
    if (!this.key || this.key.length < 8) return '****';
    return '...' + this.key.slice(-4);
  }
}

/**
 * Manages a pool of API keys for a single service
 */
class KeyPool {
  constructor(serviceName, keys, config) {
    this.serviceName = serviceName;
    this.config = config;
    this.keys = keys.map(key => new KeyMetadata(key));
    this.currentIndex = 0;

    if (this.keys.length === 0) {
      console.warn(`[ApiKeyManager] No keys configured for ${serviceName}`);
    }
  }

  getNextKey() {
    if (this.keys.length === 0) return null;

    const startIndex = this.currentIndex;
    let attempts = 0;

    while (attempts < this.keys.length) {
      const keyMetadata = this.keys[this.currentIndex];
      this.currentIndex = (this.currentIndex + 1) % this.keys.length;
      attempts++;

      if (keyMetadata.isAvailable()) {
        keyMetadata.usageCount++;
        keyMetadata.lastUsed = Date.now();
        
        console.log(`[ApiKeyManager] Using ${this.serviceName} key ${keyMetadata.getSanitizedKey()} (usage: ${keyMetadata.usageCount})`);
        return keyMetadata.key;
      }
    }

    console.warn(`[ApiKeyManager] All ${this.serviceName} keys are unavailable`);
    return null;
  }

  markSuccess(key) {
    const keyMetadata = this.keys.find(k => k.key === key);
    if (!keyMetadata) return;

    keyMetadata.successCount++;
    keyMetadata.lastSuccess = Date.now();
    keyMetadata.status = KEY_STATUS.WORKING;
    keyMetadata.cooldownUntil = null;
    keyMetadata.errorType = null;

    // Reset failure count on success
    if (keyMetadata.failureCount > 0) {
      console.log(`[ApiKeyManager] ${this.serviceName} key ${keyMetadata.getSanitizedKey()} recovered (failures reset)`);
      keyMetadata.failureCount = 0;
    }
  }

  markFailure(key, errorType) {
    const keyMetadata = this.keys.find(k => k.key === key);
    if (!keyMetadata) return;

    keyMetadata.failureCount++;
    keyMetadata.lastFailure = Date.now();
    keyMetadata.errorType = errorType;

    if (errorType === ERROR_TYPES.RATE_LIMIT) {
      keyMetadata.status = KEY_STATUS.RATE_LIMITED;
      keyMetadata.cooldownUntil = Date.now() + this.config.rateLimitCooldown;
      
      const cooldownMinutes = Math.round(this.config.rateLimitCooldown / 60000);
      console.warn(`[ApiKeyManager] ${this.serviceName} key ${keyMetadata.getSanitizedKey()} rate limited (cooldown: ${cooldownMinutes}m)`);
    } else if (errorType === ERROR_TYPES.AUTH_ERROR) {
      keyMetadata.status = KEY_STATUS.FAILED;
      console.error(`[ApiKeyManager] ${this.serviceName} key ${keyMetadata.getSanitizedKey()} authentication failed (invalid key)`);
    } else {
      keyMetadata.status = KEY_STATUS.UNKNOWN;
      // Exponential backoff: 5min, 10min, 20min, etc.
      const backoffMultiplier = Math.min(Math.pow(2, keyMetadata.failureCount - 1), 8);
      keyMetadata.cooldownUntil = Date.now() + (this.config.errorCooldown * backoffMultiplier);
      
      const cooldownMinutes = Math.round((this.config.errorCooldown * backoffMultiplier) / 60000);
      console.warn(`[ApiKeyManager] ${this.serviceName} key ${keyMetadata.getSanitizedKey()} failed (${errorType}, cooldown: ${cooldownMinutes}m)`);
    }
  }

  hasAvailableKeys() {
    return this.keys.some(k => k.isAvailable());
  }

  getStatus() {
    return {
      serviceName: this.serviceName,
      available: this.hasAvailableKeys(),
      totalKeys: this.keys.length,
      workingKeys: this.keys.filter(k => k.status === KEY_STATUS.WORKING).length,
      keys: this.keys.map(k => ({
        status: k.status,
        usageCount: k.usageCount,
        successRate: k.getSuccessRate(),
        lastUsed: k.lastUsed,
        lastSuccess: k.lastSuccess,
        lastFailure: k.lastFailure,
        errorType: k.errorType,
        cooldownUntil: k.cooldownUntil,
        sanitizedKey: k.getSanitizedKey()
      }))
    };
  }

  resetKey(key) {
    const keyMetadata = this.keys.find(k => k.key === key);
    if (!keyMetadata) return false;

    keyMetadata.status = KEY_STATUS.UNKNOWN;
    keyMetadata.cooldownUntil = null;
    keyMetadata.errorType = null;
    console.log(`[ApiKeyManager] ${this.serviceName} key ${keyMetadata.getSanitizedKey()} manually reset`);
    return true;
  }
}

/**
 * Main API Key Manager class
 */
class ApiKeyManager {
  constructor(config) {
    this.config = config;
    this.keyPools = new Map();

    // Initialize key pools for each service
    Object.entries(config.services).forEach(([serviceName, serviceConfig]) => {
      const keys = serviceConfig.keys.filter(Boolean);
      this.keyPools.set(serviceName, new KeyPool(serviceName, keys, serviceConfig));
    });

    console.log(`[ApiKeyManager] Initialized with ${this.keyPools.size} services`);
    this.keyPools.forEach((pool, name) => {
      console.log(`[ApiKeyManager] - ${name}: ${pool.keys.length} keys configured`);
    });
  }

  getNextKey(service) {
    const pool = this.keyPools.get(service);
    if (!pool) {
      console.error(`[ApiKeyManager] Service '${service}' not configured`);
      return null;
    }
    return pool.getNextKey();
  }

  reportSuccess(service, key) {
    const pool = this.keyPools.get(service);
    if (!pool) return;
    pool.markSuccess(key);
  }

  reportFailure(service, key, errorType = ERROR_TYPES.UNKNOWN) {
    const pool = this.keyPools.get(service);
    if (!pool) return;
    pool.markFailure(key, errorType);
  }

  isServiceAvailable(service) {
    const pool = this.keyPools.get(service);
    if (!pool) return false;
    return pool.hasAvailableKeys();
  }

  getKeyStatus(service) {
    const pool = this.keyPools.get(service);
    if (!pool) return null;
    return pool.getStatus();
  }

  getAllStatus() {
    const status = {};
    this.keyPools.forEach((pool, serviceName) => {
      status[serviceName] = pool.getStatus();
    });
    return status;
  }

  resetKey(service, key) {
    const pool = this.keyPools.get(service);
    if (!pool) return false;
    return pool.resetKey(key);
  }
}

// Export for both CommonJS and ES modules
export default ApiKeyManager;
export { ApiKeyManager, ERROR_TYPES, KEY_STATUS };
