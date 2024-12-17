"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex h-12 sm:h-14 items-center justify-between sm:justify-start">
          {/* Logo/Title */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.webp"
              alt="HN Reader"
              width={28}
              height={28}
              className="hidden sm:block w-6 h-6 sm:w-7 sm:h-7"
            />
            <span className="text-sm font-semibold text-zinc-900 dark:text-white sm:ml-2">
              HN Reader
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center space-x-6 ml-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm whitespace-nowrap transition-colors",
                  pathname === item.href
                    ? "text-zinc-900 dark:text-white font-medium"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:ml-auto">
            <ThemeToggle />
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-all"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 transition-transform duration-200"
                style={{
                  transform: isMenuOpen ? 'rotate(90deg)' : 'none'
                }}
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "sm:hidden fixed inset-x-0 top-12 bottom-0 bg-white dark:bg-zinc-900 transition-all duration-200 ease-in-out",
            isMenuOpen 
              ? "translate-y-0 opacity-100" 
              : "translate-y-2 opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col p-3 overflow-y-auto max-h-[calc(100vh-3rem)]">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm px-4 py-3 rounded-lg transition-all duration-200",
                  pathname === item.href
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
} 