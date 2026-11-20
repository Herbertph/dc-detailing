import { MotionConfig } from 'framer-motion'
import { useState } from 'react'
import { AboutSection } from './components/AboutSection'
import { BookingForm, type BookingPrefill } from './components/BookingForm'
import { Footer } from './components/Footer'
import { GallerySection } from './components/GallerySection'
import { Hero } from './components/Hero'
import { MobileCallFloat } from './components/MobileCallFloat'
import { Navbar } from './components/Navbar'
import { PackagesSection } from './components/PackagesSection'
import { ReviewsSection } from './components/ReviewsSection'
import { ServiceSplit } from './components/ServiceSplit'
import { TopBar } from './components/TopBar'
import { TrustBar } from './components/TrustBar'
import type { VehicleSize } from './data/detailingData'

export default function App() {
  const [size, setSize] = useState<VehicleSize>('sedan')
  const [prefill, setPrefill] = useState<BookingPrefill | null>(null)

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="pb-16 md:pb-0">
        <TopBar />
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <PackagesSection
            size={size}
            onSizeChange={setSize}
            onSelectPackage={(packageId) => setPrefill({ packageId, vehicleType: size, nonce: Date.now() })}
          />
          <GallerySection />
          <ServiceSplit />
          <ReviewsSection />
          <AboutSection />
          <BookingForm prefill={prefill} />
        </main>
        <Footer />
        <MobileCallFloat />
      </div>
    </MotionConfig>
  )
}
