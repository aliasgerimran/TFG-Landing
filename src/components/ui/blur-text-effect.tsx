"use client"

import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface BlurTextEffectProps {
  children: string
  className?: string
  /** Render as a block-level element instead of inline. */
  as?: "span" | "div"
  /** Delay (seconds) before the reveal begins once in view. */
  delay?: number
}

/**
 * Reveals text with a staggered blur-to-sharp fade.
 * Fires when the element scrolls into view (GSAP ScrollTrigger),
 * not just on mount — reused for headings site-wide.
 */
export const BlurTextEffect: React.FC<BlurTextEffectProps> = ({
  children,
  className = "",
  as = "span",
  delay = 0,
}) => {
  const containerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const chars = el.querySelectorAll<HTMLElement>("span.char")
      gsap.set(chars, { opacity: 0, y: 12, filter: "blur(8px)" })

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.02,
        delay,
        clearProps: "filter,transform",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [children, delay])

  const Tag = as as React.ElementType

  return (
    <Tag className={`inline-block ${className}`} ref={containerRef as never}>
      {children.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="char inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </Tag>
  )
}
