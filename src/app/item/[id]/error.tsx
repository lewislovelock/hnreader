"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
            Something went wrong!
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Failed to load the story. Please try again.
          </p>
          <button
            onClick={reset}
            className="rounded-lg px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Try again
          </button>
        </div>
      </main>
    </div>
  )
} 