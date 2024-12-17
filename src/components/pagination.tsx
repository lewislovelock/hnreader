"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * Props for the Pagination component
 */
interface PaginationProps {
  /** Current page number */
  currentPage: number
  /** Whether there are more pages after the current page */
  hasMore: boolean
  /** Base URL for pagination links */
  baseUrl: string
  /** Total number of pages (optional) */
  pageCount?: number
}

/**
 * A responsive pagination component that shows page numbers on desktop
 * and simplified navigation on mobile
 */
export function Pagination({ currentPage, hasMore, baseUrl, pageCount }: PaginationProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = hasMore ? currentPage + 1 : null

  // Build array of page numbers
  const getPageNumbers = () => {
    if (!pageCount) return []
    const pages: (number | string)[] = []
    
    // Always show first page
    pages.push(1)
    
    // Pages around current page
    let start = Math.max(2, currentPage - 1)
    let end = Math.min(pageCount - 1, currentPage + 1)
    
    // Add ellipsis if needed
    if (start > 2) pages.push('...')
    
    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    // Add ellipsis if needed
    if (end < pageCount - 1) pages.push('...')
    
    // Always show last page
    if (pageCount > 1) pages.push(pageCount)
    
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      {/* Previous Button */}
      {prevPage ? (
        <Link
          href={`${baseUrl}${prevPage > 1 ? `?p=${prevPage}` : ''}`}
          className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
          Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (typeof page === 'string') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-sm text-zinc-400 dark:text-zinc-600"
              >
                {page}
              </span>
            )
          }

          return (
            <Link
              key={page}
              href={`${baseUrl}${page > 1 ? `?p=${page}` : ''}`}
              className={cn(
                "px-3 py-2 text-sm rounded-md transition-colors",
                currentPage === page
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              )}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {/* Current Page Indicator (Mobile) */}
      <span className="sm:hidden text-sm font-medium text-zinc-900 dark:text-white px-3 py-2">
        Page {currentPage}
      </span>

      {/* Next Button */}
      {nextPage ? (
        <Link
          href={`${baseUrl}?p=${nextPage}`}
          className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Next
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
          Next
        </span>
      )}
    </div>
  )
} 