"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import type { Comment } from "@/lib/hn/types"
import { cn } from "@/lib/utils"

interface CommentProps {
  comment: Comment
  level?: number
}

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url)
      if (response.ok) return response
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)))
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`)
}

export function CommentItem({ comment, level = 0 }: CommentProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [replies, setReplies] = useState<Comment[]>([])
  const hasReplies = comment.kids && comment.kids.length > 0
  const timestamp = new Date(comment.time * 1000)
  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true })

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const loadReplies = async () => {
    if (!comment.kids || isLoaded || isLoading) return
    
    try {
      setIsLoading(true)
      setError(null)
      const responses = await Promise.allSettled(
        comment.kids.map(id =>
          fetchWithRetry(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(res => res.json())
        )
      )
      
      const validReplies = responses
        .filter((result): result is PromiseFulfilledResult<Comment> => 
          result.status === 'fulfilled'
        )
        .map(result => result.value)
        .filter(reply => !reply.deleted && !reply.dead)
      
      setReplies(validReplies)
      setIsLoaded(true)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load replies'))
    } finally {
      setIsLoading(false)
    }
  }

  if (comment.deleted || comment.dead) {
    return null
  }

  return (
    <div className={cn("pl-4 border-l border-zinc-200 dark:border-zinc-800", level > 0 && "mt-4")}>
      <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-2">
        <button
          onClick={toggleCollapse}
          className="hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          [{isCollapsed ? '+' : '-'}]
        </button>
        <span>{comment.by}</span>
        <span>•</span>
        <span>{timeAgo}</span>
      </div>
      {!isCollapsed && (
        <>
          <div
            className="text-zinc-600 dark:text-zinc-300 prose prose-zinc dark:prose-invert max-w-none mb-4"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
          {hasReplies && !isLoaded && (
            <div className="mb-4">
              {error ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => loadReplies()}
                    className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  >
                    Error loading replies. Click to retry.
                  </button>
                </div>
              ) : (
                <button
                  onClick={loadReplies}
                  disabled={isLoading}
                  className={cn(
                    "text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors",
                    isLoading && "opacity-50 cursor-wait"
                  )}
                >
                  {isLoading ? (
                    "Loading replies..."
                  ) : (
                    `${comment.kids?.length} ${comment.kids?.length === 1 ? 'reply' : 'replies'}`
                  )}
                </button>
              )}
            </div>
          )}
          {isLoaded && replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} level={level + 1} />
          ))}
        </>
      )}
    </div>
  )
} 