"use client"

import { BlurHeading } from "@/components/ui/blur-heading"
import { PillButton } from "@/components/ui/pill-button"
import { ProjectShowcase, type ShowcaseItem } from "@/components/ui/project-showcase"

const ITEMS: ShowcaseItem[] = [
  {
    title: "Women Leading the Way",
    description:
      "Supporting women-led and disability-inclusive initiatives that create opportunities, strengthen livelihoods, and empower communities through meaningful participation in tourism.",
    image: "/images/impact-1.png",
  },
  {
    title: "Our Commitment to the Wild",
    description:
      "Promoting responsible tourism through ethical wildlife experiences, animal welfare standards, and conservation-focused partnerships that protect natural habitats.",
    image: "/images/impact-3.png",
  },
  {
    title: "From the Riverbed Up",
    description:
      "Investing in forest restoration, plastic recovery, clean energy, and carbon-conscious initiatives that help regenerate ecosystems and support long-term sustainability.",
    image: "/images/impact-2.png",
  },
]

export function ImpactSection() {
  return (
    <section id="impact" className="w-full bg-jasmine py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mb-12 flex items-end justify-between gap-6">
          <BlurHeading as="h2" className="text-3xl text-cinnamon md:text-[44px]" parts="Our Impact" />
          <PillButton variant="onLight" className="shrink-0">
            Learn More
          </PillButton>
        </div>

        <ProjectShowcase items={ITEMS} />
      </div>
    </section>
  )
}
