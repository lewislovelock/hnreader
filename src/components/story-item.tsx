"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import type { Story } from "@/lib/hn/types"

export function StoryItem({ story }: { story: Story }) {
  const timestamp = new Date(story.time * 1000)
  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true })
  
  return (
    <article className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
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
        {story.text && (
          <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3">
            {story.text}
          </p>
        )}
      </div>
      <div className="mt-4 flex items-center space-x-4 text-sm text-zinc-500 dark:text-zinc-400">
        <span>{story.score} points</span>
        <span>•</span>
        <span>by {story.by}</span>
        <span>•</span>
        <Link
          href={`/item/${story.id}`}
          className="hover:text-zinc-900 dark:hover:text-white"
        >
          {story.descendants} comments
        </Link>
        <span>•</span>
        <span>{timeAgo}</span>
      </div>
    </article>
  )
} 