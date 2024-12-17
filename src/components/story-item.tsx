"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import type { Story } from "@/lib/hn/types"
import { memo } from "react"

interface StoryItemProps {
  story: Story
}

function StoryItemComponent({ story }: StoryItemProps) {
  const timestamp = new Date(story.time * 1000)
  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true })
  
  return (
    <article className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
      <div className="space-y-2.5">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-tight">
          {story.url ? (
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {story.title}
            </a>
          ) : (
            <Link href={`/item/${story.id}`} className="hover:underline">
              {story.title}
            </Link>
          )}
        </h2>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 sm:gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
        <span>{story.score} points</span>
        <span className="hidden sm:inline">•</span>
        <span>by {story.by}</span>
        <span className="hidden sm:inline">•</span>
        <Link
          href={`/item/${story.id}`}
          className="hover:text-zinc-900 dark:hover:text-white"
        >
          {story.descendants} comments
        </Link>
        <span className="hidden sm:inline">•</span>
        <span>{timeAgo}</span>
      </div>
    </article>
  )
}

// 使用 memo 包装组件，只有当 props 改变时才重新渲染
export const StoryItem = memo(StoryItemComponent, (prevProps, nextProps) => {
  // 自定义比较函数，只比较必要的属性
  return (
    prevProps.story.id === nextProps.story.id &&
    prevProps.story.title === nextProps.story.title &&
    prevProps.story.score === nextProps.story.score &&
    prevProps.story.descendants === nextProps.story.descendants
  )
}) 