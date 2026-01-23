import type { Metadata } from 'next'
import SolutionCard from '@/components/SolutionCard'
import CTAButton from '@/components/CTAButton'
import DownloadBrief from '@/components/DownloadBrief'

export const metadata: Metadata = {
  title: 'Solutions | Clawpoint Security Collective',
  description:
    'Mission-centric assurance, cyber operations design, and security architecture services. We transform compliance into operational advantage.',
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
            OUR SERVICES
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-mono tracking-wider">
            EMPOWER YOUR <span className="text-[var(--night-vision)] text-glow">CYBER STRATEGY</span> WITH CLAWPOINT SECURITY COLLECTIVE
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed font-mono">
            We turn frameworks into force multipliers—linking controls to real threats, workflows, and outcomes.
          </p>
        </div>
      </section>

      {/* Core Solutions */}
      <section id="core-solutions" className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
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
              title="MISSION-CENTRIC ASSURANCE"
              description="Compliance reframed as operational advantage. We turn frameworks into force multipliers—linking RMF/CSF/FedRAMP controls to real threats, real workflows, and real outcomes. Instead of paperwork for auditors, you get instruments for operators: control sets tied to attack paths, evidence pipelines that auto-collect from your stack, and metrics that track readiness the same way you track revenue. The result is assurance that moves with the mission—faster approvals, cleaner risk decisions, and controls that harden every day you use them."
              features={[
                'RMF/CSF/FedRAMP framework integration',
                'Control sets tied to attack paths',
                'Automated evidence pipelines',
                'Revenue-style readiness metrics',
                'Faster approvals and cleaner risk decisions',
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
              title="CYBER OPERATIONS DESIGN"
              description="Build what matters. Lead what you design. We help you architect cyber programs that actually ship outcomes—operating models, playbooks, and automation that scale with your business. From intake and triage to incident response and recovery, we define crisp roles, measurable SLAs, and 'detectors-to-decisions' workflows that reduce dwell time. Expect tight SIEM/SOAR integrations, purple-team feedback loops, and dashboards that turn KPIs into action. We'll coach your leaders to run the mission, not the fire drill—so your team owns the design and the results."
              features={[
                'Operating models and playbooks',
                'Scalable automation',
                'Crisp roles and measurable SLAs',
                '"Detectors-to-decisions" workflows',
                'SIEM/SOAR integrations',
                'Purple-team feedback loops',
                'Actionable KPI dashboards',
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              }
              title="SECURITY ARCHITECTURE & THREAT INTELLIGENCE"
              description="Infinite View is our concept-stage analyst augmentation tool—built to bridge telemetry gaps, normalize chaos, and slash time-to-decision in mission-first environments. It stitches together alerts, logs, identity, and intel into a single, living picture of risk—ranked by business impact and mapped to ATT&CK. Instead of swivel-chair hunting, analysts get a guided path from signal to story to action."
              features={[
                'Bridges telemetry gaps',
                'Normalizes chaos across systems',
                'Reduces time-to-decision',
                'Unifies alerts, logs, identity, and intel',
                'Business impact-ranked risk view',
                'ATT&CK framework mapping',
                'Guided workflow from signal to action',
              ]}
            />
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

      {/* Intelligence Categories */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--tactical-green-dark)] to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              INTELLIGENCE CATEGORIES
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'THREAT INTELLIGENCE',
              'INCIDENT RESPONSE',
              'CLOUD SECURITY',
              'CONTAINER DEFENSE',
              'COMPLIANCE',
              'THREAT HUNTING',
              'RED TEAM HUNTS',
              'DEVSECOPS',
              'ZERO TRUST',
              'API SECURITY',
              'SUPPLY CHAIN',
              'HUNTING TACTICS',
            ].map((topic, index) => (
              <div
                key={index}
                className="border border-[var(--tactical-green-dark)] bg-black px-4 py-3 text-center hover:border-[var(--night-vision)] hover:bg-[var(--tactical-green-dark)]/20 transition-tactical cursor-pointer"
              >
                <span className="text-gray-400 hover:text-white font-mono text-xs tracking-wider transition-colors">
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
            READY TO DESIGN YOUR NEXT MOVE?
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-mono leading-relaxed">
            Join the Hunt
          </p>

          <DownloadBrief variant="banner" className="mb-16" />

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <CTAButton href="/contact" variant="alert" size="lg">
              CONTACT US
            </CTAButton>
            <CTAButton href="/about" variant="secondary" size="lg">
              LEARN MORE
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
