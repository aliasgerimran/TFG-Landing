"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = ["About", "Inspiration", "Team", "Impact", "Partners", "Journal"]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-cane/15 bg-jasmine/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo — cream brand mark; inverts to a dark on-brand tone on the cream bar */}
        <a href="#top" className="flex items-center">
          <img
            src="/images/logo-header.png"
            alt="The Fabulous Getaway"
            className={cn(
              "h-9 w-auto transition-[filter,opacity] duration-500 md:h-10",
              scrolled ? "invert" : "invert-0",
            )}
          />
        </a>

        {/* Center nav */}
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "group relative text-sm font-medium tracking-wide transition-colors duration-300",
                scrolled ? "text-cinnamon/80 hover:text-cinnamon" : "text-cream/90 hover:text-jasmine",
              )}
            >
              {item}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Agent Portal */}
        <div className="flex items-center gap-3">
          <button
            className="hidden rounded-full bg-ocean px-6 py-2.5 text-sm font-medium tracking-wide text-jasmine transition-colors duration-300 hover:bg-cinnamon sm:inline-flex"
          >
            Agent Portal
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
              scrolled ? "text-cinnamon" : "text-jasmine",
            )}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-cane/15 bg-jasmine/95 px-6 py-4 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-3">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-cinnamon/80"
              >
                {item}
              </a>
            ))}
            <button className="mt-2 self-start rounded-full bg-ocean px-6 py-2.5 text-sm font-medium text-jasmine">
              Agent Portal
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
