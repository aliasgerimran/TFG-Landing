"use client"

import { BlurHeading } from "@/components/ui/blur-heading"
import { PillButton } from "@/components/ui/pill-button"

export function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background video — the TFG website reel, autoplaying, muted, looping */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay (Deep Earth) so the headline + buttons stay legible */}
      <div className="absolute inset-0 bg-earth/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-earth/35 via-earth/10 to-earth/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1320px] flex-col items-center justify-center px-6 text-center">
        <BlurHeading
          as="h1"
          startEvent="tfg:loader-complete"
          className="max-w-3xl text-balance text-[28px] leading-[1.18] text-jasmine sm:text-[34px] md:text-[42px]"
          parts={[
            { text: "Sri Lanka is the backdrop.\n" },
            { text: "The " },
            { text: "people", italic: true },
            { text: " are the story." },
          ]}
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <PillButton variant="onDark">Our People</PillButton>
          <PillButton variant="onDark">Who We Are</PillButton>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-cream/50 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-cream/80" />
        </div>
      </div>
    </section>
  )
}
