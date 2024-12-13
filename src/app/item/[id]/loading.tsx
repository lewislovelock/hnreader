import { Header } from "@/components/header"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <article className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 animate-pulse">
          <div className="space-y-4 mb-6">
            <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-24" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-40" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="pl-4 border-l border-zinc-200 dark:border-zinc-800 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20" />
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-24" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </article>
      </main>
    </div>
  )
} 