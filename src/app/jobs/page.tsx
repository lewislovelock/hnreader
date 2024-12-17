import { Header } from "@/components/header"
import { StoryList } from "@/components/story-list"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "HN Reader - Jobs",
  description: "Job listings from Hacker News",
}

export default async function JobStoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const page = params?.p ? 
    typeof params.p === 'string' ? parseInt(params.p) : 1
    : 1

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <StoryList type="job" page={page} baseUrl="/jobs" />
      </main>
    </div>
  )
} 