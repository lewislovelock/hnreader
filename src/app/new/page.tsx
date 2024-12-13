import { Header } from "@/components/header"
import { StoryList } from "@/components/story-list"

interface PageProps {
  searchParams: { p?: string }
}

export default async function NewStoriesPage({ searchParams }: PageProps) {
  const { p } = await Promise.resolve(searchParams)
  const page = p ? parseInt(p) : 1

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <StoryList type="new" page={page} baseUrl="/new" />
      </main>
    </div>
  )
} 