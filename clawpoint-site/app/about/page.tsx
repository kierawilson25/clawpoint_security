'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function AboutPage() {
  const [eyesVisible, setEyesVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Predator eyes appearing
  useEffect(() => {
    setTimeout(() => setEyesVisible(true), 800)
  }, [])

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-black relative min-h-screen">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black z-50">
        <div
          className="h-full bg-gradient-to-r from-[var(--tactical-green)] via-[var(--night-vision)] to-[var(--tactical-green-light)] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background tactical grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(var(--tactical-green) 1px, transparent 1px), linear-gradient(90deg, var(--tactical-green) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/AdobeStock_241827782.jpeg"
            alt=""
            fill
            className="object-cover opacity-15 mix-blend-screen"
            priority
          />
        </div>

        {/* Predator eyes watching */}
        {eyesVisible && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-[10%] top-[25%] flex gap-6 predator-eyes-pulse" style={{ animationDelay: '0s' }}>
              <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full shadow-[0_0_15px_rgba(0,255,65,0.6)]" />
              <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full shadow-[0_0_15px_rgba(0,255,65,0.6)]" />
            </div>

            <div className="absolute right-[15%] top-[40%] flex gap-8 predator-eyes-pulse" style={{ animationDelay: '5s' }}>
              <div className="w-2.5 h-2.5 bg-[var(--night-vision)] rounded-full shadow-[0_0_20px_rgba(0,255,65,0.6)]" />
              <div className="w-2.5 h-2.5 bg-[var(--night-vision)] rounded-full shadow-[0_0_20px_rgba(0,255,65,0.6)]" />
            </div>
          </div>
        )}

        {/* Forest depth layers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-depth-3)] via-transparent to-[var(--forest-depth-2)] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-depth-1)] via-transparent to-transparent opacity-15" />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.9)_100%)]" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center py-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-mono tracking-wider stalk-in" style={{ animationDelay: '0.2s' }}>
            CLAWPOINT SECURITY
            <span className="block text-[var(--night-vision)] text-glow mt-3">
              COLLECTIVE
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-mono leading-relaxed stalk-in" style={{ animationDelay: '0.6s' }}>
            Mission-centric cybersecurity and operational assurance for federal and national security stakeholders
          </p>
        </div>
      </section>

      {/* Who We Are & Mission Section */}
      <section className="relative pt-14 pb-8 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="absolute inset-0 tactical-grid opacity-5" />

        <div className="absolute inset-0">
          <Image
            src="/images/AdobeStock_328406149.jpeg"
            alt=""
            fill
            className="object-cover opacity-10 mix-blend-lighten"
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="emerge-from-forest">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-xs tracking-widest">MISSION-01</span>
            </div>
            <h2 className="heading-h2 text-white mb-8">
              WHO WE ARE
            </h2>

            <p className="text-lg md:text-xl text-white font-mono leading-relaxed">
              Clawpoint Security Collective (CSC) is a mission-centric cybersecurity company built to deliver precision over panic—turning fragmented telemetry, complex risk, and operational uncertainty into actionable outcomes. CSC operates at the intersection of mission assurance, cyber resilience, and analyst enablement to reduce exposure while strengthening mission continuity.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--forest-depth-2)] to-black border-t border-[var(--tactical-green-dark)]">
        <div className="absolute inset-0 tactical-grid opacity-5" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16 emerge-from-forest text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-xs tracking-widest">LEADERSHIP-02</span>
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
            </div>
            <h2 className="heading-h2 text-white mb-6">
              MEET THE TEAM
            </h2>
            <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed max-w-3xl mx-auto">
              Mission-focused leaders with deep expertise in federal cybersecurity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Will Smith - Founder & CEO */}
            <article className="relative group stalk-in" style={{ animationDelay: '0.1s' }}>
              <div className="credential-shine border-2 border-[var(--tactical-green-dark)] bg-black/80 backdrop-blur-sm relative overflow-hidden hover:border-[var(--night-vision)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                {/* Headshot */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/images/headshots/will-smith.jpg"
                    alt="Will Smith"
                    fill
                    className="object-cover transition-all duration-500"
                    unoptimized
                  />
                  {/* Tactical overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white font-mono mb-2 tracking-wide">
                    Will Smith
                  </h3>
                  <p className="text-[var(--night-vision)] font-mono text-sm font-bold mb-3">
                    Founder & CEO
                  </p>
                  <div className="w-16 h-px bg-[var(--tactical-green)] mx-auto opacity-50" />
                </div>

                {/* Tactical corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </article>

            {/* Dr. Edgar Carmenatty */}
            <article className="relative group stalk-in" style={{ animationDelay: '0.2s' }}>
              <div className="credential-shine border-2 border-[var(--tactical-green-dark)] bg-black/80 backdrop-blur-sm relative overflow-hidden hover:border-[var(--night-vision)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                {/* Headshot */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/images/headshots/edgar-carmenatty.png"
                    alt="Dr. Edgar Carmenatty"
                    fill
                    className="object-cover object-top transition-all duration-500"
                    unoptimized
                  />
                  {/* Tactical overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white font-mono mb-2 tracking-wide">
                    Dr. Edgar Carmenatty
                  </h3>
                  <p className="text-[var(--night-vision)] font-mono text-sm font-bold mb-3">
                    Principal Cyber Security Consultant
                  </p>
                  <div className="w-16 h-px bg-[var(--tactical-green)] mx-auto opacity-50" />
                </div>

                {/* Tactical corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </article>

            {/* Charles Walker */}
            <article className="relative group stalk-in" style={{ animationDelay: '0.3s' }}>
              <div className="credential-shine border-2 border-[var(--tactical-green-dark)] bg-black/80 backdrop-blur-sm relative overflow-hidden hover:border-[var(--night-vision)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                {/* Headshot */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/images/headshots/charles-walker.png"
                    alt="Charles Walker"
                    fill
                    className="object-cover transition-all duration-500"
                    unoptimized
                  />
                  {/* Tactical overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white font-mono mb-2 tracking-wide">
                    Charles Walker
                  </h3>
                  <p className="text-[var(--night-vision)] font-mono text-sm font-bold mb-3">
                    Director, Mission Capture
                  </p>
                  <div className="w-16 h-px bg-[var(--tactical-green)] mx-auto opacity-50" />
                </div>

                {/* Tactical corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="absolute inset-0">
          <Image
            src="/images/AdobeStock_241827782.jpeg"
            alt=""
            fill
            className="object-cover opacity-10 mix-blend-screen"
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-12 emerge-from-forest">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-xs tracking-widest">CAPABILITIES-03</span>
            </div>
            <h2 className="heading-h2 text-white mb-6">
              WHAT WE DO
            </h2>
            <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed mb-8">
              Clawpoint Security Collective partners with mission-critical organizations to:
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                num: '01',
                title: 'Surface enterprise risk that undermines operational effectiveness',
                delay: '0.1s'
              },
              {
                num: '02',
                title: 'Accelerate leadership decisions with context and confidence',
                delay: '0.2s'
              },
              {
                num: '03',
                title: 'Fortify mission continuity against dynamic threats',
                delay: '0.3s'
              }
            ].map((item, i) => (
              <article key={i} className="relative group stalk-in" style={{ animationDelay: item.delay }}>
                <div className="credential-shine flex items-start gap-6 border-l-4 border-[var(--tactical-green)] pl-6 py-6 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                  <div className="flex-shrink-0">
                    <div className="text-3xl md:text-4xl font-bold text-[var(--night-vision)]/20 font-mono">
                      {item.num}
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 p-6 border border-[var(--tactical-green-dark)] bg-black/60">
            <p className="text-sm md:text-base text-gray-400 font-mono leading-relaxed italic">
              We combine operational experience, risk-informed methodologies, and a human-centered approach to secure the mission—not just infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Track Record Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="absolute inset-0 tactical-grid opacity-5" />

        <div className="absolute inset-0">
          <Image
            src="/images/AdobeStock_328406149.jpeg"
            alt=""
            fill
            className="object-cover opacity-10 mix-blend-lighten"
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-12 emerge-from-forest">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-xs tracking-widest">TRACK RECORD</span>
            </div>
            <h2 className="heading-h2 text-white mb-6">
              PROVEN PERFORMANCE
            </h2>
            <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed mb-8">
              Our operational track record demonstrates mission success at scale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Metric 1: Privileged Accounts */}
            <article className="relative group stalk-in border-2 border-[var(--tactical-green-dark)] bg-black/60 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] transition-all duration-500" style={{ animationDelay: '0.1s' }}>
              <div className="credential-shine relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />
                <div className="text-5xl md:text-6xl font-bold text-[var(--night-vision)] font-mono mb-4">
                  22,000
                </div>
                <p className="text-base text-gray-300 font-mono leading-relaxed">
                  Privileged accounts secured
                </p>
              </div>
            </article>

            {/* Metric 2: Authorization Delivery */}
            <article className="relative group stalk-in border-2 border-[var(--tactical-green-dark)] bg-black/60 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] transition-all duration-500" style={{ animationDelay: '0.2s' }}>
              <div className="credential-shine relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />
                <div className="text-3xl md:text-4xl font-bold text-[var(--night-vision)] font-mono mb-4 relative">
                  ACCELERATED
                </div>
                <p className="text-base text-gray-300 font-mono leading-relaxed relative">
                  Authorization delivery across multiple enclaves
                </p>
              </div>
            </article>

            {/* Metric 3: Mission Assurance */}
            <article className="relative group stalk-in border-2 border-[var(--tactical-green-dark)] bg-black/60 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] transition-all duration-500" style={{ animationDelay: '0.3s' }}>
              <div className="credential-shine relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />
                <div className="text-3xl md:text-4xl font-bold text-[var(--night-vision)] font-mono mb-4 uppercase">
                  Mission Assurance
                </div>
                <p className="text-base text-gray-300 font-mono leading-relaxed">
                  Bridging compliance and operational reality
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

    </div>
  )
}
