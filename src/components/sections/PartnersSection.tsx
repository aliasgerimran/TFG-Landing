"use client"

import { cn } from "@/lib/utils"
import { BlurHeading } from "@/components/ui/blur-heading"

/**
 * Partner logos from /images/logos. They show in their real form, visible by
 * default and emphasised on hover. A couple of the supplied files are
 * white-on-transparent (meant for dark backgrounds) and would vanish on this
 * light section, so those two are inverted to read as dark marks.
 */
const PARTNERS: { name: string; file: string; invert?: boolean }[] = [
  { name: "Luxury Travel Collection", file: "/images/logos/luxury-travel.png" },
  { name: "Virtuoso", file: "/images/logos/virtuoso.png" },
  { name: "Sanderson Phillips", file: "/images/logos/sanderson-phillips.png", invert: true },
  { name: "Serandipians", file: "/images/logos/serandipians.png" },
  { name: "The Conscious Travel Foundation", file: "/images/logos/conscious-travel.png" },
  { name: "PURE Life Experiences", file: "/images/logos/pure.png", invert: true },
]

export function PartnersSection() {
  return (
    <section id="partners" className="w-full bg-jasmine pb-28 pt-8">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <BlurHeading
          as="h2"
          className="text-center text-2xl text-cinnamon md:text-3xl"
          parts={[
            { text: "The " },
            { text: "assurance", italic: true },
            { text: " behind every trip" },
          ]}
        />

        <div className="mt-16 grid grid-cols-2 items-center gap-x-8 gap-y-14 sm:grid-cols-3 md:grid-cols-6 md:gap-x-6">
          {PARTNERS.map((p) => (
            <a
              key={p.name}
              href="#"
              title={p.name}
              className="group flex items-center justify-center"
            >
              <img
                src={p.file}
                alt={p.name}
                className={cn(
                  "h-[72px] w-auto max-w-[200px] object-contain opacity-80 transition-all duration-300 ease-out group-hover:scale-[1.04] group-hover:opacity-100",
                  p.invert && "invert",
                )}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
