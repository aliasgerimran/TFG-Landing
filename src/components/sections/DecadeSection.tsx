"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { BlurHeading, BlurText } from "@/components/ui/blur-heading"
import { cn } from "@/lib/utils"

interface Slide {
  eyebrow: string
  body: string
  image: string
}

const SLIDES: Slide[] = [
  {
    eyebrow: "Culture from the inside",
    body: "Discover the hidden gems of Sri Lanka that are often overlooked by tourists. Venture beyond the usual spots and immerse yourself in the breathtaking landscapes and rich culture that await you.",
    image: "/images/culture.png",
  },
  {
    eyebrow: "Craft that endures",
    body: "From handloom weavers to spice gardens, meet the makers whose generational craft defines the island. Every encounter is a window into a living heritage we are proud to protect.",
    image:
      "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1600&auto=format&fit=crop",
  },
  {
    eyebrow: "Wild, untamed, alive",
    body: "Track leopards across Yala, drift through misty highlands and stand among ancient stupas. We design journeys that move at the rhythm of the island itself.",
    image:
      "https://images.unsplash.com/photo-1586183189334-1f0c6f3a8a06?q=80&w=1600&auto=format&fit=crop",
  },
]

export function DecadeSection() {
  const [index, setIndex] = useState(0)
  const slide = SLIDES[index]

  const go = (dir: number) =>
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length)

  return (
    <section className="relative w-full bg-ocean py-20 text-cream md:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 lg:px-10">
        {/* Left: text */}
        <div className="relative">
          <BlurHeading
            as="h2"
            className="max-w-md text-3xl leading-tight text-cream md:text-[40px]"
            parts="A decade of showcasing the island's finest."
          />

          {/* Rotating circular badge */}
          <div className="mt-12 mb-10">
            <img
              src="/images/badge-fabulous.png"
              alt="The Fabulous Getaway"
              className="h-20 w-20 animate-spin-slow opacity-90"
            />
          </div>

          <div key={index} className="max-w-md">
            <BlurText
              as="p"
              className="text-xs font-medium uppercase tracking-[0.25em] text-sand"
              parts={slide.eyebrow}
            />
            <BlurText
              as="p"
              className="mt-4 text-sm leading-relaxed text-cream/75"
              parts={slide.body}
              delay={0.1}
            />
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream/80 transition-colors hover:border-cream hover:text-jasmine"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream/80 transition-colors hover:border-cream hover:text-jasmine"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="ml-2 text-xs tracking-widest text-cream/50">
              0{index + 1} / 0{SLIDES.length}
            </span>
          </div>
        </div>

        {/* Right: image slider */}
        <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]">
          {SLIDES.map((s, i) => (
            <img
              key={i}
              src={s.image}
              alt={s.eyebrow}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
                i === index ? "scale-100 opacity-100" : "scale-105 opacity-0",
              )}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}
