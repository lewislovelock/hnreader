import { Story, StoryType } from './types'
import { HNCache } from './cache'

const API_BASE = 'https://hacker-news.firebaseio.com/v0'
const cache = HNCache.getInstance()

/**
 * Fetches a single item from the Hacker News API with caching
 * @param id The ID of the item to fetch
 * @returns Promise resolving to the item data
 */
export async function fetchItem<T>(id: number): Promise<T> {
  try {
    // Try to get from cache first
    const cacheKey = `item:${id}`
    const cached = cache.get<T>(cacheKey)
    if (cached) return cached

    const response = await fetch(`${API_BASE}/item/${id}.json`)
    if (!response.ok) {
      throw new Error(`Failed to fetch item ${id}`)
    }
    const data = await response.json()
    cache.set(cacheKey, data)
    return data
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error(`Failed to fetch item ${id}`)
  }
}

/**
 * Fetches a list of story IDs for a given story type
 * @param type The type of stories to fetch (top, new, best, etc.)
 * @returns Promise resolving to an array of story IDs
 */
export async function fetchStories(type: StoryType): Promise<number[]> {
  try {
    // Try to get from cache first
    const cacheKey = `${type}stories`
    const cached = cache.get<number[]>(cacheKey)
    if (cached) return cached

    const response = await fetch(`${API_BASE}/${type}stories.json`)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} stories`)
    }
    const data = await response.json()
    cache.set(cacheKey, data)
    return data
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error(`Failed to fetch ${type} stories`)
  }
}

/**
 * Fetches a single story by ID
 * @param id The ID of the story to fetch
 * @returns Promise resolving to the Story object
 */
export async function fetchStory(id: number): Promise<Story> {
  return fetchItem<Story>(id)
}

/**
 * Fetches a paginated list of stories with their full details
 * @param type The type of stories to fetch
 * @param page The page number to fetch (defaults to 1)
 * @param itemsPerPage Number of items per page (defaults to 30)
 * @returns Promise resolving to an object containing stories, pagination info
 */
export async function fetchStoriesWithDetails(
  type: StoryType,
  page: number = 1,
  itemsPerPage: number = 30
): Promise<{
  stories: Story[];
  hasMore: boolean;
  total: number;
}> {
  try {
    const allIds = await fetchStories(type)
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    const pageIds = allIds.slice(start, end)
    
    // Fetch current page stories
    const stories = await Promise.all(
      pageIds.map(id => fetchStory(id))
    )

    // Filter out any null results and sort by score
    const validStories = stories
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
    
    // Prefetch next page in background
    if (end < allIds.length) {
      const nextPageIds = allIds.slice(end, end + itemsPerPage)
      void Promise.all(nextPageIds.map(id => cache.prefetchStory(id)))
        .catch(console.error)
    }

    return {
      stories: validStories,
      hasMore: end < allIds.length,
      total: allIds.length
    }
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error(`Failed to fetch stories`)
  }
} 