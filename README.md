# HN Reader

A modern, clean interface for reading Hacker News stories. Built with Next.js 13+, Tailwind CSS, and shadcn/ui.

![HN Reader Screenshot](/public/screenshot.png)

## Features

- 🎨 Modern, clean UI inspired by Notion/Typora
- 🌓 Dark mode support
- 📱 Fully responsive design
- ⚡ Server-side rendering for optimal performance
- 🔄 Real-time data from Hacker News API
- 💬 Nested comments with collapsible threads
- 🔍 Sort comments by time or number of replies
- 📄 Pagination support
- ⚡ Optimistic loading states
- 🔄 Automatic retries for failed requests

## Tech Stack

- [Next.js 13+](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [date-fns](https://date-fns.org/) - Date formatting
- [Hacker News API](https://github.com/HackerNews/API) - Data source

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/lewislovelock/hnreader.git
   cd hnreader
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page (top stories)
│   ├── new/              # New stories
│   ├── ask/              # Ask HN
│   ├── show/             # Show HN
│   ├── jobs/             # Jobs
│   └── item/[id]/        # Story detail pages
├── components/            # React components
│   ├── comment.tsx       # Comment component
│   ├── comment-list.tsx  # Comment list with sorting
│   ├── header.tsx        # Navigation header
│   ├── story-item.tsx    # Story card component
│   └── story-list.tsx    # Story list with pagination
└── lib/                  # Utilities and API
    └── hn/               # Hacker News API integration
```

## Features in Detail

### Story Lists
- View top, new, ask, show, and job stories
- Pagination with 30 items per page
- Clean card layout with essential information

### Story Detail
- Full story content with external links
- Nested comments with collapsible threads
- Comment sorting by time or number of replies
- Lazy loading of comment replies

### UI/UX
- Dark mode support with system preference detection
- Loading states with skeleton placeholders
- Error handling with retry options
- Responsive design for all screen sizes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

以下是计划中的改进：

### 性能优化
- [ ] 使用React.memo优化组件重渲染
- [ ] 实现虚拟滚动以优化长列表性能
- [ ] 优化图片和资源加载
- [ ] 实现组件懒加载
- [ ] 添加性能监控和分析

### 可访问性优化
- [ ] 添加适当的ARIA属性
- [ ] 改进键盘导航体验
- [ ] 增强屏幕阅读器支持
- [ ] 实现高对比度主题
- [ ] 添加跳过导航链接

### 移动端优化 ✅
- [x] 优化小屏幕设备的UI布局
- [x] 优化移动端的字体大小和间距

### 功能增强
- [ ] 添加用户偏好设置
- [ ] 实现故事收藏功能
- [ ] 添加搜索功能
- [ ] 支持多语言本地化
- [ ] 添加阅读进度保存
- [ ] 实现PWA支持

### 开发体验
- [ ] 添加单元测试和集成测试
- [ ] 改进错误处理和日志记录
- [ ] 优化构建和部署流程
- [ ] 完善开发文档

## Acknowledgments

- [Hacker News](https://news.ycombinator.com/) for the API
- [Next.js](https://nextjs.org/) team for the amazing framework
- [shadcn](https://twitter.com/shadcn) for the beautiful UI components
- [Vercel](https://vercel.com) for the hosting platform
