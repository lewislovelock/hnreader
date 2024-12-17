"use client"

import { useState, useEffect, useCallback, memo, useMemo } from "react"
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

function CommentItemComponent({ comment, level = 0, storyId }: CommentProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [replies, setReplies] = useState<Comment[]>([])

  // 使用 useMemo 缓存计算值
  const hasReplies = useMemo(() => comment.kids && comment.kids.length > 0, [comment.kids])
  const timeAgo = useMemo(() => {
    const timestamp = new Date(comment.time * 1000)
    return formatDistanceToNow(timestamp, { addSuffix: true })
  }, [comment.time])

  // 使用 useCallback 缓存函数
  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev)
  }, [])

  const loadReplies = useCallback(async () => {
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
  }, [comment.kids, isLoaded, isLoading])

  if (comment.deleted || comment.dead) {
    return null
  }

  const indentClass = level > 0 ? `pl-${Math.min(level * 4, 12)}` : ''

  return (
    <div className="relative group">
      <div className={cn(
        "py-3",
        level > 0 && "ml-4 border-l-2 border-zinc-200 dark:border-zinc-800",
        !isCollapsed && "bg-white dark:bg-zinc-900/30"
      )}>
        <div className={cn("relative", indentClass)}>
          {/* Comment Header */}
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={toggleCollapse}
              className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              [{isCollapsed ? '+' : '–'}]
            </button>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">{comment.by}</span>
            <span className="text-zinc-400 dark:text-zinc-500">•</span>
            <span className="text-zinc-500 dark:text-zinc-400">{timeAgo}</span>
            <span className="text-zinc-400 dark:text-zinc-500">|</span>
            <div className="flex items-center gap-1 text-xs">
              <Link
                href={`/item/${storyId}`}
                className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
              >
                root
              </Link>
              {comment.parent && comment.parent !== storyId && (
                <>
                  <span className="text-zinc-400 dark:text-zinc-500">|</span>
                  <Link
                    href={`/item/${comment.parent}`}
                    className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                  >
                    parent
                  </Link>
                </>
              )}
              {hasReplies && !isLoaded && (
                <>
                  <span className="text-zinc-400 dark:text-zinc-500">|</span>
                  <button
                    onClick={loadReplies}
                    className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
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
                className="mt-2 prose prose-zinc dark:prose-invert max-w-none
                  prose-p:text-sm prose-p:leading-relaxed
                  prose-p:text-zinc-800 dark:prose-p:text-zinc-200
                  prose-a:text-blue-700 dark:prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline
                  prose-code:text-xs prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800/80 prose-code:px-1 prose-code:rounded
                  prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800/80 prose-pre:p-3 prose-pre:rounded-md
                  prose-p:my-2 prose-headings:my-4
                  selection:bg-zinc-100 dark:selection:bg-zinc-800"
                dangerouslySetInnerHTML={{ __html: comment.text }}
              />

              {/* Reply Loading State */}
              {hasReplies && !isLoaded && (
                <div className="mt-2">
                  {error ? (
                    <button
                      onClick={() => loadReplies()}
                      className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      Error loading replies. Click to retry.
                    </button>
                  ) : (
                    <button
                      onClick={loadReplies}
                      disabled={isLoading}
                      className={cn(
                        "text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors",
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

// 使用 memo 包装组件，只有当必要的 props 改变时才重新渲染
export const CommentItem = memo(CommentItemComponent, (prevProps, nextProps) => {
  return (
    prevProps.comment.id === nextProps.comment.id &&
    prevProps.comment.text === nextProps.comment.text &&
    prevProps.level === nextProps.level &&
    prevProps.storyId === nextProps.storyId
  )
}) 