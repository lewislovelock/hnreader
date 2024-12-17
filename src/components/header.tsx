"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "new", href: "/new" },
  { name: "past", href: "/past" },
  { name: "comments", href: "/comments" },
  { name: "ask", href: "/ask" },
  { name: "show", href: "/show" },
  { name: "jobs", href: "/jobs" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-12 sm:h-14 items-center">
          <div className="flex-1 flex items-center">
            <Link
              href="/"
              className="text-base sm:text-xl font-semibold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors mr-4 sm:mr-8"
            >
              HN Reader
            </Link>
            <nav className="flex items-center space-x-2 sm:space-x-6 overflow-x-auto scrollbar-none">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-xs sm:text-sm whitespace-nowrap transition-colors py-1",
                    pathname === item.href
                      ? "text-zinc-900 dark:text-white font-medium"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
} 