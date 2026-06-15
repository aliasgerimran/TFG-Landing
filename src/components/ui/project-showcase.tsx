"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ShowcaseItem {
  title: string
  description: string
  image: string
}

interface ProjectShowcaseProps {
  items: ShowcaseItem[]
}

/**
 * Hover-to-reveal showcase: hovering a row pops up its image (which trails the
 * cursor with an eased lerp), draws an animated underline under the title,
 * slides an arrow in, and highlights the row. Used for the "Our Impact" rows.
 */
export function ProjectShowcase({ items }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [inView, setInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  // Reveal each row one by one (slide up + fade) when the section scrolls in.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }
  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full">
      {/* Floating image that trails the cursor */}
      <div
        className="pointer-events-none fixed z-40 hidden overflow-hidden shadow-2xl md:block"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 110}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.85,
          transition:
            "opacity 0.4s cubic-bezier(0.4,0,0.2,1), scale 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="relative h-[210px] w-[300px] overflow-hidden bg-cream">
          {items.map((item, index) => (
            <img
              key={item.title}
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.1,
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-earth/25 to-transparent" />
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-0">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="group block cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition:
                "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
              transitionDelay: `${index * 0.12}s`,
            }}
          >
            <div className="relative border-t border-cane/25 py-10 transition-all duration-300 ease-out">
              {/* Row highlight */}
              <div
                className={cn(
                  "absolute inset-0 -mx-6 bg-cream/60 transition-all duration-300 ease-out",
                  hoveredIndex === index
                    ? "scale-100 rounded-none opacity-100"
                    : "scale-95 rounded-lg opacity-0",
                )}
              />

              <div className="relative grid grid-cols-1 items-start gap-4 md:grid-cols-[0.9fr_1.1fr_auto] md:gap-10">
                {/* Title + animated underline */}
                <div className="inline-flex items-center gap-2">
                  <h3
                    className={cn(
                      "text-xl font-medium tracking-tight transition-colors duration-300 md:text-2xl",
                      hoveredIndex === index ? "text-cinnamon" : "text-cane/70",
                    )}
                  >
                    <span className="relative">
                      {item.title}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-px bg-cinnamon transition-all duration-300 ease-out",
                          hoveredIndex === index ? "w-full" : "w-0",
                        )}
                      />
                    </span>
                  </h3>
                </div>

                {/* Description */}
                <p
                  className={cn(
                    "max-w-md text-sm leading-relaxed transition-colors duration-300 md:text-[15px]",
                    hoveredIndex === index ? "text-cinnamon/80" : "text-cane/50",
                  )}
                >
                  {item.description}
                </p>

                {/* Sliding arrow */}
                <div className="hidden items-center justify-end md:flex">
                  <ArrowRight
                    className={cn(
                      "h-5 w-5 transition-all duration-300 ease-out",
                      hoveredIndex === index
                        ? "translate-x-0 text-cinnamon opacity-100"
                        : "-translate-x-2 text-cane/40 opacity-70",
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-cane/25" />
      </div>
    </div>
  )
}
