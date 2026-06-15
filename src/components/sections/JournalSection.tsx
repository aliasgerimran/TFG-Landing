"use client"

import { ArrowUpRight } from "lucide-react"
import { BlurHeading, BlurText } from "@/components/ui/blur-heading"
import { PillButton } from "@/components/ui/pill-button"

interface Article {
  title: string
  blurb: string
  image: string
}

const ARTICLES: Article[] = [
  {
    title: "A Journey Woven with Purpose",
    blurb:
      "The story of Sri Lanka's only fair-trade certified handloom company over the past 30 years.",
    image: "/images/journal-1.png",
  },
  {
    title: "Saving Elephants by Helping People",
    blurb:
      "Elephants have played a significant part in Sri Lanka's history, culture and religion for centuries.",
    image: "/images/journal-2.png",
  },
  {
    title: "From Paradise, With Love: The Story of Ceylon Soap Company",
    blurb:
      "Nestled in the lush, tropical heart of Sri Lanka, Ceylon Soap Company was born.",
    image: "/images/journal-3.png",
  },
]

export function JournalSection() {
  return (
    <section id="journal" className="relative w-full bg-night py-24 text-cream md:py-32">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mb-14 flex items-center justify-between gap-6">
          <BlurHeading as="h2" className="text-3xl text-cream md:text-[44px]" parts="Our Journal" />

          <div className="flex items-center gap-6">
            {/* Exclusive Experience badge — kept exactly as-is, gently rotating */}
            <img
              src="/images/badge-exclusive.png"
              alt="Exclusive Experience — The Fabulous Getaway"
              className="hidden h-20 w-20 opacity-90 sm:block"
            />
            <PillButton variant="onDark" className="shrink-0">
              Read All
            </PillButton>
          </div>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {ARTICLES.map((a) => (
            <article key={a.title} className="group cursor-pointer">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth/50 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <BlurHeading
                  as="h3"
                  className="text-lg leading-snug text-cream transition-colors group-hover:text-jasmine"
                  parts={a.title}
                />
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-sand transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-jasmine" />
              </div>
              <BlurText
                as="p"
                className="mt-2 text-sm leading-relaxed text-cream/60"
                parts={a.blurb}
                delay={0.1}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
