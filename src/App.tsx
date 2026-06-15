import { Loader } from "@/components/ui/loader"
import { Header } from "@/components/sections/Header"
import { Hero } from "@/components/sections/Hero"
import { DecadeSection } from "@/components/sections/DecadeSection"
import { DifferentSection } from "@/components/sections/DifferentSection"
import { ImpactSection } from "@/components/sections/ImpactSection"
import { JournalSection } from "@/components/sections/JournalSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { PartnersSection } from "@/components/sections/PartnersSection"
import { Footer } from "@/components/sections/Footer"

export default function App() {
  return (
    <div className="min-h-screen bg-jasmine">
      <Loader />
      <Header />
      <main>
        <Hero />
        <DecadeSection />
        <DifferentSection />
        <ImpactSection />
        <JournalSection />
        <TestimonialsSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  )
}
