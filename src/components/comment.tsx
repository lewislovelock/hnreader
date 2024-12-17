"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import type { Comment } from "@/lib/hn/types"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CommentProps {
  comment: Comment
  level?: number
  storyId: number
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

export function CommentItem({ comment, level = 0, storyId }: CommentProps) {
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

  const indentClass = level > 0 ? `pl-${Math.min(level * 4, 12)}` : ''

  return (
    <div className="relative group">
      <div className={cn(
        "py-2",
        level > 0 && "ml-4 border-l-2 border-zinc-200 dark:border-zinc-800",
      )}>
        <div className={cn("relative", indentClass)}>
          {/* Comment Header */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <button
              onClick={toggleCollapse}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              [{isCollapsed ? '+' : '-'}]
            </button>
            <span className="font-medium">{comment.by}</span>
            <span>•</span>
            <span>{timeAgo}</span>
            <span>|</span>
            <div className="flex items-center gap-1 text-xs">
              <Link
                href={`/item/${storyId}`}
                className="hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                root
              </Link>
              {comment.parent && comment.parent !== storyId && (
                <>
                  <span>|</span>
                  <Link
                    href={`/item/${comment.parent}`}
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    parent
                  </Link>
                </>
              )}
              {hasReplies && !isLoaded && (
                <>
                  <span>|</span>
                  <button
                    onClick={loadReplies}
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    next
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Comment Content */}
          {!isCollapsed && (
            <>
              <div
                className="mt-2 text-zinc-600 dark:text-zinc-300 prose prose-zinc dark:prose-invert max-w-none
                  prose-p:my-2 prose-p:leading-relaxed
                  prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                  prose-code:text-sm prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: comment.text }}
              />

              {/* Reply Loading State */}
              {hasReplies && !isLoaded && (
                <div className="mt-2">
                  {error ? (
                    <button
                      onClick={() => loadReplies()}
                      className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      Error loading replies. Click to retry.
                    </button>
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

              {/* Nested Comments */}
              {isLoaded && replies.map(reply => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  level={level + 1} 
                  storyId={storyId} 
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
} 