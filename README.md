# HN Reader

A modern, clean interface for reading Hacker News stories. Built with Next.js 15, Tailwind CSS, and shadcn/ui.

![HN Reader Light Mode](/public/preview-light.jpeg)
![HN Reader Dark Mode](/public/preview-dark.jpeg)

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

- [Next.js 15+](https://nextjs.org/) - React framework
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

## Roadmap

- [ ] Performance Optimization
  - Implement virtual scrolling for long lists
  - Add service worker for offline support
  - Optimize image loading and caching

- [ ] Feature Enhancements
  - Add search functionality
  - Implement user profiles
  - Add story bookmarking
  - Support for multiple languages

- [ ] Developer Experience
  - Add comprehensive testing
  - Improve error handling
  - Add performance monitoring
  - Enhance documentation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Hacker News](https://news.ycombinator.com/) for the API
- [Next.js](https://nextjs.org/) team for the amazing framework
- [shadcn](https://twitter.com/shadcn) for the beautiful UI components
- [Vercel](https://vercel.com) for the hosting platform
