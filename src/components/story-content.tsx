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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Header />
      <main className="w-full max-w-screen-lg mx-auto px-4 pt-12 sm:pt-20 pb-16">
        <article className="bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-lg overflow-hidden">
          {/* Story Header */}
          <header className="p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 border-b border-zinc-100 dark:border-zinc-800">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
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
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              <span>{story.score} points</span>
              <span>•</span>
              <span>by {story.by}</span>
              <span>•</span>
              <span>{timeAgo}</span>
              {story.url && (
                <>
                  <span>•</span>
                  <a
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors truncate max-w-[300px]"
                  >
                    {new URL(story.url).hostname}
                  </a>
                </>
              )}
            </div>
          </header>

          {/* Story Content */}
          {story.text && (
            <div className="p-4 sm:p-6 lg:p-8 border-b border-zinc-100 dark:border-zinc-800">
              <div
                className="prose prose-zinc prose-quoteless dark:prose-invert max-w-none
                  prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed 
                  prose-p:text-black dark:prose-p:text-zinc-200
                  prose-a:text-blue-700 dark:prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-zinc-900 dark:prose-strong:text-zinc-50
                  prose-code:text-sm prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:rounded
                  prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800 prose-pre:p-4 prose-pre:rounded-lg
                  prose-p:my-4 prose-headings:my-6
                  selection:bg-zinc-100 dark:selection:bg-zinc-800"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(story.text) 
                }}
              />
            </div>
          )}

          {/* Comments Section */}
          <section className="p-4 sm:p-6 lg:p-8 space-y-6">
            <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              {story.descendants} {story.descendants === 1 ? 'comment' : 'comments'}
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <CommentList comments={comments} storyId={story.id} />
            </div>
          </section>
        </article>
      </main>
    </div>
  )
} 