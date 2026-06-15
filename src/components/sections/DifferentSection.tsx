"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { BlurHeading, BlurText, type HeadingPart } from "@/components/ui/blur-heading"
import { cn } from "@/lib/utils"

interface Slide {
  title: string
  description: string
  image: string
}

/**
 * Section title parts, hoisted to a stable reference so the blur reveal fires
 * only once on scroll-in and does NOT replay when the slide index changes.
 */
const TITLE_PARTS: HeadingPart[] = [
  { text: "What makes us " },
  { text: "different", italic: true },
]

/**
 * Fixed min-height for the slide text block (heading + body copy), sized to the
 * LONGEST slide so the Prev / Next buttons never shift between slides. Copy
 * top-aligns within this space. Tune per breakpoint here as copy changes.
 */
const TEXT_BLOCK_MIN_H = "min-h-[248px] sm:min-h-[224px] md:min-h-[208px]"

const SLIDES: Slide[] = [
  {
    title: "Exclusive Experiences",
    description:
      "You will have access to some of the most special and unique experiences in Sri Lanka that'll make your trip extraordinary — from kayaking the Pekoe Trail to private dinners under the stars. Travel with the island's best adventure guides.",
    image: "/images/different-1.png",
  },
  {
    title: "Untouched Wilderness",
    description:
      "Venture into rainforests and tea country few travellers ever reach. Our naturalists open doors to private reserves where the wild still sets the pace, far from the well-trodden path.",
    image: "/images/different-2.png",
  },
  {
    title: "Crafted by Locals",
    description:
      "Every itinerary is shaped by the people who call this island home — chefs, weavers, monks and conservationists who turn a journey into a relationship that lasts long after you leave.",
    image: "/images/different-3.png",
  },
  {
    title: "Journeys with Meaning",
    description:
      "Travel that gives back. Each experience is designed to support local communities and protect the landscapes you came to see, so your story leaves the island better than you found it.",
    image: "/images/different-4.png",
  },
]

const N = SLIDES.length

/**
 * Depth styling for each card based on its position in the stack
 * (0 = front, increasing = further back). Cards peek down-and-right,
 * scale down, fade, and blur with depth. The deepest position is fully
 * transparent so the receding card fades out as it travels to the back
 * and the incoming card fades in — a circular shuffle.
 */
function cardStyle(pos: number): React.CSSProperties {
  const depth = [
    { x: 0, y: 0, scale: 1, opacity: 1, blur: 0, z: 40 },
    { x: 26, y: 24, scale: 0.95, opacity: 0.5, blur: 2, z: 30 },
    { x: 52, y: 48, scale: 0.9, opacity: 0.25, blur: 4, z: 20 },
  ]
  const back = { x: 66, y: 60, scale: 0.88, opacity: 0, blur: 6, z: 10 }
  const d = depth[pos] ?? back
  return {
    transform: `translate3d(${d.x}px, ${d.y}px, 0) scale(${d.scale})`,
    opacity: d.opacity,
    filter: `blur(${d.blur}px)`,
    zIndex: d.z,
    transition:
      "transform 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms cubic-bezier(0.4, 0, 0.2, 1), filter 600ms cubic-bezier(0.4, 0, 0.2, 1)",
  }
}

export function DifferentSection() {
  const [index, setIndex] = useState(0)
  const go = (dir: number) => setIndex((i) => (i + dir + N) % N)
  const active = SLIDES[index]

  return (
    <section id="inspiration" className="w-full bg-jasmine py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <BlurHeading
          as="h2"
          className="text-center text-3xl text-cinnamon md:text-[44px]"
          parts={TITLE_PARTS}
        />

        <div className="mt-16 grid items-center gap-12 md:mt-24 md:grid-cols-[40%_55%] md:justify-between md:gap-[5%]">
          {/* Left: numbered text + controls */}
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cane/40 text-sm text-cane">
                {index + 1}
              </span>
              <span className="h-px w-[60px] bg-cane/30" />
            </div>

            <div key={index} className={cn("flex flex-col", TEXT_BLOCK_MIN_H)}>
              <BlurHeading
                as="h3"
                className="mt-7 text-2xl text-cinnamon md:text-3xl"
                parts={active.title}
              />
              <BlurText
                as="p"
                className="mt-5 max-w-md text-sm leading-relaxed text-cane"
                parts={active.description}
                delay={0.1}
              />
            </div>

            <div className="mt-10 flex items-center gap-5">
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
              <span className="ml-2 text-xs tracking-widest text-cane/50">
                0{index + 1} / 0{N}
              </span>
            </div>
          </div>

          {/* Right: circular card-stack slider */}
          <div className="order-1 mb-16 md:order-2 md:mb-0">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px]">
              {SLIDES.map((s, i) => {
                const pos = (i - index + N) % N // 0 = front
                return (
                  <div
                    key={i}
                    className="absolute inset-0 overflow-hidden will-change-transform"
                    style={{
                      ...cardStyle(pos),
                      boxShadow:
                        pos === 0 ? "0 30px 60px -20px rgba(24,29,30,0.45)" : "none",
                    }}
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
