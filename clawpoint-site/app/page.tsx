'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import CTAButton from '@/components/CTAButton'
import DownloadBrief from '@/components/DownloadBrief'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [eyesVisible, setEyesVisible] = useState(false)
  const stalkerRef = useRef<HTMLDivElement>(null)

  // Subtle eyes appearing in background
  useEffect(() => {
    setTimeout(() => setEyesVisible(true), 500)
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

  // Stalker element that follows cursor (breaking fourth wall)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (stalkerRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20
        const y = (e.clientY / window.innerHeight - 0.5) * 20
        stalkerRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="bg-black relative">

      {/* Progress indicator - hunt progression */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black z-50">
        <div
          className="h-full bg-gradient-to-r from-[var(--tactical-green)] via-[var(--night-vision)] to-[var(--tactical-green-light)] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Stalker element - follows cursor */}
      <div
        ref={stalkerRef}
        className="fixed top-1/2 left-1/2 w-2 h-2 bg-[var(--night-vision)] rounded-full opacity-20 pointer-events-none z-40 stalker-element blur-sm"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image - green particle waves */}
        <div className="absolute inset-0">
          <Image
            src="/images/AdobeStock_241827782.jpeg"
            alt=""
            fill
            className="object-cover opacity-20 mix-blend-screen"
            priority
          />
        </div>

        {/* Parallax forest layers - stalking through the undergrowth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="forest-layer forest-layer-1 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-depth-3)] via-[var(--forest-depth-2)] to-transparent" />
          </div>

          <div className="forest-layer forest-layer-2 opacity-15">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-depth-2)] via-[var(--forest-depth-1)] to-transparent" />
          </div>

          <div className="forest-layer forest-layer-3 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-depth-1)] to-transparent" />
          </div>

          {/* Mysterious forest shapes - appearing and disappearing like moving through foliage */}
          <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-[var(--forest-depth-2)] to-transparent cheshire-element opacity-20" style={{ animationDelay: '0s' }} />
          <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-[var(--forest-depth-3)] to-transparent cheshire-element opacity-25" style={{ animationDelay: '3s' }} />
          <div className="absolute left-1/4 bottom-0 w-1/2 h-2/3 bg-gradient-to-t from-[var(--forest-depth-1)] to-transparent cheshire-element opacity-15" style={{ animationDelay: '6s' }} />
        </div>

        {/* Additional green particles floating */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="green-particle absolute top-[10%] left-[15%] w-2 h-2 bg-[var(--night-vision)] rounded-full opacity-40 blur-sm" />
          <div className="green-particle absolute top-[25%] right-[20%] w-3 h-3 bg-[var(--night-vision)] rounded-full opacity-30 blur-sm" style={{ animationDelay: '2s' }} />
          <div className="green-particle absolute bottom-[30%] left-[30%] w-2.5 h-2.5 bg-[var(--night-vision)] rounded-full opacity-35 blur-sm" style={{ animationDelay: '4s' }} />
          <div className="green-particle absolute bottom-[50%] right-[25%] w-2 h-2 bg-[var(--night-vision)] rounded-full opacity-25 blur-sm" style={{ animationDelay: '6s' }} />
        </div>

        {/* Predator eyes watching from the darkness - Appearing and disappearing */}
        {eyesVisible && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Eyes slowly fade in and out - only 1-2 pairs visible at a time */}

            <div className="absolute left-[15%] top-[30%] flex gap-6 predator-eyes-pulse" style={{ animationDelay: '0s' }}>
              <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full shadow-[0_0_15px_rgba(0,255,65,0.6)]" />
              <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full shadow-[0_0_15px_rgba(0,255,65,0.6)]" />
            </div>

            <div className="absolute right-[20%] top-[45%] flex gap-8 predator-eyes-pulse" style={{ animationDelay: '4s' }}>
              <div className="w-2.5 h-2.5 bg-[var(--night-vision)] rounded-full shadow-[0_0_20px_rgba(0,255,65,0.6)]" />
              <div className="w-2.5 h-2.5 bg-[var(--night-vision)] rounded-full shadow-[0_0_20px_rgba(0,255,65,0.6)]" />
            </div>

            <div className="absolute left-[25%] bottom-[35%] flex gap-5 predator-eyes-pulse" style={{ animationDelay: '8s' }}>
              <div className="w-1.5 h-1.5 bg-[var(--night-vision)] rounded-full shadow-[0_0_10px_rgba(0,255,65,0.5)]" />
              <div className="w-1.5 h-1.5 bg-[var(--night-vision)] rounded-full shadow-[0_0_10px_rgba(0,255,65,0.5)]" />
            </div>

            <div className="absolute right-[15%] bottom-[25%] flex gap-7 predator-eyes-pulse" style={{ animationDelay: '12s' }}>
              <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full shadow-[0_0_15px_rgba(0,255,65,0.6)]" />
              <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full shadow-[0_0_15px_rgba(0,255,65,0.6)]" />
            </div>

            <div className="absolute left-[40%] top-[20%] flex gap-6 predator-eyes-pulse" style={{ animationDelay: '16s' }}>
              <div className="w-1.5 h-1.5 bg-[var(--night-vision)] rounded-full shadow-[0_0_12px_rgba(0,255,65,0.5)]" />
              <div className="w-1.5 h-1.5 bg-[var(--night-vision)] rounded-full shadow-[0_0_12px_rgba(0,255,65,0.5)]" />
            </div>

            <div className="absolute right-[35%] bottom-[40%] flex gap-5 predator-eyes-pulse" style={{ animationDelay: '6s' }}>
              <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full shadow-[0_0_15px_rgba(0,255,65,0.6)]" />
              <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full shadow-[0_0_15px_rgba(0,255,65,0.6)]" />
            </div>
          </div>
        )}

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_70%,rgba(0,0,0,0.95)_100%)]" />

        {/* Floating wild elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="float-wild-1 absolute top-[20%] left-[10%] w-1 h-1 bg-[var(--night-vision)] opacity-20 rounded-full" />
          <div className="float-wild-2 absolute top-[60%] right-[15%] w-1.5 h-1.5 bg-[var(--tactical-green)] opacity-15 rounded-full" />
          <div className="float-wild-1 absolute bottom-[30%] left-[70%] w-1 h-1 bg-[var(--night-vision)] opacity-10 rounded-full" />
        </div>

        {/* Alice in Wonderland - Falling down the rabbit hole elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
          <div className="rabbit-hole-element absolute w-3 h-3 border border-[var(--night-vision)] rotate-45" style={{ left: '20%', animationDelay: '0s' }} />
          <div className="rabbit-hole-element absolute w-2 h-2 border border-[var(--tactical-green)] rounded-full" style={{ left: '60%', animationDelay: '5s' }} />
          <div className="rabbit-hole-element absolute w-4 h-4 border border-[var(--night-vision)]" style={{ left: '40%', animationDelay: '10s' }} />
          <div className="rabbit-hole-element absolute w-2.5 h-2.5 border border-[var(--tactical-green)] rotate-45" style={{ left: '75%', animationDelay: '15s' }} />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center pt-32 pb-32 sm:pb-40">
          {/* Logo - Main Focus - Shows First */}
          <div className="mb-20 flex justify-center stalk-in" style={{ animationDelay: '0.5s' }}>
            <Image
              src="/images/logo.png"
              alt="Clawpoint Security Collective"
              width={400}
              height={400}
              className="object-contain drop-shadow-[0_0_40px_rgba(0,255,65,0.4)] predator-movement"
            />
          </div>

          {/* Tagline - Fades In After Logo */}
          <div className="stalk-in" style={{ animationDelay: '2s' }}>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-200 mb-24 sm:mb-32 font-mono tracking-wide max-w-4xl mx-auto leading-relaxed">
              HUNTING THREATS IN THE DIGITAL FOREST
            </p>
          </div>
        </div>

        {/* Scroll indicator - hidden on small screens to prevent overlap */}
        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 animate-bounce opacity-60">
          <span className="text-[var(--night-vision)] font-mono text-sm tracking-wider">
            VENTURE DEEPER
          </span>
          <div className="w-0.5 h-16 bg-gradient-to-b from-[var(--night-vision)] to-transparent" />
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="relative py-40 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        {/* Background image - speed lines */}
        <div className="absolute inset-0">
          <Image
            src="/images/AdobeStock_328406149.jpeg"
            alt=""
            fill
            className="object-cover opacity-10 mix-blend-lighten"
          />
        </div>

        <div className="absolute inset-0 tactical-grid opacity-10" />

        <div className="max-w-6xl mx-auto text-center relative z-10 emerge-from-forest">
          <div className="mb-12">
            <div className="inline-block w-12 h-12 border border-[var(--night-vision)] rotate-45 mb-8 opacity-40" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 font-mono tracking-wider">
            YOUR HUNT IS OUR HUNT
          </h2>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-mono mb-16 max-w-5xl mx-auto">
            In the darkness between compliance requirements and operational reality, threats lurk.
            We are the apex predators that hunt them down. With predatory precision and relentless focus,
            we secure the gaps others miss.
          </p>

          {/* Past Performance Snapshot */}
          <section aria-labelledby="performance-heading" className="mt-20 mb-24 max-w-6xl mx-auto relative">
            <div className="text-center mb-12">
              <h2 id="performance-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-mono tracking-wider mb-4">
                PAST PERFORMANCE SNAPSHOT
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--night-vision)] to-transparent mx-auto" aria-hidden="true" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Metric 1 */}
              <article className="relative group stalk-in border-2 border-[var(--tactical-green-dark)] bg-black/60 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] transition-all duration-500" style={{ animationDelay: '0.1s' }}>
                <div className="credential-shine relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />
                  <div className="text-5xl md:text-6xl font-bold text-[var(--night-vision)] font-mono mb-4">
                    300K+
                  </div>
                  <p className="text-base text-gray-300 font-mono leading-relaxed">
                    Users supported across enterprise environments
                  </p>
                </div>
              </article>

              {/* Metric 2 */}
              <article className="relative group stalk-in border-2 border-[var(--tactical-green-dark)] bg-black/60 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] transition-all duration-500" style={{ animationDelay: '0.2s' }}>
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

              {/* Metric 3 */}
              <article className="relative group stalk-in border-2 border-[var(--tactical-green-dark)] bg-black/60 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] transition-all duration-500" style={{ animationDelay: '0.3s' }}>
                <div className="credential-shine relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 overflow-hidden" aria-hidden="true" />
                  <div className="text-4xl md:text-5xl font-bold text-[var(--night-vision)] font-mono mb-4 relative">
                    ACCELERATED
                  </div>
                  <p className="text-base text-gray-300 font-mono leading-relaxed relative">
                    Authorization delivery across multiple enclaves
                  </p>
                </div>
              </article>
            </div>
          </section>

          {/* Tactical Credentials Readout */}
          <section aria-labelledby="credentials-heading" className="mt-20 space-y-8 max-w-6xl mx-auto relative">
            {/* Visually hidden heading for screen readers */}
            <h2 id="credentials-heading" className="sr-only">
              Clawpoint Security Collective Credentials and Expertise
            </h2>

            {/* Background tactical grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(var(--tactical-green) 1px, transparent 1px), linear-gradient(90deg, var(--tactical-green) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Credential 01: Years of Leadership */}
            <article
              className="relative group stalk-in"
              style={{ animationDelay: '0.1s' }}
              aria-labelledby="credential-01-heading"
            >
              <div className="credential-shine flex items-start gap-4 md:gap-8 lg:gap-12 border-l-4 border-[var(--tactical-green)] pl-4 md:pl-6 lg:pl-8 py-6 md:py-8 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] focus-within:bg-black/60 focus-within:border-[var(--night-vision)] transition-all duration-500">
                {/* Scan line effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />

                <div className="flex-shrink-0 min-w-[200px] md:min-w-[280px]">
                  <div className="text-xs text-[var(--tactical-green-light)] font-mono tracking-widest mb-2" aria-hidden="true">
                    SIGNAL-01
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-[var(--night-vision)] font-mono leading-tight relative py-8" aria-label="24 plus years">
                    24+
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                  </div>
                  <div className="text-xs text-[var(--tactical-green-light)] font-mono mt-2 tracking-wider" aria-hidden="true">
                    YEARS
                  </div>
                </div>

                <div className="flex-1 pt-1 md:pt-2">
                  <h3 id="credential-01-heading" className="text-lg md:text-xl lg:text-2xl font-semibold text-white font-mono tracking-wide mb-3">
                    Mission-Critical Cybersecurity Leadership
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 font-mono tracking-wide leading-relaxed">
                    Mission-critical cybersecurity leadership in high-consequence environments
                  </p>
                </div>
              </div>
            </article>

            {/* Credential 02: Enterprise Scale */}
            <article
              className="relative group stalk-in"
              style={{ animationDelay: '0.2s' }}
              aria-labelledby="credential-02-heading"
            >
              <div className="credential-shine flex items-start gap-4 md:gap-8 lg:gap-12 border-l-4 border-[var(--tactical-green)] pl-4 md:pl-6 lg:pl-8 py-6 md:py-8 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] focus-within:bg-black/60 focus-within:border-[var(--night-vision)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />

                <div className="flex-shrink-0 min-w-[200px] md:min-w-[280px]">
                  <div className="text-xs text-[var(--tactical-green-light)] font-mono tracking-widest mb-2" aria-hidden="true">
                    SCALE-02
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-[var(--night-vision)] font-mono leading-tight relative py-8" aria-label="Mission Assurance">
                    MISSION<br/>ASSURANCE
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                  </div>
                </div>

                <div className="flex-1 pt-1 md:pt-2">
                  <h3 id="credential-02-heading" className="text-lg md:text-xl lg:text-2xl font-semibold text-white font-mono tracking-wide mb-3">
                    Closing the Gap
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 font-mono tracking-wide leading-relaxed">
                    Mission assurance that closes the gap between compliance requirements and operational reality
                  </p>
                </div>
              </div>
            </article>

            {/* Credential 03: Framework Expertise */}
            <article
              className="relative group stalk-in"
              style={{ animationDelay: '0.3s' }}
              aria-labelledby="credential-03-heading"
            >
              <div className="credential-shine flex items-start gap-4 md:gap-8 lg:gap-12 border-l-4 border-[var(--tactical-green)] pl-4 md:pl-6 lg:pl-8 py-6 md:py-8 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] focus-within:bg-black/60 focus-within:border-[var(--night-vision)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />

                <div className="flex-shrink-0 min-w-[200px] md:min-w-[280px]">
                  <div className="text-xs text-[var(--tactical-green-light)] font-mono tracking-widest mb-2" aria-hidden="true">
                    DISCIPLINE-03
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-[var(--night-vision)] font-mono leading-tight relative py-8" aria-label="NIST, RMF, Zero Trust">
                    NIST<br/>RMF<br/>ZERO TRUST
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                  </div>
                </div>

                <div className="flex-1 pt-1 md:pt-2">
                  <h3 id="credential-03-heading" className="text-lg md:text-xl lg:text-2xl font-semibold text-white font-mono tracking-wide mb-3">
                    Framework-Driven Execution
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 font-mono tracking-wide leading-relaxed">
                    NIST-aligned delivery • RMF-informed • Zero Trust-ready execution
                  </p>
                </div>
              </div>
            </article>

            {/* Credential 04: Cleared Leadership */}
            <article
              className="relative group stalk-in"
              style={{ animationDelay: '0.4s' }}
              aria-labelledby="credential-04-heading"
            >
              <div className="credential-shine flex items-start gap-4 md:gap-8 lg:gap-12 border-l-4 border-[var(--tactical-green)] pl-4 md:pl-6 lg:pl-8 py-6 md:py-8 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] focus-within:bg-black/60 focus-within:border-[var(--night-vision)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />

                <div className="flex-shrink-0 min-w-[200px] md:min-w-[280px]">
                  <div className="text-xs text-[var(--tactical-green-light)] font-mono tracking-widest mb-2" aria-hidden="true">
                    TRUST-04
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-[var(--night-vision)] font-mono leading-tight relative py-8" aria-label="Cleared Leadership">
                    CLEARED<br/>LEADERSHIP
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                  </div>
                </div>

                <div className="flex-1 pt-1 md:pt-2">
                  <h3 id="credential-04-heading" className="text-lg md:text-xl lg:text-2xl font-semibold text-white font-mono tracking-wide mb-3">
                    Federal & Defense-Grade Security
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 font-mono tracking-wide leading-relaxed">
                    Cleared leadership experience supporting sensitive, mission-critical operations
                  </p>
                </div>
              </div>
            </article>

            {/* Bottom accent line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--tactical-green)] to-transparent opacity-40 mt-12" aria-hidden="true" />
          </section>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
            <CTAButton href="/contact" variant="alert" size="lg">
              INITIATE CONTACT
            </CTAButton>
            <CTAButton href="/solutions" variant="secondary" size="lg">
              VIEW CAPABILITIES
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-56 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-black via-[var(--forest-depth-2)] to-black">
        {/* Background image - light curves */}
        <div className="absolute inset-0">
          <Image
            src="/images/AdobeStock_352206247.jpeg"
            alt=""
            fill
            className="object-cover opacity-15 mix-blend-screen"
          />
        </div>

        {/* Eyes watching */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[
            { left: '15%', top: '20%', gap: 6 },
            { right: '20%', top: '30%', gap: 8 },
            { left: '25%', bottom: '25%', gap: 5 },
            { right: '30%', bottom: '35%', gap: 7 },
          ].map((pos, i) => (
            <div key={i} className={`absolute flex`} style={{...pos, gap: `${pos.gap * 4}px`}}>
              <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full eye-glow" />
              <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full eye-glow" />
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-12">
            <div className="inline-block w-20 h-20 border-2 border-[var(--night-vision)] mb-8 eye-glow predator-movement" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 font-mono tracking-wider">
            READY TO ENGAGE?
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-16 font-mono leading-relaxed max-w-3xl mx-auto">
            The threats are real. The stakes are high. Your business cannot afford security gaps.
            Let&apos;s eliminate them together.
          </p>

          <DownloadBrief variant="banner" className="mb-16" />

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
            <CTAButton href="/contact" variant="alert" size="lg">
              SCHEDULE STRATEGY SESSION
            </CTAButton>
            <CTAButton href="/solutions" variant="secondary" size="lg">
              REVIEW CAPABILITIES
            </CTAButton>
          </div>

          <div className="pt-20 border-t border-[var(--tactical-green-dark)]">
            <p className="text-sm text-gray-500 font-mono tracking-wider">
              ENCRYPTED COMMUNICATION | SECURE BY DEFAULT | ALWAYS VIGILANT
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
