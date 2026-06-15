"use client"

import { ArrowRight, Facebook, Instagram, Linkedin, Youtube, Music2 } from "lucide-react"
import { BlurHeading, BlurText } from "@/components/ui/blur-heading"

const INFORMATION = ["Inspiration", "About Us", "Team", "Impact", "Partners", "Journal"]
const COMPANY = ["Privacy policy", "Terms & conditions", "Payment structure"]
const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "YouTube" },
  { icon: Music2, label: "TikTok" },
]

export function Footer() {
  return (
    <footer className="w-full bg-cream text-cinnamon">
      <div className="mx-auto max-w-[1320px] px-6 py-20 lg:px-10">
        {/* Newsletter */}
        <div className="grid items-center gap-10 border-b border-cane/20 pb-16 md:grid-cols-2">
          <BlurHeading
            as="h2"
            className="max-w-md text-3xl leading-tight text-cinnamon md:text-[40px]"
            parts={[
              { text: "Stay updated and be a part of our " },
              { text: "community", italic: true },
            ]}
          />
          <div>
            <BlurText
              as="label"
              className="block text-xs font-medium uppercase tracking-[0.2em] text-cane"
              parts="Subscribe to our Newsletter"
            />
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-3 rounded-full border border-cane/40 bg-jasmine/40 px-6 py-3 transition-colors focus-within:border-cinnamon"
            >
              <input
                type="email"
                required
                placeholder="Your Email"
                className="w-full bg-transparent text-sm text-cinnamon placeholder:text-cane/70 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean text-jasmine transition-colors hover:bg-cinnamon"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Monogram — brand footer logo (Cane on transparent) */}
          <div>
            <img
              src="/images/logo-footer.png"
              alt="The Fabulous Getaway"
              className="h-28 w-auto md:h-32"
            />
          </div>

          <FooterColumn title="Information" links={INFORMATION} />
          <FooterColumn title="Company" links={COMPANY} />

          {/* Request a meeting */}
          <div>
            <h4 className="text-sm font-semibold text-cinnamon">Request a Meeting</h4>
            <div className="mt-5 space-y-1.5 text-sm text-cane">
              <p>+1 (999) 999-99-99</p>
              <p>
                <a href="https://tfg.travel" className="underline underline-offset-4 hover:text-cinnamon">
                  tfg.travel
                </a>
              </p>
              <p>
                <a href="mailto:email@tfg.travel" className="underline underline-offset-4 hover:text-cinnamon">
                  email@tfg.travel
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-6 border-t border-cane/20 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cane/40 text-cane transition-colors hover:border-cinnamon hover:bg-cinnamon hover:text-jasmine"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-cane">
            140 A, Vauxhall Street,
            <br className="hidden md:block" /> Colombo 2, Sri Lanka.
          </p>

          <p className="text-xs text-cane/70">© Copyright 2026 | thefabulousgetaway</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-cane/70">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-cinnamon transition-colors hover:text-cane">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
