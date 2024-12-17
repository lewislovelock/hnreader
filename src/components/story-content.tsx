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
        <article className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 sm:p-8">
          <div className="space-y-6 mb-10">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-tight">
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
                className="prose prose-zinc prose-sm sm:prose dark:prose-invert max-w-none
                  prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-300
                  prose-a:text-blue-600 dark:prose-a:text-blue-400
                  prose-strong:text-zinc-900 dark:prose-strong:text-white
                  prose-code:text-sm prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:rounded
                  prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800 prose-pre:p-4 prose-pre:rounded-lg
                  prose-p:my-4 prose-headings:my-6"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(story.text) 
                }}
              />
            )}
            <div className="flex flex-wrap gap-2 sm:gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              <span>{story.score} points</span>
              <span className="hidden sm:inline">•</span>
              <span>by {story.by}</span>
              <span className="hidden sm:inline">•</span>
              <span>{timeAgo}</span>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              {story.descendants} {story.descendants === 1 ? 'comment' : 'comments'}
            </h2>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              <CommentList comments={comments} />
            </div>
          </div>
        </article>
      </main>
    </div>
  )
} 