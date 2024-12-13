"use client"

import { useState } from "react"
import { CommentItem } from "./comment"
import type { Comment } from "@/lib/hn/types"

type SortOption = "time" | "replies"

export function CommentList({ comments: initialComments }: { comments: Comment[] }) {
  const [sortBy, setSortBy] = useState<SortOption>("time")
  const [comments, setComments] = useState(initialComments)

  const sortComments = (option: SortOption) => {
    setSortBy(option)
    const sorted = [...comments].sort((a, b) => {
      if (option === "time") {
        return b.time - a.time
      }
      return (b.kids?.length || 0) - (a.kids?.length || 0)
    })
    setComments(sorted)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end space-x-2 text-sm">
        <span className="text-zinc-500 dark:text-zinc-400">Sort by:</span>
        <button
          onClick={() => sortComments("time")}
          className={`px-2 py-1 rounded ${
            sortBy === "time"
              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          Time
        </button>
        <button
          onClick={() => sortComments("replies")}
          className={`px-2 py-1 rounded ${
            sortBy === "replies"
              ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          Replies
        </button>
      </div>
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
} 