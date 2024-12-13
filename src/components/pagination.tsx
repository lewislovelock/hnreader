"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  hasMore: boolean
  baseUrl: string
}

export function Pagination({ currentPage, hasMore, baseUrl }: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = hasMore ? currentPage + 1 : null

  return (
    <div className="flex items-center justify-center space-x-6 py-8">
      {prevPage ? (
        <Link
          href={`${baseUrl}${prevPage > 1 ? `?p=${prevPage}` : ''}`}
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span className="text-sm text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
          Previous
        </span>
      )}
      <span className="text-sm font-medium text-zinc-900 dark:text-white">
        Page {currentPage}
      </span>
      {nextPage ? (
        <Link
          href={`${baseUrl}?p=${nextPage}`}
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Next
        </Link>
      ) : (
        <span className="text-sm text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
          Next
        </span>
      )}
    </div>
  )
} 