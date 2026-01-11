import type { Metadata } from 'next'
import SolutionCard from '@/components/SolutionCard'
import CTAButton from '@/components/CTAButton'

export const metadata: Metadata = {
  title: 'Solutions | Clawpoint Security',
  description:
    'Strategic cybersecurity solutions designed for business-critical protection. Security assessment, tech stack defense, and protection assurance.',
}

export default function SolutionsPage() {
  return (
    <div className="bg-black min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 tactical-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block border border-[var(--night-vision)] px-4 py-2 mb-6 font-mono text-xs text-[var(--night-vision)] bg-black/50 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 bg-[var(--night-vision)] rounded-full mr-2 eye-glow" />
            BUSINESS CRITICAL CAPABILITIES
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-mono tracking-wider">
            STRATEGIC <span className="text-[var(--night-vision)] text-glow">SOLUTIONS</span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed font-mono">
            Precision-engineered security services for organizations that cannot afford
            compromise. Every solution is objective-focused, threat-aware, and operationally sound.
          </p>
        </div>
      </section>

      {/* Core Solutions */}
      <section id="core-solutions" className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              PROTECTION ASSURANCE SUITE
            </h2>
            <p className="text-xl text-gray-300 font-mono">
              COMPREHENSIVE SECURITY SERVICES
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SolutionCard
              icon={
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
              title="THREAT TRACKING"
              description="Continuous threat hunting and vulnerability assessment. We identify weaknesses before adversaries exploit them."
              features={[
                'Real-time vulnerability scanning',
                'Penetration testing and red team engagements',
                'Threat intelligence integration',
                'Attack surface mapping',
                'Zero-day threat monitoring',
              ]}
            />

            <SolutionCard
              icon={
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              }
              title="TECH STACK DEFENSE"
              description="Comprehensive security hardening for your entire technology ecosystem. From infrastructure to application layer."
              features={[
                'Infrastructure security assessment',
                'Application security testing',
                'Cloud security posture management',
                'Container and Kubernetes security',
                'API security validation',
              ]}
            />

            <SolutionCard
              icon={
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              }
              title="COMPLIANCE SERVICES"
              description="Automated compliance management that bridges the gap between checkboxes and actual security."
              features={[
                'SOC 2, ISO 27001, FedRAMP compliance',
                'Continuous compliance monitoring',
                'Automated evidence collection',
                'Gap analysis and remediation',
                'Audit preparation and support',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section
        id="specialized"
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--tactical-green-dark)] to-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              SPECIALIZED SERVICES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-[var(--tactical-green)] bg-black/80 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] transition-tactical group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 border-2 border-[var(--night-vision)] flex items-center justify-center text-[var(--night-vision)] group-hover:eye-glow transition-all">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white font-mono">INCIDENT RESPONSE</h3>
              </div>
              <p className="text-gray-300 font-mono mb-4 leading-relaxed">
                When the breach happens, response time is everything. Our rapid incident response
                team deploys immediately to contain, investigate, and eliminate threats.
              </p>
              <ul className="space-y-2">
                {[
                  '24/7 emergency response',
                  'Forensic investigation',
                  'Threat containment and eradication',
                  'Recovery and remediation',
                  'Post-incident analysis',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400 font-mono text-sm">
                    <span className="text-[var(--night-vision)] mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[var(--tactical-green)] bg-black/80 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] transition-tactical group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 border-2 border-[var(--night-vision)] flex items-center justify-center text-[var(--night-vision)] group-hover:eye-glow transition-all">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white font-mono">SECURITY HUNTING CENTER</h3>
              </div>
              <p className="text-gray-300 font-mono mb-4 leading-relaxed">
                Your always-on hunting command center. We monitor, analyze, and respond to
                threats 24/7/365, reducing your security team&apos;s cognitive load by 60%.
              </p>
              <ul className="space-y-2">
                {[
                  '24/7/365 threat monitoring',
                  'Security event analysis',
                  'Alert triage and prioritization',
                  'Threat intelligence integration',
                  'Proactive threat hunting',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400 font-mono text-sm">
                    <span className="text-[var(--night-vision)] mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[var(--tactical-green)] bg-black/80 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] transition-tactical group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 border-2 border-[var(--night-vision)] flex items-center justify-center text-[var(--night-vision)] group-hover:eye-glow transition-all">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white font-mono">SECURE DEVELOPMENT</h3>
              </div>
              <p className="text-gray-300 font-mono mb-4 leading-relaxed">
                Build security into your SDLC from the start. We embed with your development teams
                to ensure every release is fortified against threats.
              </p>
              <ul className="space-y-2">
                {[
                  'Secure code review',
                  'DevSecOps pipeline integration',
                  'Security training for developers',
                  'Threat modeling',
                  'Security testing automation',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400 font-mono text-sm">
                    <span className="text-[var(--night-vision)] mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[var(--tactical-green)] bg-black/80 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] transition-tactical group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 border-2 border-[var(--night-vision)] flex items-center justify-center text-[var(--night-vision)] group-hover:eye-glow transition-all">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white font-mono">EXECUTIVE ADVISORY</h3>
              </div>
              <p className="text-gray-300 font-mono mb-4 leading-relaxed">
                Strategic security guidance for leadership teams. We translate technical threats
                into business risk and provide actionable recommendations.
              </p>
              <ul className="space-y-2">
                {[
                  'CISO-as-a-Service',
                  'Security program development',
                  'Risk assessment and reporting',
                  'Board-level security briefings',
                  'Security budget optimization',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400 font-mono text-sm">
                    <span className="text-[var(--night-vision)] mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="absolute inset-0 tactical-grid opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 font-mono tracking-wider">
            STRATEGIC ADVANTAGES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                advantage: 'COGNITIVE LOAD REDUCTION',
                description: 'One point of contact for all security needs. Clear priorities. No noise.',
              },
              {
                advantage: 'OBJECTIVE-DRIVEN',
                description: 'Security aligned with your business objectives, not generic checklists.',
              },
              {
                advantage: 'ALWAYS VIGILANT',
                description: '24/7/365 monitoring and response. Threats never sleep. Neither do we.',
              },
              {
                advantage: 'HUNTER MENTALITY',
                description: 'Elite security professionals. We think like attackers.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border border-[var(--tactical-green)] bg-black/50 backdrop-blur-sm p-6 text-left hover:border-[var(--night-vision)] transition-tactical"
              >
                <h3 className="text-lg font-bold text-[var(--night-vision)] mb-2 font-mono">
                  {item.advantage}
                </h3>
                <p className="text-gray-400 font-mono text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-black via-[var(--tactical-green-dark)] to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
            ACTIVATE SOLUTIONS
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-mono leading-relaxed">
            Every second your security gaps remain open, threats move closer. Engage now.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <CTAButton href="/contact" variant="alert" size="lg">
              REQUEST STRATEGIC ASSESSMENT
            </CTAButton>
            <CTAButton href="/about" variant="secondary" size="lg">
              MEET THE TEAM
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
