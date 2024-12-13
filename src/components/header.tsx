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
    <header className="fixed top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-xl font-semibold text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              HN Reader
            </Link>
            <nav className="flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors",
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
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
} 