/**
 * A lightweight in-memory cache for HN API responses
 * Note: This cache is ephemeral and will be cleared when the serverless function is recycled
 */
export class HNCache {
  private static instance: HNCache;
  private cache: Map<string, { data: unknown; timestamp: number }>;
  private readonly TTL = 5 * 60 * 1000; // 5 minutes TTL

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): HNCache {
    if (!HNCache.instance) {
      HNCache.instance = new HNCache();
    }
    return HNCache.instance;
  }

  /**
   * Get an item from cache
   * @param key Cache key
   * @returns Cached item or undefined if not found/expired
   */
  public get<T>(key: string): T | undefined {
    const item = this.cache.get(key);
    if (!item) return undefined;

    // Check if item has expired
    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return undefined;
    }

    return item.data as T;
  }

  /**
   * Set an item in cache
   * @param key Cache key
   * @param data Data to cache
   */
  public set(key: string, data: unknown): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Prefetch a story and store in cache
   * @param id Story ID to prefetch
   */
  public async prefetchStory(id: number): Promise<void> {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    if (!response.ok) return;
    
    const data = await response.json();
    this.set(`item:${id}`, data);
  }

  /**
   * Clear all cached items
   */
  public clear(): void {
    this.cache.clear();
  }
} 