import { StoryContent } from "@/components/story-content"
import type { Story, Comment } from "@/lib/hn/types"
import { Metadata } from "next"

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, { next: { revalidate: 60 } })
      if (response.ok) return response
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)))
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`)
}

async function fetchItem<T>(id: number): Promise<T> {
  const response = await fetchWithRetry(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch item ${id}`)
  }
  return response.json()
}

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const story = await fetchItem<Story>(parseInt(resolvedParams.id))
  
  return {
    title: `${story.title} | HN Reader`,
    description: story.text || `Discussion about ${story.title} on Hacker News`,
  }
}

export default async function StoryPage({ params }: PageProps) {
  const resolvedParams = await params
  const story = await fetchItem<Story>(parseInt(resolvedParams.id))

  let comments: Comment[] = []
  if (story.kids) {
    const responses = await Promise.allSettled(
      story.kids.map(id => fetchItem<Comment>(id))
    )
    comments = responses
      .filter((result): result is PromiseFulfilledResult<Comment> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value)
      .filter(comment => !comment.deleted && !comment.dead)
  }

  return <StoryContent story={story} comments={comments} />
} 