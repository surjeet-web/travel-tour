// Advanced app caching for instant loading and offline functionality

interface CacheConfig {
  name: string;
  version: string;
  maxAge: number; // in milliseconds
  maxSize: number; // maximum number of entries
}

interface CacheEntry {
  data: any;
  timestamp: number;
  expires: number;
  version: string;
}

class AppCache {
  private static instance: AppCache;
  private caches: Map<string, Map<string, CacheEntry>> = new Map();
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = config;
    this.loadFromStorage();
    this.setupPeriodicCleanup();
  }

  static getInstance(config?: CacheConfig): AppCache {
    if (!AppCache.instance) {
      AppCache.instance = new AppCache(config || {
        name: 'tourex-app-cache',
        version: '2.0.0',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        maxSize: 1000
      });
    }
    return AppCache.instance;
  }

  // Store data with automatic expiration
  set(cacheType: string, key: string, data: any, customMaxAge?: number): void {
    if (!this.caches.has(cacheType)) {
      this.caches.set(cacheType, new Map());
    }

    const cache = this.caches.get(cacheType)!;
    const now = Date.now();
    const maxAge = customMaxAge || this.config.maxAge;

    const entry: CacheEntry = {
      data,
      timestamp: now,
      expires: now + maxAge,
      version: this.config.version
    };

    cache.set(key, entry);
    this.enforceMaxSize(cache);
    this.saveToStorage();
  }

  // Retrieve data if not expired
  get(cacheType: string, key: string): any | null {
    const cache = this.caches.get(cacheType);
    if (!cache) return null;

    const entry = cache.get(key);
    if (!entry) return null;

    // Check if expired
    if (Date.now() > entry.expires) {
      cache.delete(key);
      this.saveToStorage();
      return null;
    }

    // Check version compatibility
    if (entry.version !== this.config.version) {
      cache.delete(key);
      this.saveToStorage();
      return null;
    }

    return entry.data;
  }

  // Check if data exists and is valid
  has(cacheType: string, key: string): boolean {
    return this.get(cacheType, key) !== null;
  }

  // Remove specific entry
  delete(cacheType: string, key: string): boolean {
    const cache = this.caches.get(cacheType);
    if (!cache) return false;

    const result = cache.delete(key);
    if (result) {
      this.saveToStorage();
    }
    return result;
  }

  // Clear entire cache type
  clear(cacheType: string): void {
    this.caches.delete(cacheType);
    this.saveToStorage();
  }

  // Clear all caches
  clearAll(): void {
    this.caches.clear();
    this.saveToStorage();
  }

  // Get cache statistics
  getStats(): { [cacheType: string]: { size: number; oldestEntry: number; newestEntry: number } } {
    const stats: any = {};

    this.caches.forEach((cache, cacheType) => {
      const entries = Array.from(cache.values());
      stats[cacheType] = {
        size: entries.length,
        oldestEntry: entries.length > 0 ? Math.min(...entries.map(e => e.timestamp)) : 0,
        newestEntry: entries.length > 0 ? Math.max(...entries.map(e => e.timestamp)) : 0
      };
    });

    return stats;
  }

  // Preload critical data
  async preloadCriticalData(): Promise<void> {
    console.log('📦 Preloading critical app data...');

    try {
      // Preload travel packages data
      if (!this.has('api', 'travel-packages')) {
        const travelPackages = await import('../data/TravelPackageData');
        this.set('api', 'travel-packages', travelPackages.default, 60 * 60 * 1000); // 1 hour
      }

      // Preload car rental data
      if (!this.has('api', 'car-rentals')) {
        const carRentals = await import('../data/CarRentalData');
        this.set('api', 'car-rentals', carRentals.default, 60 * 60 * 1000); // 1 hour
      }

      // Cache user preferences
      const userPrefs = this.getUserPreferences();
      this.set('user', 'preferences', userPrefs, 7 * 24 * 60 * 60 * 1000); // 1 week

      console.log('✅ Critical data preloaded');
    } catch (error) {
      console.error('❌ Failed to preload critical data:', error);
    }
  }

  // Cache API responses
  cacheApiResponse(endpoint: string, data: any, maxAge?: number): void {
    this.set('api', endpoint, data, maxAge);
  }

  // Get cached API response
  getCachedApiResponse(endpoint: string): any | null {
    return this.get('api', endpoint);
  }

  // Cache page data for instant navigation
  cachePage(route: string, data: any): void {
    this.set('pages', route, data, 30 * 60 * 1000); // 30 minutes
  }

  // Get cached page data
  getCachedPage(route: string): any | null {
    return this.get('pages', route);
  }

  // Cache user session data
  cacheUserSession(sessionData: any): void {
    this.set('user', 'session', sessionData, 24 * 60 * 60 * 1000); // 24 hours
  }

  // Get cached user session
  getCachedUserSession(): any | null {
    return this.get('user', 'session');
  }

  // Private methods
  private enforceMaxSize(cache: Map<string, CacheEntry>): void {
    if (cache.size <= this.config.maxSize) return;

    // Remove oldest entries
    const entries = Array.from(cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

    const entriesToRemove = entries.slice(0, entries.length - this.config.maxSize);
    entriesToRemove.forEach(([key]) => cache.delete(key));
  }

  private setupPeriodicCleanup(): void {
    // Clean up expired entries every 5 minutes
    setInterval(() => {
      this.cleanupExpiredEntries();
    }, 5 * 60 * 1000);
  }

  private cleanupExpiredEntries(): void {
    const now = Date.now();
    let cleanedCount = 0;

    this.caches.forEach((cache) => {
      const keysToDelete: string[] = [];

      cache.forEach((entry, key) => {
        if (now > entry.expires || entry.version !== this.config.version) {
          keysToDelete.push(key);
        }
      });

      keysToDelete.forEach(key => {
        cache.delete(key);
        cleanedCount++;
      });
    });

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} expired cache entries`);
      this.saveToStorage();
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(`${this.config.name}-data`);
      if (stored) {
        const data = JSON.parse(stored);
        
        // Convert plain objects back to Maps
        Object.entries(data).forEach(([cacheType, cacheData]: [string, any]) => {
          const cache = new Map<string, CacheEntry>();
          Object.entries(cacheData).forEach(([key, entry]: [string, any]) => {
            cache.set(key, entry as CacheEntry);
          });
          this.caches.set(cacheType, cache);
        });

        console.log('📦 App cache loaded from storage');
      }
    } catch (error) {
      console.error('❌ Failed to load cache from storage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      // Convert Maps to plain objects for JSON serialization
      const data: any = {};
      this.caches.forEach((cache, cacheType) => {
        data[cacheType] = Object.fromEntries(cache.entries());
      });

      localStorage.setItem(`${this.config.name}-data`, JSON.stringify(data));
    } catch (error) {
      console.error('❌ Failed to save cache to storage:', error);
      
      // If storage is full, clear some old data and try again
      if ((error as any).name === 'QuotaExceededError') {
        this.clearOldestEntries(0.3); // Clear 30% of entries
        try {
          const data: any = {};
          this.caches.forEach((cache, cacheType) => {
            data[cacheType] = Object.fromEntries(cache.entries());
          });
          localStorage.setItem(`${this.config.name}-data`, JSON.stringify(data));
        } catch (retryError) {
          console.error('❌ Failed to save cache after cleanup:', retryError);
        }
      }
    }
  }

  private clearOldestEntries(percentage: number): void {
    const allEntries: Array<[string, string, CacheEntry]> = [];

    // Collect all entries with their cache type and key
    this.caches.forEach((cache, cacheType) => {
      cache.forEach((entry, key) => {
        allEntries.push([cacheType, key, entry]);
      });
    });

    // Sort by timestamp (oldest first)
    allEntries.sort((a, b) => a[2].timestamp - b[2].timestamp);

    // Remove the oldest percentage of entries
    const entriesToRemove = Math.floor(allEntries.length * percentage);
    for (let i = 0; i < entriesToRemove; i++) {
      const [cacheType, key] = allEntries[i];
      this.caches.get(cacheType)?.delete(key);
    }

    console.log(`🗑️ Cleared ${entriesToRemove} oldest cache entries`);
  }

  private getUserPreferences(): any {
    return {
      theme: localStorage.getItem('theme') || 'light',
      language: localStorage.getItem('language') || 'en',
      currency: localStorage.getItem('currency') || 'USD',
      notifications: localStorage.getItem('notifications') !== 'false',
      lastVisit: Date.now()
    };
  }
}

// Create and export singleton instance
export const appCache = AppCache.getInstance();

// Export utility functions
export const CacheUtils = {
  // Preload critical app data
  preloadCriticalData: () => appCache.preloadCriticalData(),
  
  // Cache API response with smart expiration
  cacheApiResponse: (endpoint: string, data: any, maxAge?: number) => {
    appCache.cacheApiResponse(endpoint, data, maxAge);
  },
  
  // Get cached API response
  getCachedApiResponse: (endpoint: string) => {
    return appCache.getCachedApiResponse(endpoint);
  },
  
  // Cache page for instant navigation
  cachePage: (route: string, data: any) => {
    appCache.cachePage(route, data);
  },
  
  // Get cached page
  getCachedPage: (route: string) => {
    return appCache.getCachedPage(route);
  },
  
  // Get cache statistics
  getStats: () => appCache.getStats(),
  
  // Clear all caches
  clearAll: () => appCache.clearAll()
};

export default appCache;