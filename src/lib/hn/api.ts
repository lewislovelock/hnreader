import { Story, StoryType } from './types'

const API_BASE = 'https://hacker-news.firebaseio.com/v0'

export async function fetchItem<T>(id: number): Promise<T> {
  const response = await fetch(`${API_BASE}/item/${id}.json`)
  if (!response.ok) {
    throw new Error(`Failed to fetch item ${id}`)
  }
  return response.json()
}

export async function fetchStories(type: StoryType): Promise<number[]> {
  const response = await fetch(`${API_BASE}/${type}stories.json`)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} stories`)
  }
  return response.json()
}

export async function fetchStory(id: number): Promise<Story> {
  return fetchItem<Story>(id)
}

export async function fetchStoriesWithDetails(type: StoryType, limit: number = 30): Promise<Story[]> {
  const ids = await fetchStories(type)
  const limitedIds = ids.slice(0, limit)
  
  const stories = await Promise.all(
    limitedIds.map(id => fetchStory(id))
  )
  
  return stories.filter(Boolean)
} 