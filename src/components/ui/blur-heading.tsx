"use client"

import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export interface HeadingPart {
  text: string
  italic?: boolean
}

type Unit = "char" | "word"

interface BlurRevealProps {
  /** Content as plain string, or segments where some are italic. */
  parts: string | HeadingPart[]
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "label"
  /** Reveal per character (headings) or per word (body copy). */
  unit?: Unit
  /** Use the display serif, or inherit the surrounding font. */
  font?: "display" | "inherit"
  delay?: number
  duration?: number
  stagger?: number
  /**
   * When set, the reveal waits for this window event (fired once) instead of
   * scroll-into-view — used to play the hero headline after the loader fades.
   */
  startEvent?: string
}

/**
 * Shared blur-to-sharp reveal. Characters/words start blurred, offset and
 * transparent, then settle into place with one continuous stagger when the
 * element scrolls into view. Words never break mid-word. Use "\n" to force a
 * line break. This is the site-wide text animation, used for headings AND body.
 */
const BlurReveal: React.FC<BlurRevealProps> = ({
  parts,
  className = "",
  as = "h2",
  unit = "char",
  font = "display",
  delay = 0,
  duration = 0.9,
  stagger = 0.022,
  startEvent,
}) => {
  const ref = useRef<HTMLElement>(null)
  const segments: HeadingPart[] =
    typeof parts === "string" ? [{ text: parts }] : parts

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    let removeListener: (() => void) | undefined
    const ctx = gsap.context(() => {
      const units = el.querySelectorAll<HTMLElement>(".reveal-unit")
      gsap.set(units, { opacity: 0, y: 16, filter: "blur(8px)" })
      const play = (extra?: gsap.TweenVars) =>
        gsap.to(units, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          ease: "power3.out",
          stagger,
          delay,
          clearProps: "filter,transform",
          ...extra,
        })

      if (startEvent) {
        // Wait for an external signal (e.g. loader finished) rather than scroll.
        const onSignal = () => play()
        window.addEventListener(startEvent, onSignal, { once: true })
        removeListener = () => window.removeEventListener(startEvent, onSignal)
      } else {
        play({ scrollTrigger: { trigger: el, start: "top 88%", once: true } })
      }
    }, el)
    return () => {
      removeListener?.()
      ctx.revert()
    }
  }, [parts, delay, duration, stagger, startEvent])

  const Tag = as as React.ElementType

  let key = 0
  const nodes: React.ReactNode[] = []

  segments.forEach((seg) => {
    const lines = seg.text.split("\n")
    lines.forEach((line, li) => {
      if (li > 0) nodes.push(<br key={`br-${key++}`} />)
      const tokens = line.split(/(\s+)/)
      tokens.forEach((token) => {
        if (token === "") return
        if (/^\s+$/.test(token)) {
          // A real, breakable space as a plain text node. (A space inside an
          // inline-block collapses to zero width — that caused words to run
          // together — so we must NOT wrap it.)
          nodes.push(<React.Fragment key={`sp-${key++}`}>{" "}</React.Fragment>)
        } else if (unit === "word") {
          // Animate the whole word as one unit.
          nodes.push(
            <span
              key={`w-${key++}`}
              className={cn("reveal-unit inline-block whitespace-nowrap", seg.italic && "italic")}
            >
              {token}
            </span>,
          )
        } else {
          // Animate per character, but keep the word non-breaking.
          nodes.push(
            <span
              key={`w-${key++}`}
              className={cn("inline-block whitespace-nowrap", seg.italic && "italic")}
            >
              {token.split("").map((char, ci) => (
                <span key={ci} className="reveal-unit inline-block">
                  {char}
                </span>
              ))}
            </span>,
          )
        }
      })
    })
  })

  return (
    <Tag ref={ref as never} className={cn(font === "display" && "font-display", className)}>
      {nodes}
    </Tag>
  )
}

/** Per-character serif reveal for headings. */
export const BlurHeading: React.FC<Omit<BlurRevealProps, "unit" | "font">> = (props) => (
  <BlurReveal unit="char" font="display" {...props} />
)

/* -------------------------------------------------------------------------- */
/*  Body copy animation — DISTINCT from headings.                             */
/*  Headings = blur reveal (above). Body copy = a slow, smooth                */
/*  fade-and-slide-up of the whole block (no per-word blur). Each block       */
/*  starts ~24px down and transparent, then eases up into place on scroll     */
/*  into view. Use `delay` to stagger sibling blocks (~0.1s apart).           */
/* -------------------------------------------------------------------------- */

interface FadeUpProps {
  parts: string | HeadingPart[]
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "label"
  delay?: number
  duration?: number
}

export const BlurText: React.FC<FadeUpProps> = ({
  parts,
  className = "",
  as = "p",
  delay = 0,
  duration = 0.9,
}) => {
  const ref = useRef<HTMLElement>(null)
  const segments: HeadingPart[] =
    typeof parts === "string" ? [{ text: parts }] : parts

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: 24 })
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        ease: "power2.out", // gentle ease-out, no bounce
        delay,
        clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [parts, delay, duration])

  const Tag = as as React.ElementType

  return (
    <Tag ref={ref as never} className={className}>
      {segments.map((seg, i) =>
        seg.italic ? (
          <span key={i} className="italic">
            {seg.text}
          </span>
        ) : (
          <React.Fragment key={i}>{seg.text}</React.Fragment>
        ),
      )}
    </Tag>
  )
}
