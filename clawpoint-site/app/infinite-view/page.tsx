'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import EyeAnimation from '@/components/EyeAnimation'
import CTAButton from '@/components/CTAButton'
import DownloadBrief from '@/components/DownloadBrief'

export default function InfiniteViewPage() {
  const [scrollProgress, setScrollProgress] = useState(0)

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

      {/* Hero Section with Eye */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(var(--tactical-green) 1px, transparent 1px), linear-gradient(90deg, var(--tactical-green) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="absolute inset-0">
          <Image
            src="/images/AdobeStock_241827782.jpeg"
            alt=""
            fill
            className="object-cover opacity-15 mix-blend-screen"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_70%,rgba(0,0,0,0.95)_100%)]" />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center py-20">
          {/* Eye Animation - Signature Element */}
          <div className="mb-12 stalk-in">
            <EyeAnimation />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 font-mono tracking-wider stalk-in" style={{ animationDelay: '0.2s' }}>
            CUT NOISE. <span className="text-[var(--night-vision)]">REDUCE COGNITIVE LOAD.</span> OUTPACE THREATS.
          </h1>
        </div>
      </section>

      {/* Problem Section */}
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

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="emerge-from-forest">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-sm tracking-widest">PROBLEM</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-mono tracking-wider mb-8">
              PROBLEM
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-mono leading-relaxed">
              Analysts drown in duplicated alerts, compliance fatigue, and fragmented tools. Adversaries adapt faster. Leadership is forced to buy more tools — or accept blind spots.
            </p>
          </div>
        </div>
      </section>

      {/* What It Is - Three Pillars Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--forest-depth-2)] to-black">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(var(--tactical-green) 1px, transparent 1px), linear-gradient(90deg, var(--tactical-green) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16 emerge-from-forest">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-sm tracking-widest">SOLUTION</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-mono tracking-wider mb-8">
              WHAT IT IS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <article className="relative group stalk-in" style={{ animationDelay: '0.1s' }}>
              <div className="credential-shine border-l-4 border-[var(--tactical-green)] pl-6 py-8 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <h3 className="text-xl md:text-2xl font-bold text-[var(--night-vision)] font-mono mb-4 tracking-wide">
                  Telemetry Normalization
                </h3>
                <p className="text-gray-300 font-mono leading-relaxed text-sm">
                  Convert flat logs to Common Event Framework, eliminate duplicates.
                </p>
              </div>
            </article>

            <article className="relative group stalk-in" style={{ animationDelay: '0.2s' }}>
              <div className="credential-shine border-l-4 border-[var(--tactical-green)] pl-6 py-8 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <h3 className="text-xl md:text-2xl font-bold text-[var(--night-vision)] font-mono mb-4 tracking-wide">
                  Analyst Personas
                </h3>
                <p className="text-gray-300 font-mono leading-relaxed text-sm">
                  Explainable overlays that accelerate triage.
                </p>
              </div>
            </article>

            <article className="relative group stalk-in" style={{ animationDelay: '0.3s' }}>
              <div className="credential-shine border-l-4 border-[var(--tactical-green)] pl-6 py-8 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <h3 className="text-xl md:text-2xl font-bold text-[var(--night-vision)] font-mono mb-4 tracking-wide">
                  Mission Integration
                </h3>
                <p className="text-gray-300 font-mono leading-relaxed text-sm">
                  Zero Trust + NIST alignment, built for national security.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* What's Available Today Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="absolute inset-0">
          <Image
            src="/images/AdobeStock_241827782.jpeg"
            alt=""
            fill
            className="object-cover opacity-10 mix-blend-screen"
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="emerge-from-forest">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-sm tracking-widest">AVAILABILITY</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-mono tracking-wider mb-8">
              WHAT&apos;S AVAILABLE TODAY
            </h2>

            <div className="space-y-6 mb-12 stalk-in" style={{ animationDelay: '0.2s' }}>
              <div className="border-l-4 border-[var(--tactical-green)] pl-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full flex-shrink-0" />
                  <p className="text-lg text-gray-300 font-mono">
                    Pilot engagements (30-min demo or ingestion test)
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-[var(--tactical-green)] pl-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full flex-shrink-0" />
                  <p className="text-lg text-gray-300 font-mono">
                    Integration with Clawpoint assessments
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-[var(--tactical-green)] pl-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full flex-shrink-0" />
                  <p className="text-lg text-gray-300 font-mono">
                    Analyst augmentation trials
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 stalk-in" style={{ animationDelay: '0.4s' }}>
              <CTAButton href="/contact" variant="primary" size="lg">
                SCHEDULE A BRIEFING
              </CTAButton>
              <CTAButton href="/contact" variant="secondary" size="lg">
                REQUEST A PILOT
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-black via-[var(--tactical-green-dark)] to-black">
        <div className="absolute inset-0">
          <Image
            src="/images/AdobeStock_352206247.jpeg"
            alt=""
            fill
            className="object-cover opacity-15 mix-blend-screen"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-12">
            <div className="inline-block w-20 h-20 border-2 border-[var(--night-vision)] mb-8 eye-glow predator-movement" />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-10 font-mono tracking-wider">
            Ready to design your next move? <span className="text-[var(--night-vision)]">Join the Hunt</span>
          </h2>

          <DownloadBrief variant="banner" className="mb-16" />

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <CTAButton href="/contact" variant="alert" size="lg">
              CONTACT US
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
