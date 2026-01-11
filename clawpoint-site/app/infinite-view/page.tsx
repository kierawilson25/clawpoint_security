import type { Metadata } from 'next'
import EyeAnimation from '@/components/EyeAnimation'
import CTAButton from '@/components/CTAButton'

export const metadata: Metadata = {
  title: 'Infinite View | Clawpoint Security',
  description:
    'See everything. Miss nothing. Our always-vigilant security monitoring and threat detection platform.',
}

export default function InfiniteViewPage() {
  return (
    <div className="bg-black min-h-screen pt-20">
      {/* Hero Section with Eye */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 tactical-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block border border-[var(--night-vision)] px-4 py-2 mb-6 font-mono text-xs text-[var(--night-vision)] bg-black/50 backdrop-blur-sm">
              <span className="inline-block w-2 h-2 bg-[var(--night-vision)] rounded-full mr-2 eye-glow" />
              VIGILANCE SYSTEM | ALWAYS WATCHING
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-mono tracking-wider">
              INFINITE <span className="text-[var(--night-vision)] text-glow">VIEW</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed font-mono mb-12">
              The eye that never blinks. The predator that never sleeps. Total visibility across
              your entire security landscape.
            </p>
          </div>

          {/* Eye Animation */}
          <div className="mb-12">
            <EyeAnimation />
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-400 font-mono mb-8">
              Every asset. Every endpoint. Every threat vector. Under constant surveillance.
            </p>
          </div>
        </div>
      </section>

      {/* What is Infinite View */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 font-mono tracking-wider border-l-4 border-[var(--night-vision)] pl-6">
                TOTAL VISIBILITY
              </h2>
              <p className="text-lg text-gray-300 font-mono leading-relaxed mb-6">
                Infinite View is our proprietary security monitoring and threat detection platform.
                It combines advanced automation, threat intelligence, and human expertise to provide
                360-degree visibility across your entire attack surface.
              </p>
              <p className="text-lg text-gray-300 font-mono leading-relaxed mb-6">
                Like a predator&apos;s eyes adapted for night hunting, Infinite View sees threats in
                the darkness where others are blind. Real-time monitoring. Instant threat
                classification. Automated response.
              </p>
              <p className="text-lg text-[var(--night-vision)] font-mono font-bold">
                We see everything. We miss nothing.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  metric: '< 30 sec',
                  label: 'THREAT DETECTION',
                  description: 'From event to alert',
                },
                {
                  metric: '99.97%',
                  label: 'UPTIME',
                  description: 'Always watching',
                },
                {
                  metric: '1M+',
                  label: 'EVENTS/DAY',
                  description: 'Processed and analyzed',
                },
                {
                  metric: '24/7/365',
                  label: 'MONITORING',
                  description: 'Never offline',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="border border-[var(--tactical-green)] bg-black/50 backdrop-blur-sm p-6 hover:border-[var(--night-vision)] transition-tactical"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-[var(--night-vision)] mb-1 font-mono">
                        {stat.metric}
                      </div>
                      <div className="text-sm text-white font-mono font-bold tracking-wider">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">{stat.description}</div>
                    </div>
                    <div className="w-2 h-2 bg-[var(--night-vision)] rounded-full eye-glow" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--tactical-green-dark)] to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              SURVEILLANCE CAPABILITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'ASSET DISCOVERY',
                description:
                  'Automatic identification of all assets across your infrastructure. Nothing hidden, everything cataloged.',
                icon: '🎯',
              },
              {
                title: 'THREAT DETECTION',
                description:
                  'Real-time threat identification using ML, behavioral analysis, and threat intelligence feeds.',
                icon: '⚠️',
              },
              {
                title: 'VULNERABILITY SCANNING',
                description:
                  'Continuous vulnerability assessment across all systems. Find weaknesses before attackers do.',
                icon: '🔍',
              },
              {
                title: 'LOG AGGREGATION',
                description:
                  'Centralized log collection and analysis from all sources. Complete audit trail, instant search.',
                icon: '📊',
              },
              {
                title: 'INCIDENT CORRELATION',
                description:
                  'Connect the dots across disparate events. Identify attack patterns and campaigns.',
                icon: '🔗',
              },
              {
                title: 'AUTOMATED RESPONSE',
                description:
                  'Instant containment actions for known threats. Reduce response time from hours to seconds.',
                icon: '⚡',
              },
            ].map((capability, index) => (
              <div
                key={index}
                className="border border-[var(--tactical-green-dark)] bg-black p-6 hover:border-[var(--night-vision)] transition-tactical group"
              >
                <div className="text-4xl mb-4">{capability.icon}</div>
                <h3 className="text-xl font-bold text-[var(--night-vision)] mb-3 font-mono">
                  {capability.title}
                </h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Integration */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="absolute inset-0 tactical-grid opacity-10" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              THREAT INTELLIGENCE
            </h2>
            <p className="text-xl text-gray-300 font-mono">POWERED BY GLOBAL INTEL FEEDS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-[var(--night-vision)] pl-6 py-4">
              <h3 className="text-2xl font-bold text-white mb-4 font-mono">INTEGRATED FEEDS</h3>
              <ul className="space-y-3">
                {[
                  'Commercial threat intelligence providers',
                  'Open-source intelligence (OSINT)',
                  'Dark web monitoring',
                  'Government threat bulletins',
                  'Industry-specific threat sharing',
                  'Proprietary research and analysis',
                ].map((feed, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 font-mono text-sm">
                    <span className="text-[var(--night-vision)] mt-0.5">▸</span>
                    <span>{feed}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l-4 border-[var(--night-vision)] pl-6 py-4">
              <h3 className="text-2xl font-bold text-white mb-4 font-mono">ACTIONABLE INTEL</h3>
              <ul className="space-y-3">
                {[
                  'Indicators of Compromise (IOCs)',
                  'Tactics, Techniques, and Procedures (TTPs)',
                  'Vulnerability intelligence',
                  'Threat actor profiles',
                  'Campaign tracking',
                  'Predictive threat modeling',
                ].map((intel, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 font-mono text-sm">
                    <span className="text-[var(--night-vision)] mt-0.5">▸</span>
                    <span>{intel}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Human + Machine */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--tactical-green-dark)] to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
            MACHINE + HUNTER
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-mono leading-relaxed">
            Automation handles the volume. Human hunters handle the complexity. Together, we
            achieve what neither could alone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-[var(--tactical-green)] bg-black p-8">
              <h3 className="text-2xl font-bold text-[var(--night-vision)] mb-4 font-mono">
                AI/ML AUTOMATION
              </h3>
              <p className="text-gray-300 font-mono text-sm leading-relaxed">
                Machine learning models process millions of events per day. Anomaly detection.
                Behavioral analysis. Pattern recognition. Instant threat classification. Zero human
                delay.
              </p>
            </div>

            <div className="border-2 border-[var(--night-vision)] bg-black p-8">
              <h3 className="text-2xl font-bold text-[var(--night-vision)] mb-4 font-mono">
                HUMAN EXPERTISE
              </h3>
              <p className="text-gray-300 font-mono text-sm leading-relaxed">
                Elite security hunters review, investigate, and respond to complex threats.
                Contextual analysis. Strategic thinking. Adversary psychology. The human element
                machines cannot replace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              DEPLOYMENT OPTIONS
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                model: 'SAAS PLATFORM',
                description:
                  'Cloud-hosted, fully managed. Deploy in hours. Scale instantly. Zero infrastructure overhead.',
              },
              {
                model: 'ON-PREMISE',
                description:
                  'Deploy within your data center. Complete control. Air-gapped environments supported.',
              },
              {
                model: 'HYBRID',
                description:
                  'Best of both worlds. Critical systems on-premise. Extended monitoring in cloud. Unified dashboard.',
              },
            ].map((option, index) => (
              <div
                key={index}
                className="border border-[var(--tactical-green)] bg-black p-6 hover:border-[var(--night-vision)] transition-tactical"
              >
                <h3 className="text-xl font-bold text-white mb-2 font-mono">{option.model}</h3>
                <p className="text-gray-400 font-mono text-sm">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-black via-[var(--tactical-green-dark)] to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block w-20 h-20 border-2 border-[var(--night-vision)] mb-6 eye-glow" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
            SEE EVERYTHING
          </h2>

          <p className="text-xl text-gray-300 mb-12 font-mono leading-relaxed">
            Request a demo of Infinite View. Watch as we illuminate your entire attack surface in
            real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <CTAButton href="/contact" variant="alert" size="lg">
              REQUEST DEMO
            </CTAButton>
            <CTAButton href="/solutions" variant="secondary" size="lg">
              VIEW ALL SOLUTIONS
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
