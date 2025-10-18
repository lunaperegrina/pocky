import { Redis } from 'ioredis';

// Simple in-memory cache fallback when Redis is not available
class MemoryCache {
  private cache = new Map<string, { value: any; expiry: number }>();

  set(key: string, value: any, ttlSeconds?: number): void {
    const expiry = ttlSeconds ? Date.now() + ttlSeconds * 1000 : 0;
    this.cache.set(key, { value, expiry });
  }

  get(key: string): any {
    const item = this.cache.get(key);
    if (!item) return null;

    if (item.expiry > 0 && Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  del(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// Redis client
let redis: Redis | null = null;
const memoryCache = new MemoryCache();

// Initialize Redis if available
try {
  redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  redis.on('error', (err) => {
    console.error('Redis error:', err);
    redis = null;
  });
} catch (error) {
  console.warn('Redis not available, using memory cache:', error);
}

export const cache = {
  async get(key: string): Promise<any> {
    if (redis) {
      try {
        const value = await redis.get(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error('Redis get error:', error);
        return memoryCache.get(key);
      }
    }
    return memoryCache.get(key);
  },

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    const serialized = JSON.stringify(value);

    if (redis) {
      try {
        if (ttlSeconds) {
          await redis.setex(key, ttlSeconds, serialized);
        } else {
          await redis.set(key, serialized);
        }
      } catch (error) {
        console.error('Redis set error:', error);
        memoryCache.set(key, value, ttlSeconds);
      }
    } else {
      memoryCache.set(key, value, ttlSeconds);
    }
  },

  async del(key: string): Promise<void> {
    if (redis) {
      try {
        await redis.del(key);
      } catch (error) {
        console.error('Redis del error:', error);
        memoryCache.del(key);
      }
    } else {
      memoryCache.del(key);
    }
  },

  async clear(): Promise<void> {
    if (redis) {
      try {
        await redis.flushall();
      } catch (error) {
        console.error('Redis clear error:', error);
        memoryCache.clear();
      }
    } else {
      memoryCache.clear();
    }
  },

  // Helper functions for common cache patterns
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlSeconds?: number
  ): Promise<T> {
    let value = await cache.get(key);

    if (value === null) {
      value = await fetcher();
      await cache.set(key, value, ttlSeconds);
    }

    return value;
  },
};

export default cache;