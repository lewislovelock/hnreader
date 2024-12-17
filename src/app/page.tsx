import { Header } from "@/components/header"
import { StoryList } from "@/components/story-list"

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default function Home({ searchParams }: PageProps) {
  const page = searchParams.p ? parseInt(searchParams.p as string) : 1

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <StoryList type="top" page={page} baseUrl="/" />
      </main>
    </div>
  )
}
