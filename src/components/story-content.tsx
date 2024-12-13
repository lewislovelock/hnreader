"use client"

import { Header } from "@/components/header"
import { CommentList } from "@/components/comment-list"
import { formatDistanceToNow } from "date-fns"
import type { Story, Comment } from "@/lib/hn/types"

interface StoryContentProps {
  story: Story
  comments: Comment[]
}

export function StoryContent({ story, comments }: StoryContentProps) {
  const timestamp = new Date(story.time * 1000)
  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true })

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <article className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
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
                story.title
              )}
            </h1>
            {story.text && (
              <div
                className="text-zinc-600 dark:text-zinc-300 prose prose-zinc dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: story.text }}
              />
            )}
            <div className="flex items-center space-x-4 text-sm text-zinc-500 dark:text-zinc-400">
              <span>{story.score} points</span>
              <span>•</span>
              <span>by {story.by}</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {story.descendants} {story.descendants === 1 ? 'comment' : 'comments'}
            </h2>
            <CommentList comments={comments} />
          </div>
        </article>
      </main>
    </div>
  )
} 