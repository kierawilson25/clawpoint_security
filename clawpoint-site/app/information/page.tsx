import type { Metadata } from 'next'
import CTAButton from '@/components/CTAButton'

export const metadata: Metadata = {
  title: 'Intel Hub | Clawpoint Security Collective',
  description:
    'Threat intelligence, security research, and strategic insights from the front lines of cybersecurity hunts.',
}

export default function InformationPage() {
  const articles = [
    {
      category: 'THREAT INTELLIGENCE',
      title: 'The Compliance-Reality Gap: Where Threats Breed',
      excerpt:
        'Compliance frameworks check boxes. Real security demands gap hunting. Learn how to identify and eliminate the dangerous space between certified and secure.',
      readTime: '8 min',
    },
    {
      category: 'HUNTING TACTICS',
      title: 'Cognitive Load: The Silent Killer of Security Programs',
      excerpt:
        'Your security team is drowning in alerts. Decision fatigue is setting in. Here is how hunting command centers reduce cognitive load by 60%.',
      readTime: '6 min',
    },
    {
      category: 'TECH STACK DEFENSE',
      title: 'Container Security: Beyond the OWASP Checklist',
      excerpt:
        'Kubernetes adoption is exploding. So are container-based attacks. Advanced tactics for defending containerized environments in production.',
      readTime: '12 min',
    },
    {
      category: 'INCIDENT RESPONSE',
      title: 'The First 15 Minutes: Tactical Incident Response',
      excerpt:
        'When the breach happens, the clock starts. What you do in the first 15 minutes determines if you contain or catastrophe. Operator playbook inside.',
      readTime: '10 min',
    },
    {
      category: 'THREAT HUNTING',
      title: 'Advanced Persistent Threats: Hunter vs Hunted',
      excerpt:
        'APT groups are patient, sophisticated, and relentless. Learn the mindset and methodology for hunting threats that hide in plain sight.',
      readTime: '15 min',
    },
    {
      category: 'CLOUD SECURITY',
      title: 'Multi-Cloud Defense: Tactical Considerations',
      excerpt:
        'AWS, Azure, GCP - each with unique attack surfaces. Strategic approach to unified security posture across cloud providers.',
      readTime: '9 min',
    },
  ]

  const resources = [
    {
      title: 'THREAT HUNTING FRAMEWORK',
      description: 'Our open-source framework for systematic threat hunting operations.',
      type: 'GITHUB REPO',
    },
    {
      title: 'SECURITY ASSESSMENT TOOLKIT',
      description: 'Automated tools for vulnerability scanning and security posture evaluation.',
      type: 'DOWNLOAD',
    },
    {
      title: 'COMPLIANCE MAPPING GUIDE',
      description: 'Map compliance requirements to actual security controls. SOC 2, ISO 27001, FedRAMP.',
      type: 'PDF GUIDE',
    },
    {
      title: 'INCIDENT RESPONSE PLAYBOOK',
      description: 'Step-by-step strategic playbook for common incident scenarios.',
      type: 'PDF GUIDE',
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
            INTELLIGENCE BRIEFING | RESOURCES
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-mono tracking-wider stalk-in" style={{ animationDelay: '0.4s' }}>
            INTEL <span className="text-[var(--night-vision)] text-glow">HUB</span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed font-mono stalk-in" style={{ animationDelay: '0.6s' }}>
            Threat intelligence, strategic insights, and hunting knowledge from the front lines.
            Real-world security lessons learned in the field.
          </p>
        </div>
      </section>

      {/* Latest Intel */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider border-l-4 border-[var(--night-vision)] pl-6">
              LATEST INTELLIGENCE
            </h2>
            <p className="text-lg text-gray-400 font-mono pl-6">
              Fresh from the field. Strategic insights and hunting lessons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <article
                key={index}
                className="border border-[var(--tactical-green)] bg-black p-6 hover:border-[var(--night-vision)] transition-tactical group cursor-pointer"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 border border-[var(--night-vision)] text-[var(--night-vision)] font-mono text-xs tracking-wider">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 font-mono group-hover:text-[var(--night-vision)] transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-400 font-mono text-sm mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--tactical-green-dark)]">
                  <span className="text-gray-500 font-mono text-xs">{article.readTime} read</span>
                  <span className="text-[var(--night-vision)] font-mono text-xs group-hover:text-glow transition-all">
                    READ MORE →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--tactical-green-dark)] to-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider border-l-4 border-[var(--night-vision)] pl-6">
              TACTICAL RESOURCES
            </h2>
            <p className="text-lg text-gray-400 font-mono pl-6">
              Tools, frameworks, and guides from our hunts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="border border-[var(--tactical-green)] bg-black/80 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] transition-tactical group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
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
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-mono text-[var(--tactical-green)] border border-[var(--tactical-green)] px-2 py-1">
                    {resource.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 font-mono group-hover:text-[var(--night-vision)] transition-colors">
                  {resource.title}
                </h3>

                <p className="text-gray-400 font-mono text-sm mb-4">{resource.description}</p>

                <div className="flex items-center gap-2 text-[var(--night-vision)] font-mono text-sm">
                  <span>ACCESS RESOURCE</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="absolute inset-0 tactical-grid opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
            INTELLIGENCE BRIEFINGS
          </h2>
          <p className="text-xl text-gray-300 mb-8 font-mono leading-relaxed">
            Weekly threat intelligence and tactical insights delivered to your inbox. No spam. No
            marketing. Just actionable security intel.
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="operator@organization.com"
                className="flex-1 px-6 py-3 bg-black border border-[var(--tactical-green)] text-white font-mono text-sm focus:border-[var(--night-vision)] focus:outline-none transition-tactical"
              />
              <button className="px-8 py-3 bg-[var(--tactical-green)] text-white font-mono font-bold text-sm tracking-wider hover:bg-[var(--tactical-green-light)] transition-tactical border border-[var(--tactical-green)]">
                SUBSCRIBE
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500 font-mono">
            ENCRYPTED DELIVERY | UNSUBSCRIBE ANYTIME | ZERO SPAM POLICY
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
            NEED STRATEGIC SUPPORT?
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-mono leading-relaxed">
            Reading about security is valuable. Having expert hunters on your team is business-critical.
          </p>
        </div>
      </section>
    </div>
  )
}
