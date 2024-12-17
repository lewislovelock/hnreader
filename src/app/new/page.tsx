import { Header } from "@/components/header"
import { StoryList } from "@/components/story-list"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "HN Reader - New Stories",
  description: "Latest stories from Hacker News",
}

export default function NewStoriesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams?.p === 'string' ? parseInt(searchParams.p) : 1

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <StoryList type="new" page={page} baseUrl="/new" />
      </main>
    </div>
  )
} 