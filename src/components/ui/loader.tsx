"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"

/**
 * Page-load intro screen. The Fabulous Getaway wordmark sits centred on a dark
 * field, rendered as a CSS mask: a Cream Linen "empty" logo with a Night Blue
 * fill that rises up to fill the logo shape as the page loads. When ready, the
 * whole loader fades out smoothly to reveal the site.
 */
export function Loader() {
  const [done, setDone] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  // Logo aspect ratio (3224 x 1491 ≈ 2.162:1)
  const logoMask: React.CSSProperties = {
    WebkitMaskImage: "url(/images/logo-header.png)",
    maskImage: "url(/images/logo-header.png)",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  }

  useLayoutEffect(() => {
    // Lock scroll while the loader is visible.
    document.body.style.overflow = "hidden"

    const finish = () => {
      document.body.style.overflow = ""
      setDone(true)
    }

    const tl = gsap.timeline()
    tl.fromTo(
      fillRef.current,
      { height: "0%" },
      { height: "100%", duration: 1.9, ease: "power2.inOut" },
    )
      // hold the full logo briefly
      .to({}, { duration: 0.35 })
      // fade the whole loader away
      .to(rootRef.current, { opacity: 0, duration: 0.7, ease: "power2.out", onComplete: finish })

    // Guaranteed unmount so the overlay can never linger and block the page.
    const fallback = window.setTimeout(finish, 4200)

    return () => {
      window.clearTimeout(fallback)
      tl.kill()
    }
  }, [])

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-earth"
    >
      <div className="flex flex-col items-center">
        {/* Masked logo: cream base + rising night-blue fill */}
        <div className="relative h-[150px] w-[330px] sm:h-[170px] sm:w-[370px]" style={logoMask}>
          <div className="absolute inset-0 bg-cream" />
          <div ref={fillRef} className="absolute inset-x-0 bottom-0 h-0 bg-night" />
        </div>

        {/* Supporting text */}
        <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.4em] text-cream/70">
          Curating Sri Lanka&rsquo;s finest
        </p>
      </div>
    </div>
  )
}
