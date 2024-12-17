"use client"

import { CommentItem } from "./comment"
import type { Comment } from "@/lib/hn/types"

interface CommentListProps {
  comments: Comment[]
  storyId: number
}

export function CommentList({ comments, storyId }: CommentListProps) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} storyId={storyId} />
      ))}
    </div>
  )
} 