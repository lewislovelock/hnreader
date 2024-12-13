import { useEffect, useState } from 'react'
import { Story, StoryType } from './types'
import { fetchStoriesWithDetails } from './api'

export function useStories(type: StoryType, page: number = 1) {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const ITEMS_PER_PAGE = 30
  const start = (page - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  useEffect(() => {
    const loadStories = async () => {
      try {
        setLoading(true)
        const data = await fetchStoriesWithDetails(type, end)
        const pageStories = data.slice(start, end)
        setStories(pageStories)
        setHasMore(data.length > end)
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to fetch stories'))
      } finally {
        setLoading(false)
      }
    }

    loadStories()
  }, [type, page, start, end])

  return { stories, loading, error, hasMore }
} 