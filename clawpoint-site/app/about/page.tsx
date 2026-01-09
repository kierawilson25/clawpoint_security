import type { Metadata } from 'next'
import CTAButton from '@/components/CTAButton'

export const metadata: Metadata = {
  title: 'About Us | Claw Point Security',
  description:
    'Elite cybersecurity operators with special forces mindset. We hunt threats with tactical precision and unwavering commitment to mission success.',
}

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 tactical-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block border border-[var(--night-vision)] px-4 py-2 mb-6 font-mono text-xs text-[var(--night-vision)] bg-black/50 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 bg-[var(--night-vision)] rounded-full mr-2 eye-glow" />
            CLASSIFIED BRIEFING | ABOUT CLAW POINT
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-mono tracking-wider">
            MEET THE <span className="text-[var(--night-vision)] text-glow">HUNTERS</span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed font-mono mb-8">
            We are not your typical security consultants. We are operators. Predators in the
            digital forest. Elite specialists trained to hunt, identify, and eliminate threats
            before they strike.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-40 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 font-mono tracking-wider border-l-4 border-[var(--night-vision)] pl-6">
                OUR MISSION
              </h2>
              <p className="text-lg text-gray-300 font-mono leading-relaxed mb-6">
                To eliminate the cognitive load that cripples security teams. To bridge the deadly
                gap between compliance requirements and mission reality. To be the tactical
                operations center that never sleeps, never misses, never fails.
              </p>
              <p className="text-lg text-gray-300 font-mono leading-relaxed">
                Every organization using technology is a target. We ensure they are also a fortress.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  value: 'RELENTLESS',
                  description: 'We never stop hunting threats',
                },
                {
                  value: 'PRECISE',
                  description: 'Surgical strikes, zero collateral damage',
                },
                {
                  value: 'TACTICAL',
                  description: 'Strategic thinking, operational excellence',
                },
                {
                  value: 'MISSION-FOCUSED',
                  description: 'Your objectives are our objectives',
                },
              ].map((principle, index) => (
                <div
                  key={index}
                  className="border border-[var(--tactical-green)] bg-black/50 backdrop-blur-sm p-6 hover:border-[var(--night-vision)] transition-tactical group"
                >
                  <h3 className="text-xl font-bold text-[var(--night-vision)] mb-2 font-mono">
                    {principle.value}
                  </h3>
                  <p className="text-gray-400 font-mono text-sm">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="relative py-48 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--tactical-green-dark)] to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              WHAT SETS US APART
            </h2>
            <p className="text-xl text-gray-300 font-mono">SPECIAL FORCES APPROACH TO SECURITY</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'COGNITIVE LOAD REDUCTION',
                description:
                  'We absorb the complexity so your team can focus. One point of contact. Clear priorities. Actionable intelligence. No noise.',
              },
              {
                title: 'GAP HUNTERS',
                description:
                  'The space between compliance and reality is where threats breed. We specialize in finding and eliminating those gaps.',
              },
              {
                title: 'OPERATOR MENTALITY',
                description:
                  'We think like attackers, plan like strategists, execute like operators. Every engagement is a mission with defined objectives.',
              },
            ].map((differentiator, index) => (
              <div
                key={index}
                className="border-2 border-[var(--tactical-green-dark)] bg-black p-8 relative group hover:border-[var(--night-vision)] transition-tactical"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--tactical-green-dark)] to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative">
                  <h3 className="text-2xl font-bold text-[var(--night-vision)] mb-4 font-mono">
                    {differentiator.title}
                  </h3>
                  <p className="text-gray-300 font-mono leading-relaxed">
                    {differentiator.description}
                  </p>
                </div>
                {/* Tactical corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="relative py-48 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="absolute inset-0 tactical-grid opacity-10" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              TACTICAL METHODOLOGY
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                phase: '01',
                title: 'RECONNAISSANCE',
                description:
                  'Deep dive into your tech stack, operations, and threat landscape. We identify every asset, every dependency, every potential attack vector.',
              },
              {
                phase: '02',
                title: 'ASSESSMENT',
                description:
                  'Comprehensive security evaluation mapped against your mission requirements. We find the gaps between compliance checkboxes and real-world protection.',
              },
              {
                phase: '03',
                title: 'STRATEGIC PLANNING',
                description:
                  'Customized security roadmap aligned with your operational objectives. Prioritized actions based on actual risk, not theoretical concerns.',
              },
              {
                phase: '04',
                title: 'TACTICAL EXECUTION',
                description:
                  'Rapid deployment of security measures. Continuous monitoring. Real-time threat hunting. Automated compliance reporting. Always-on protection.',
              },
              {
                phase: '05',
                title: 'CONTINUOUS OPERATIONS',
                description:
                  'Security is not a project with an end date. We remain embedded, vigilant, and adaptive. Your security ops center, on demand.',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 items-start border-l-4 border-[var(--night-vision)] pl-6 hover:bg-[var(--tactical-green-dark)]/10 transition-tactical p-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 border-2 border-[var(--night-vision)] flex items-center justify-center text-[var(--night-vision)] text-2xl font-bold font-mono">
                    {step.phase}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 font-mono">{step.title}</h3>
                  <p className="text-gray-300 font-mono leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-56 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-black via-[var(--tactical-green-dark)] to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
            JOIN THE HUNT
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-mono leading-relaxed">
            Whether you need operators on your team or want to become one, we are ready to engage.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <CTAButton href="/contact" variant="alert" size="lg">
              REQUEST BRIEFING
            </CTAButton>
            <CTAButton href="/careers" variant="secondary" size="lg">
              VIEW OPEN POSITIONS
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
