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
          {/* Infinite View Logo */}
          <div className="mb-8 stalk-in flex justify-center">
            <Image
              src="/images/Copy of InfiniteView-logo-white-02 3.png"
              alt="Infinite View"
              width={700}
              height={700}
              className="object-contain drop-shadow-[0_0_40px_rgba(0,255,65,0.4)]"
              priority
            />
          </div>

          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-mono leading-relaxed stalk-in" style={{ animationDelay: '0.2s' }}>
            Cut Noise. Reduce Cognitive Load. Outpace Threats.
          </p>
        </div>
      </section>

      {/* Platform Overview */}
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
          <div className="emerge-from-forest text-center">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-xs tracking-widest">CONCEPT-STAGE PLATFORM</span>
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
            </div>

            <div className="border-2 border-[var(--night-vision)] bg-black/60 backdrop-blur-sm p-10 relative">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[var(--tactical-green)]" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[var(--tactical-green)]" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[var(--tactical-green)]" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[var(--tactical-green)]" />

              <p className="text-lg md:text-xl text-white font-mono leading-relaxed">
                Infinite View is Clawpoint&apos;s concept-stage analyst augmentation platform designed to reduce cognitive load and accelerate mission response by translating scattered security telemetry into a coherent operational picture. It is built to strengthen analyst judgment—not replace it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--forest-depth-2)] to-black">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(var(--tactical-green) 1px, transparent 1px), linear-gradient(90deg, var(--tactical-green) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 emerge-from-forest">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-mono tracking-wider mb-4">
              THREE PILLARS
            </h2>
            <p className="text-gray-400 font-mono text-sm tracking-wider">
              MODULAR ARCHITECTURE FOR MISSION SUCCESS
            </p>
          </div>

          <div className="space-y-8">
            {/* Pillar 1: MCI */}
            <article className="relative group stalk-in" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

              <div className="relative border-l-4 border-[var(--tactical-green)] bg-black/50 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] hover:bg-black/70 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center border-2 border-[var(--tactical-green-dark)] bg-black/60 group-hover:border-[var(--night-vision)] transition-colors">
                    <span className="text-3xl font-bold text-[var(--night-vision)] font-mono">01</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 font-mono tracking-wide">
                      MCI (Mission Cognition Interface)
                    </h3>
                    <div className="text-sm text-[var(--tactical-green-light)] font-mono mb-4 tracking-wider">
                      PILLAR 1: HUMAN-CENTERED INTERFACE
                    </div>
                    <p className="text-base text-gray-300 leading-relaxed">
                      Infinite View&apos;s human-centered interface layer that converts complexity into comprehension. MCI is how Infinite View presents mission-relevant context, relationships, and meaning so analysts and leaders can understand what is happening, why it matters, and what must happen next.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Pillar 2: MDSK */}
            <article className="relative group stalk-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

              <div className="relative border-l-4 border-[var(--tactical-green)] bg-black/50 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] hover:bg-black/70 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center border-2 border-[var(--tactical-green-dark)] bg-black/60 group-hover:border-[var(--night-vision)] transition-colors">
                    <span className="text-3xl font-bold text-[var(--night-vision)] font-mono">02</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 font-mono tracking-wide">
                      MDSK (Modular Decision Support Kit)
                    </h3>
                    <div className="text-sm text-[var(--tactical-green-light)] font-mono mb-4 tracking-wider">
                      PILLAR 2: MODULAR BACKBONE
                    </div>
                    <p className="text-base text-gray-300 leading-relaxed">
                      The modular backbone that ingests, stores, normalizes, and quality-checks mission-relevant data so it can be used for decision support. MDSK is the buildable core that makes fusion, explainability, and operational analytics possible without forcing a full-stack replacement.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Pillar 3: HRE */}
            <article className="relative group stalk-in" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

              <div className="relative border-l-4 border-[var(--tactical-green)] bg-black/50 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] hover:bg-black/70 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center border-2 border-[var(--tactical-green-dark)] bg-black/60 group-hover:border-[var(--night-vision)] transition-colors">
                    <span className="text-3xl font-bold text-[var(--night-vision)] font-mono">03</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 font-mono tracking-wide">
                      HRE (Horizon Engine)
                    </h3>
                    <div className="text-sm text-[var(--tactical-green-light)] font-mono mb-4 tracking-wider">
                      PILLAR 3: PREDICTIVE INTELLIGENCE
                    </div>
                    <p className="text-base text-gray-300 leading-relaxed italic">
                      Details coming soon...
                    </p>
                  </div>
                </div>
              </div>
            </article>
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
              Schedule a Call
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
