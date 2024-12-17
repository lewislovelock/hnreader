// 声明这是客户端组件
"use client"

// 导入必要的依赖和组件
import { useStories } from "@/lib/hn/hooks"
import { StoryItem } from "./story-item"
import { Pagination } from "./pagination"
import type { StoryType } from "@/lib/hn/types"

// 定义组件的属性接口
interface StoryListProps {
  type: StoryType        // 故事类型（如：top, new, best 等）
  page?: number          // 当前页码，默认为 1
  baseUrl: string        // 用于构建分页 URL 的基础路径
}

// 主组件定义
export function StoryList({ type, page = 1, baseUrl }: StoryListProps) {
  // 使用自定义 hook 获取故事数据
  const { stories, loading, error, hasMore } = useStories(type, page)

  // 错误处理
  if (error) {
    return (
      <div className="text-center py-10 text-zinc-600 dark:text-zinc-400">
        Failed to load stories. Please try again later.
      </div>
    )
  }

  // 加载状态 - 显示骨架屏
  if (loading) {
    return (
      <div className="space-y-8">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 animate-pulse"
          >
            {/* 骨架屏 UI */}
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mb-4" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
          </div>
        ))}
      </div>
    )
  }

  // 正常状态 - 显示故事列表
  return (
    <>
      <div className="space-y-8">
        {stories.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
      </div>
      {/* 分页组件 */}
      <Pagination currentPage={page} hasMore={hasMore} baseUrl={baseUrl} />
    </>
  )
}