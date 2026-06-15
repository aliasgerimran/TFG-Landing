"use client"

import React from "react"
import { cn } from "@/lib/utils"

/**
 * Pill button — two variants chosen by the background they sit on. They are
 * exact inverses of each other, and hovering either makes it look like the
 * other (smooth 300ms ease-out transition on both background and text color).
 *
 *  - "onDark"  (for dark backgrounds: hero, Our Journal):
 *      default  Cream Linen #E7DFD8 fill / Deep Ocean #38424C text
 *      hover    Deep Ocean #38424C fill / Cream Linen #E7DFD8 text
 *  - "onLight" (for light backgrounds: Our Impact "Learn More"):
 *      default  Deep Ocean #38424C fill / Cream Linen #E7DFD8 text
 *      hover    Cream Linen #E7DFD8 fill / Deep Ocean #38424C text
 */
type Variant = "onDark" | "onLight"

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export const PillButton = React.forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ variant = "onLight", className, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean/40 focus-visible:ring-offset-2"

    const variants: Record<Variant, string> = {
      onDark: "bg-cream text-ocean hover:bg-ocean hover:text-cream",
      onLight: "bg-ocean text-cream hover:bg-cream hover:text-ocean",
    }

    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
        {children}
      </button>
    )
  },
)
PillButton.displayName = "PillButton"
