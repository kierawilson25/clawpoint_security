'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import CTAButton from '@/components/CTAButton'

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
        {/* Background video - reverse video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-35 mix-blend-screen"
          >
            <source src="https://7xcqtmwmk6ep09bq.public.blob.vercel-storage.com/Reverse%20Video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Parallax forest layers - stalking through the undergrowth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="forest-layer forest-layer-1 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-depth-3)] via-[var(--forest-depth-2)] to-transparent" />
          </div>

          <div className="forest-layer forest-layer-2 opacity-8">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-depth-2)] via-[var(--forest-depth-1)] to-transparent" />
          </div>

          <div className="forest-layer forest-layer-3 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-depth-1)] to-transparent" />
          </div>

          {/* Mysterious forest shapes - appearing and disappearing like moving through foliage */}
          <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-[var(--forest-depth-2)] to-transparent cheshire-element opacity-10" style={{ animationDelay: '0s' }} />
          <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-[var(--forest-depth-3)] to-transparent cheshire-element opacity-12" style={{ animationDelay: '3s' }} />
          <div className="absolute left-1/4 bottom-0 w-1/2 h-2/3 bg-gradient-to-t from-[var(--forest-depth-1)] to-transparent cheshire-element opacity-8" style={{ animationDelay: '6s' }} />
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)]" />

        {/* Bottom fade to black */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

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

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center pt-20 pb-40">
          {/* Logo - Main Focus - Shows First */}
          <div className="mb-8 flex justify-center stalk-in" style={{ animationDelay: '0.5s', animationDuration: '2s' }}>
            <Image
              src="/images/logo.png"
              alt="Clawpoint Security Collective"
              width={400}
              height={400}
              className="object-contain drop-shadow-[0_0_40px_rgba(0,255,65,0.4)] predator-movement"
            />
          </div>

          {/* Tagline - Fades In After Logo */}
          <div className="stalk-in" style={{ animationDelay: '1s', animationDuration: '2.5s' }}>
            <p className="body-large tracking-wide max-w-4xl text-gray-200 mb-12 mx-auto">
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
      <section className="relative py-6 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
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
          <h2 className="heading-h2 text-white mb-4">
            YOUR HUNT IS OUR HUNT
          </h2>

          <div className="max-w-5xl mx-auto mb-4 space-y-2">
            {/* Main intro - ultra concise */}
            <p className="text-base md:text-lg text-white leading-snug font-mono">
              Clawpoint Security Collective (SDVOSB) reduces operational risk by translating fragmented security data into actionable decisions.
            </p>

            {/* Our work section - single line */}
            <p className="text-xs md:text-sm text-gray-300 font-mono leading-snug pl-3 border-l-2 border-[var(--tactical-green-dark)]">
              <span className="text-[var(--night-vision)]">01</span> Baseline risk
              <span className="text-[var(--tactical-green-dark)] mx-1.5">|</span>
              <span className="text-[var(--night-vision)]">02</span> Scenario exercises
              <span className="text-[var(--tactical-green-dark)] mx-1.5">|</span>
              <span className="text-[var(--night-vision)]">03</span> Adversary hunting
            </p>
          </div>

          {/* Operational Credentials - Vertical Layout */}
          <section aria-labelledby="credentials-heading" className="mt-8 space-y-2 max-w-6xl mx-auto relative">
            <h2 id="credentials-heading" className="sr-only">
              Clawpoint Security Credentials and Expertise
            </h2>

            {/* Credential 01: 300K+ Users */}
            <article
              className="relative group stalk-in"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="credential-shine flex items-start gap-3 md:gap-4 border-l-4 border-[var(--tactical-green)] pl-3 md:pl-4 py-4 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] transition-all duration-500 min-h-[120px] md:h-[120px]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />

                <div className="flex-shrink-0 w-[160px] md:w-[200px]">
                  <div className="text-xs text-[var(--tactical-green-light)] font-mono tracking-widest mb-1" aria-hidden="true">
                    PERFORMANCE-01
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[var(--night-vision)] font-mono leading-none relative">
                    300K+
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                  </div>
                  <div className="text-xs text-[var(--tactical-green-light)] font-mono mt-1 tracking-wider" aria-hidden="true">
                    USERS
                  </div>
                </div>

                <div className="flex-1 pt-1 md:pt-2">
                  <h3 className="body-small font-bold text-white tracking-wide mb-1 leading-tight">
                    Enterprise-Scale Operations
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 font-mono tracking-wide leading-relaxed">
                    Users supported across enterprise environments with proven mission success
                  </p>
                </div>
              </div>
            </article>

            {/* Credential 02: 24+ Years */}
            <article
              className="relative group stalk-in"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="credential-shine flex items-start gap-3 md:gap-4 border-l-4 border-[var(--tactical-green)] pl-3 md:pl-4 py-4 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] transition-all duration-500 min-h-[120px] md:h-[120px]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />

                <div className="flex-shrink-0 w-[160px] md:w-[200px]">
                  <div className="text-xs text-[var(--tactical-green-light)] font-mono tracking-widest mb-1" aria-hidden="true">
                    EXPERIENCE-02
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[var(--night-vision)] font-mono leading-none relative">
                    24+
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                  </div>
                  <div className="text-xs text-[var(--tactical-green-light)] font-mono mt-1 tracking-wider" aria-hidden="true">
                    YEARS
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold text-white font-mono tracking-wide mb-1 leading-tight">
                    Mission-Critical Cybersecurity Leadership
                  </h3>
                  <p className="text-xs text-gray-300 font-mono tracking-wide leading-tight">
                    Proven track record in high-stakes security operations and strategic defense architecture
                  </p>
                </div>
              </div>
            </article>

            {/* Credential 03: NIST Frameworks */}
            <article
              className="relative group stalk-in"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="credential-shine flex items-start gap-3 md:gap-4 border-l-4 border-[var(--tactical-green)] pl-3 md:pl-4 py-4 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] transition-all duration-500 min-h-[120px] md:h-[120px]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />

                <div className="flex-shrink-0 w-[160px] md:w-[200px]">
                  <div className="text-xs text-[var(--tactical-green-light)] font-mono tracking-widest mb-1" aria-hidden="true">
                    PROTOCOL-03
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-[var(--night-vision)] font-mono leading-tight relative">
                    NIST<br/>RMF<br/>ZERO TRUST
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                  </div>
                </div>

                <div className="flex-1 pt-1 md:pt-2">
                  <h3 className="text-sm md:text-base font-semibold text-white font-mono tracking-wide mb-1 leading-tight">
                    Framework-Driven Execution
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 font-mono tracking-wide leading-relaxed">
                    Proven implementation of NIST standards, Risk Management Framework, and Zero Trust Architecture
                  </p>
                </div>
              </div>
            </article>

            {/* Credential 04: Cleared Leadership */}
            <article
              className="relative group stalk-in"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="credential-shine flex items-start gap-3 md:gap-4 border-l-4 border-[var(--tactical-green)] pl-3 md:pl-4 py-4 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] transition-all duration-500 min-h-[120px] md:h-[120px]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" aria-hidden="true" />

                <div className="flex-shrink-0 w-[160px] md:w-[200px]">
                  <div className="text-xs text-[var(--tactical-green-light)] font-mono tracking-widest mb-1" aria-hidden="true">
                    EXPERTISE-04
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-[var(--night-vision)] font-mono leading-tight relative">
                    CLEARED<br/>LEADERSHIP
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[var(--night-vision)]/40" aria-hidden="true" />
                  </div>
                </div>

                <div className="flex-1 pt-1 md:pt-2">
                  <h3 className="text-sm md:text-base font-semibold text-white font-mono tracking-wide mb-1 leading-tight">
                    Federal & Defense-Grade Security
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 font-mono tracking-wide leading-relaxed">
                    Trusted leadership experience in high-consequence, classified environments with mission-critical security requirements
                  </p>
                </div>
              </div>
            </article>

          </section>
        </div>
      </section>

    </div>
  )
}
