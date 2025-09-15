import React from 'react'
import CertificationsCarousel from './CertificationsCarousel'

export default function Hero({ onCta }) {
  return (
    <section className="hero-section">
      <CertificationsCarousel onCta={onCta} />
    </section>
  )
}
