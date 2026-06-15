"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { BlurHeading, BlurText } from "@/components/ui/blur-heading"
import { cn } from "@/lib/utils"

interface Testimonial {
  lead: string
  body: string
  author: string
  role: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    lead: "Their approach balances exceptional guest experiences with responsible environmental stewardship.",
    body: "Every initiative is carefully considered, creating benefits for both local communities and the ecosystems they depend on.",
    author: "Amara Fernando",
    role: "Conde Nast Traveller",
  },
  {
    lead: "The most thoughtfully designed journey we have ever taken — seamless, intimate and deeply human.",
    body: "From the first call to the final farewell, every detail felt personal. We left with friendships, not just photographs.",
    author: "James & Priya Reuben",
    role: "Private Clients",
  },
  {
    lead: "A rare operator that treats sustainability as the starting point, not an afterthought.",
    body: "They proved that luxury and conscience can travel together — and raised the bar for the entire region.",
    author: "Eleanor Voss",
    role: "PURE Life Experiences",
  },
]

const N = TESTIMONIALS.length

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const go = (dir: number) => setIndex((i) => (i + dir + N) % N)

  return (
    <section className="w-full bg-jasmine py-24 md:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-6 md:grid-cols-2 md:gap-20 lg:px-10">
        {/* Left: intro */}
        <div>
          <BlurHeading
            as="h2"
            className="text-3xl leading-tight text-cinnamon md:text-[42px]"
            parts={[
              { text: "Discover the " },
              { text: "experiences", italic: true },
              { text: " that shape our story" },
            ]}
          />
          <BlurText
            as="p"
            className="mt-7 max-w-md text-sm leading-relaxed text-cane"
            delay={0.1}
            parts="As leaders in Sri Lankan luxury and experiential travel, The Fabulous Getaway is dedicated to creating unforgettable journeys throughout the island. Our commitment to excellence ensures that every experience is tailored to meet the unique desires of our travelers."
          />
        </div>

        {/* Right: quote slider */}
        <div>
          <div className="relative h-[280px] overflow-hidden md:h-[260px]">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={i}
                className={cn(
                  "absolute inset-0 flex flex-col bg-cream p-8 transition-all duration-700 ease-out md:p-10",
                  i === index
                    ? "translate-x-0 opacity-100"
                    : "pointer-events-none translate-x-6 opacity-0",
                )}
              >
                <span
                  aria-hidden="true"
                  className="select-none font-display text-[80px] font-bold leading-[0.7] text-cane"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-5">
                  <p className="text-[15px] leading-relaxed text-cinnamon">{t.lead}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-cane">{t.body}</p>
                </blockquote>
              </figure>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-end gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cane/30 text-cane transition-colors hover:border-cinnamon hover:text-cinnamon"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cane/30 text-cane transition-colors hover:border-cinnamon hover:text-cinnamon"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
