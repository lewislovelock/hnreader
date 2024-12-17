"use client"

import { Header } from "@/components/header"
import { CommentList } from "@/components/comment-list"
import { formatDistanceToNow } from "date-fns"
import type { Story, Comment } from "@/lib/hn/types"
import DOMPurify from 'dompurify';

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
      <main className="mx-auto max-w-3xl px-4 pt-16 sm:pt-20 pb-8 sm:pb-16 sm:px-6 lg:px-8">
        <article className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6">
          <div className="space-y-2 mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white">
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
                className="prose prose-sm sm:prose dark:prose-invert"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(story.text) 
                }}
              />
            )}
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              <span>{story.score} points</span>
              <span className="hidden sm:inline">•</span>
              <span>by {story.by}</span>
              <span className="hidden sm:inline">•</span>
              <span>{timeAgo}</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
              {story.descendants} {story.descendants === 1 ? 'comment' : 'comments'}
            </h2>
            <CommentList comments={comments} />
          </div>
        </article>
      </main>
    </div>
  )
} 