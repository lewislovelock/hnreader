"use client"

import { useStories } from "@/lib/hn/hooks"
import { StoryItem } from "./story-item"
import { Pagination } from "./pagination"
import type { StoryType } from "@/lib/hn/types"

interface StoryListProps {
  type: StoryType        
  page?: number          
  baseUrl: string        
}

export function StoryList({ type, page = 1, baseUrl }: StoryListProps) {
  const { stories, loading, error, hasMore } = useStories(type, page)

  if (error) {
    return (
      <div className="text-center py-10 text-zinc-600 dark:text-zinc-400">
        Failed to load stories. Please try again later.
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-8">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 animate-pulse"
          >
            <div className="h-5 sm:h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mb-3 sm:mb-4" />
            <div className="h-3 sm:h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4 sm:space-y-8">
        {stories.map((story, index) => (
          <StoryItem 
            key={story.id} 
            story={story} 
            number={(page - 1) * 30 + index + 1}
          />
        ))}
      </div>
      <Pagination currentPage={page} hasMore={hasMore} baseUrl={baseUrl} />
    </>
  )
}