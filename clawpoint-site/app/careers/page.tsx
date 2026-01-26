import type { Metadata } from 'next'
import CTAButton from '@/components/CTAButton'

export const metadata: Metadata = {
  title: 'Careers | Clawpoint Security Collective',
  description:
    'Join the hunt. Elite cybersecurity hunters wanted for business-critical security services.',
}

export default function CareersPage() {
  const openPositions = [
    {
      title: 'SENIOR THREAT HUNTER',
      type: 'FULL-TIME | REMOTE',
      description:
        'Track and eliminate advanced persistent threats. Requires offensive security mindset and intelligence community experience.',
      requirements: [
        '5+ years in offensive security or threat intelligence',
        'Advanced penetration testing skills',
        'Experience with threat hunting frameworks',
        'Clearance eligible',
      ],
    },
    {
      title: 'SECURITY OPERATIONS ANALYST',
      type: 'FULL-TIME | HYBRID',
      description:
        'Monitor, analyze, and respond to security events. Be the eyes that never blink in our 24/7 operations center.',
      requirements: [
        '3+ years SOC experience',
        'SIEM platform expertise',
        'Incident response experience',
        'Security certifications (GCIH, GCIA, or equivalent)',
      ],
    },
    {
      title: 'CLOUD SECURITY ENGINEER',
      type: 'FULL-TIME | REMOTE',
      description:
        'Fortify cloud infrastructure across AWS, Azure, and GCP. Design and implement defense-in-depth strategies.',
      requirements: [
        '4+ years cloud security experience',
        'Infrastructure as Code expertise',
        'Container security knowledge',
        'Cloud security certifications',
      ],
    },
    {
      title: 'APPLICATION SECURITY SPECIALIST',
      type: 'FULL-TIME | REMOTE',
      description:
        'Embed with development teams to build security into every line of code. Break things before adversaries do.',
      requirements: [
        '3+ years application security',
        'Secure code review experience',
        'OWASP Top 10 expertise',
        'Modern development frameworks knowledge',
      ],
    },
  ]

  return (
    <div className="bg-black min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 tactical-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block border border-[var(--night-vision)] px-4 py-2 mb-6 font-mono text-xs text-[var(--night-vision)] bg-black/50 backdrop-blur-sm stalk-in" style={{ animationDelay: '0.2s' }}>
            <span className="inline-block w-2 h-2 bg-[var(--night-vision)] rounded-full mr-2 eye-glow" />
            RECRUITMENT | JOIN THE PACK
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-mono tracking-wider stalk-in" style={{ animationDelay: '0.4s' }}>
            JOIN THE <span className="text-[var(--night-vision)] text-glow">HUNT</span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed font-mono mb-8 stalk-in" style={{ animationDelay: '0.6s' }}>
            We are building an elite pack of security hunters who think like predators, plan like
            strategists, and execute with precision. If you have the mentality, we want you on the
            team.
          </p>
        </div>
      </section>

      {/* What We Look For */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              OPERATOR PROFILE
            </h2>
            <p className="text-xl text-gray-300 font-mono">WHAT MAKES A CLAWPOINT OPERATOR</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                trait: 'HUNTER MENTALITY',
                description:
                  'You think like an attacker. You anticipate threats before they materialize. You never stop learning adversary tactics.',
              },
              {
                trait: 'PREDATORY PRECISION',
                description:
                  'You execute with precise accuracy. Every action is deliberate, measured, and effective. No wasted motion.',
              },
              {
                trait: 'OBJECTIVE FOCUS',
                description:
                  'You understand that security serves a purpose beyond compliance. You align protection with operational objectives.',
              },
              {
                trait: 'RELENTLESS',
                description:
                  'You do not give up. When others log off, you continue the hunt. Persistence is your superpower.',
              },
              {
                trait: 'PACK HUNTER',
                description:
                  'You trust your pack. You communicate clearly. You coordinate seamlessly. One hunt, one pack.',
              },
              {
                trait: 'CONTINUOUS LEARNING',
                description:
                  'The threat landscape evolves daily. You stay ahead through relentless study, practice, and adaptation.',
              },
            ].map((trait, index) => (
              <div
                key={index}
                className="border border-[var(--tactical-green)] bg-black p-6 hover:border-[var(--night-vision)] transition-tactical group"
              >
                <h3 className="text-xl font-bold text-[var(--night-vision)] mb-3 font-mono">
                  {trait.trait}
                </h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  {trait.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--tactical-green-dark)] to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              OPERATOR BENEFITS
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                benefit: 'COMPETITIVE COMPENSATION',
                description: 'Top-tier salaries and equity. Elite hunters deserve elite compensation.',
              },
              {
                benefit: 'TRAINING BUDGET',
                description:
                  'Unlimited training, certifications, and conference attendance. Never stop sharpening your edge.',
              },
              {
                benefit: 'REMOTE FIRST',
                description: 'Work from anywhere. Hunt threats from your optimal environment.',
              },
              {
                benefit: 'CUTTING-EDGE TOOLS',
                description: 'Access to the best security tools and technologies. No expense spared.',
              },
              {
                benefit: 'MISSION VARIETY',
                description:
                  'Work across diverse sectors and threat landscapes. Government, defense, finance, tech.',
              },
              {
                benefit: 'TACTICAL AUTONOMY',
                description: 'Trusted to make decisions. Empowered to take action. No micromanagement.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border-l-4 border-[var(--night-vision)] pl-6 py-4 bg-black/50 backdrop-blur-sm hover:bg-[var(--tactical-green-dark)]/20 transition-tactical"
              >
                <h3 className="text-xl font-bold text-white mb-2 font-mono">{item.benefit}</h3>
                <p className="text-gray-300 font-mono text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="absolute inset-0 tactical-grid opacity-10" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              OPEN POSITIONS
            </h2>
            <p className="text-xl text-gray-300 font-mono">CURRENTLY RECRUITING</p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="border border-[var(--tactical-green)] bg-black p-8 hover:border-[var(--night-vision)] transition-tactical group"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-mono">
                      {position.title}
                    </h3>
                    <p className="text-[var(--night-vision)] font-mono text-sm">{position.type}</p>
                  </div>
                  <CTAButton href="/contact" variant="secondary" size="sm">
                    APPLY NOW
                  </CTAButton>
                </div>

                <p className="text-gray-300 font-mono mb-6 leading-relaxed">
                  {position.description}
                </p>

                <div>
                  <h4 className="text-white font-mono font-bold mb-3 text-sm tracking-wider">
                    REQUIREMENTS:
                  </h4>
                  <ul className="space-y-2">
                    {position.requirements.map((req, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-400 font-mono text-sm"
                      >
                        <span className="text-[var(--night-vision)] mt-0.5">▸</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--tactical-green-dark)] to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              SELECTION PROCESS
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                stage: '01',
                title: 'INITIAL CONTACT',
                description:
                  'Submit your application. Include resume, cover letter explaining why you hunt, and links to published research or tools.',
              },
              {
                stage: '02',
                title: 'TECHNICAL ASSESSMENT',
                description:
                  'Demonstrate your skills through practical challenges. Real-world scenarios, no trivia.',
              },
              {
                stage: '03',
                title: 'STRATEGIC INTERVIEW',
                description:
                  'Meet the pack. Discuss your approach to security, past engagements, lessons learned.',
              },
              {
                stage: '04',
                title: 'FINAL SELECTION',
                description:
                  'Meet leadership. Discuss objective alignment, team fit, and your role in the hunt.',
              },
            ].map((stage, index) => (
              <div
                key={index}
                className="flex gap-6 items-start border-l-4 border-[var(--night-vision)] pl-6"
              >
                <div className="flex-shrink-0 w-12 h-12 border-2 border-[var(--night-vision)] flex items-center justify-center text-[var(--night-vision)] text-xl font-bold font-mono">
                  {stage.stage}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 font-mono">{stage.title}</h3>
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
            READY TO JOIN?
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-mono leading-relaxed">
            If you have what it takes to be part of an elite security operations team, we want to
            hear from you.
          </p>
          <CTAButton href="/contact" variant="alert" size="lg">
            SUBMIT APPLICATION
          </CTAButton>
        </div>
      </section>
    </div>
  )
}
