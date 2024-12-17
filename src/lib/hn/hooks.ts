import { useEffect, useState } from 'react'
import { Story, StoryType } from './types'
import { fetchStoriesWithDetails } from './api'

/**
 * React hook to fetch and manage Hacker News stories with pagination
 * @param type The type of stories to fetch (top, new, best, etc.)
 * @param page The page number to fetch (defaults to 1)
 * @returns Object containing stories, loading state, error state, and pagination info
 */
export function useStories(type: StoryType, page: number = 1) {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let mounted = true

    const loadStories = async () => {
      try {
        setLoading(true)
        const result = await fetchStoriesWithDetails(type, page)
        
        if (mounted) {
          setStories(result.stories)
          setHasMore(result.hasMore)
          setTotal(result.total)
          setError(null)
        }
      } catch (e) {
        if (mounted) {
          setError(e instanceof Error ? e : new Error('Failed to fetch stories'))
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadStories()

    return () => {
      mounted = false
    }
  }, [type, page])

  return { 
    stories, 
    loading, 
    error, 
    hasMore,
    total,
    currentPage: page,
    pageCount: Math.ceil(total / 30)
  }
} 