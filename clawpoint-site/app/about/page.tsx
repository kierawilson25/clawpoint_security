'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import CTAButton from '@/components/CTAButton'
import DownloadBrief from '@/components/DownloadBrief'

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
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
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
          <div className="mb-6 stalk-in" style={{ animationDelay: '0.2s' }}>
            <div className="inline-block w-10 h-10 border border-[var(--night-vision)] rotate-45 opacity-40 predator-movement" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-mono tracking-wider stalk-in" style={{ animationDelay: '0.4s' }}>
            CLAWPOINT SECURITY
            <span className="block text-[var(--night-vision)] mt-3">
              COLLECTIVE
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-mono leading-relaxed stalk-in" style={{ animationDelay: '0.6s' }}>
            Mission-centric cybersecurity and operational assurance for federal and national security stakeholders
          </p>
        </div>
      </section>

      {/* Who We Are & Mission Section */}
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
          <div className="emerge-from-forest">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-xs tracking-widest">MISSION-01</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-mono tracking-wider mb-6">
              WHO WE ARE
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-mono leading-relaxed mb-6">
              Clawpoint Security Collective (CSC) is a mission-centric cybersecurity and operational assurance firm focused on reducing decision latency and mission risk for federal and national security stakeholders.
            </p>
            <p className="text-base md:text-lg text-gray-400 font-mono leading-relaxed mb-8">
              We don't sell tools. We deliver clarity, confidence, and control for organizations where mission failure has real consequences.
            </p>

            {/* Mission Statement Box */}
            <div className="mt-10 p-8 border-l-4 border-[var(--night-vision)] bg-black/60 backdrop-blur-sm stalk-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[var(--night-vision)] rounded-full eye-glow" />
                <span className="text-[var(--night-vision)] font-mono text-xs tracking-widest font-bold">OUR MISSION</span>
              </div>
              <p className="text-lg md:text-xl text-white font-mono leading-relaxed font-semibold">
                To empower federal mission owners and defense operators with actionable insight, resilient risk frameworks, and decision advantage in complex security environments.
              </p>
            </div>
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
              <span className="text-[var(--tactical-green-light)] font-mono text-xs tracking-widest">CAPABILITIES-02</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-mono tracking-wider mb-6">
              WHAT WE DO
            </h2>
            <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed mb-8">
              CSC partners with mission-critical organizations to:
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

      {/* Team Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--forest-depth-2)] to-black">
        <div className="absolute inset-0 tactical-grid opacity-5" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-16 emerge-from-forest text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-xs tracking-widest">LEADERSHIP-03</span>
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-mono tracking-wider mb-6">
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

      {/* Who We Serve Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--forest-depth-3)] to-black">
        <div className="absolute inset-0 tactical-grid opacity-5" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-10 emerge-from-forest">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-xs tracking-widest">CLIENTS-03</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-mono tracking-wider mb-6">
              WHO WE SERVE
            </h2>
            <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed mb-8">
              CSC aligns with organizations that:
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 stalk-in" style={{ animationDelay: '0.3s' }}>
            {[
              'Operate under legal, constitutional, or national security imperatives',
              'Require decisive leadership outcomes',
              'Cannot tolerate ambiguity in risk or readiness'
            ].map((criteria, i) => (
              <div key={i} className="relative group">
                <div className="border border-[var(--tactical-green-dark)] bg-black/40 p-6 hover:border-[var(--tactical-green)] hover:bg-black/60 transition-all duration-300 h-full">
                  <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full mb-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">
                    {criteria}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Focus Areas Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="absolute inset-0">
          <Image
            src="/images/AdobeStock_328406149.jpeg"
            alt=""
            fill
            className="object-cover opacity-10 mix-blend-lighten"
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-10 emerge-from-forest">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-xs tracking-widest">FOCUS-04</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-mono tracking-wider mb-6">
              OPERATIONAL FOCUS AREAS
            </h2>
            <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed mb-8">
              Our work reflects active engagement, solution shaping, and mission alignment with:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'United States Courts',
                subtitle: 'AOUSC',
                icon: '⚖️'
              },
              {
                title: 'Department of Justice',
                subtitle: 'DOJ',
                icon: '🏛️'
              },
              {
                title: 'U.S. Special Operations Command',
                subtitle: 'SOCOM',
                icon: '⭐'
              }
            ].map((focus, i) => (
              <article key={i} className="relative group stalk-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="border-2 border-[var(--tactical-green-dark)] bg-black p-6 hover:border-[var(--night-vision)] transition-all duration-300 h-full text-center">
                  <div className="text-4xl mb-4">{focus.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-mono">
                    {focus.title}
                  </h3>
                  <p className="text-[var(--night-vision)] font-mono text-sm font-bold">
                    {focus.subtitle}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--forest-depth-2)] to-black">
        <div className="absolute inset-0 tactical-grid opacity-5" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="mb-10 emerge-from-forest">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
              <span className="text-[var(--tactical-green-light)] font-mono text-xs tracking-widest">INNOVATION-05</span>
              <div className="w-12 h-px bg-[var(--tactical-green)]" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 font-mono tracking-wider">
              INNOVATION & PRODUCT PATHWAYS
            </h2>
            <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed max-w-3xl mx-auto">
              We also pursue mission-aligned capability development through competitive federal programs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
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
              <span className="text-[var(--tactical-green-light)] font-mono text-xs tracking-widest">APPROACH-06</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-mono tracking-wider mb-6">
              OUR APPROACH
            </h2>
            <p className="text-base md:text-lg text-gray-300 font-mono leading-relaxed mb-8">
              We design solutions that are:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Mission-first',
                desc: 'Outcomes over checkboxes',
                delay: '0.1s'
              },
              {
                title: 'Human-centered',
                desc: 'Augmenting judgment, not replacing it',
                delay: '0.2s'
              },
              {
                title: 'Operationally grounded',
                desc: 'Built for real risk environments',
                delay: '0.3s'
              },
              {
                title: 'Explainable',
                desc: 'Decisions leaders can trust and defend',
                delay: '0.4s'
              }
            ].map((principle, i) => (
              <article key={i} className="relative group stalk-in" style={{ animationDelay: principle.delay }}>
                <div className="credential-shine border-l-4 border-[var(--tactical-green)] pl-6 py-6 bg-black/40 backdrop-blur-sm relative overflow-hidden hover:bg-black/60 hover:border-[var(--night-vision)] transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                  <h3 className="text-lg md:text-xl font-bold text-[var(--night-vision)] font-mono mb-3 tracking-wide">
                    {principle.title}
                  </h3>
                  <p className="text-gray-300 font-mono leading-relaxed text-sm">
                    {principle.desc}
                  </p>

                  <div className="absolute top-3 right-3 w-2 h-2 border-t-2 border-r-2 border-[var(--tactical-green)]/30" />
                  <div className="absolute bottom-3 left-3 w-2 h-2 border-b-2 border-l-2 border-[var(--tactical-green)]/30" />
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 p-8 border-2 border-[var(--night-vision)] bg-black/60 text-center emerge-from-forest" style={{ animationDelay: '0.5s' }}>
            <p className="text-xl md:text-2xl text-[var(--night-vision)] font-mono font-bold">
              Secure the mission. Lead the future.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-black via-[var(--forest-depth-2)] to-black">
        <div className="absolute inset-0">
          <Image
            src="/images/AdobeStock_352206247.jpeg"
            alt=""
            fill
            className="object-cover opacity-15 mix-blend-screen"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-10">
            <div className="inline-block w-16 h-16 border-2 border-[var(--night-vision)] mb-6 eye-glow predator-movement" />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 font-mono tracking-wider">
            READY TO WORK WITH STRATEGIC PARTNERS?
          </h2>

          <p className="text-base md:text-lg text-gray-300 mb-12 font-mono leading-relaxed max-w-3xl mx-auto">
            Let&apos;s discuss how we can align your security posture with your mission objectives.
          </p>

          <DownloadBrief variant="banner" className="mb-16" />

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <CTAButton href="/contact" variant="alert" size="lg">
              SCHEDULE MISSION BRIEFING
            </CTAButton>
            <CTAButton href="/solutions" variant="secondary" size="lg">
              VIEW CAPABILITIES
            </CTAButton>
          </div>

          <div className="pt-16 border-t border-[var(--tactical-green-dark)]">
            <p className="text-xs text-gray-500 font-mono tracking-wider">
              MISSION-CENTRIC | FEDERAL-FOCUSED | ALWAYS VIGILANT
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
