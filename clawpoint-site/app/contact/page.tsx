'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

// Note: Metadata export doesn't work in client components, but leaving for reference
// In production, you'd move the form logic to a separate client component

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    interest: 'general',
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    // Simulate form submission
    // In production, integrate with your backend API
    setTimeout(() => {
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        organization: '',
        phone: '',
        interest: 'general',
        message: '',
      })
    }, 1500)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="bg-black min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 tactical-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block border border-[var(--night-vision)] px-4 py-2 mb-6 font-mono text-xs text-[var(--night-vision)] bg-black/50 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 bg-[var(--night-vision)] rounded-full mr-2 eye-glow" />
            SECURE COMMUNICATION CHANNEL
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-mono tracking-wider">
            INITIATE <span className="text-[var(--night-vision)] text-glow">CONTACT</span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed font-mono">
            Ready to engage? Establish secure communication with our hunting team.
            Response time: under 4 hours.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 font-mono tracking-wider border-l-4 border-[var(--night-vision)] pl-6">
                CONTACT CHANNELS
              </h2>

              <div className="space-y-6 mb-12">
                <div className="border border-[var(--tactical-green)] bg-black/50 backdrop-blur-sm p-6">
                  <h3 className="text-sm font-mono font-bold text-[var(--night-vision)] mb-2 tracking-wider">
                    EMERGENCY RESPONSE
                  </h3>
                  <p className="text-white font-mono text-lg">1-800-CLAW-911</p>
                  <p className="text-gray-500 font-mono text-xs mt-1">24/7/365 Incident Hotline</p>
                </div>

                <div className="border border-[var(--tactical-green)] bg-black/50 backdrop-blur-sm p-6">
                  <h3 className="text-sm font-mono font-bold text-[var(--night-vision)] mb-2 tracking-wider">
                    GENERAL INQUIRIES
                  </h3>
                  <p className="text-white font-mono text-lg">contact@clawpoint.security</p>
                  <p className="text-gray-500 font-mono text-xs mt-1">Response within 4 hours</p>
                </div>

                <div className="border border-[var(--tactical-green)] bg-black/50 backdrop-blur-sm p-6">
                  <h3 className="text-sm font-mono font-bold text-[var(--night-vision)] mb-2 tracking-wider">
                    RECRUITMENT
                  </h3>
                  <p className="text-white font-mono text-lg">careers@clawpoint.security</p>
                  <p className="text-gray-500 font-mono text-xs mt-1">Join the hunt</p>
                </div>
              </div>

              <div className="border-t border-[var(--tactical-green-dark)] pt-8">
                <h3 className="text-xl font-bold text-white mb-4 font-mono">HEADQUARTERS</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  Classified Location
                  <br />
                  Operational Globally
                  <br />
                  Encrypted Communications Only
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="border-2 border-[var(--tactical-green)] bg-black p-8 relative">
              {/* Tactical corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[var(--night-vision)]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[var(--night-vision)]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[var(--night-vision)]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[var(--night-vision)]" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-mono text-sm font-bold mb-2 tracking-wider">
                    OPERATOR NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-[var(--tactical-green)] text-white font-mono text-sm focus:border-[var(--night-vision)] focus:outline-none transition-tactical"
                    placeholder="John Operator"
                  />
                </div>

                <div>
                  <label className="block text-white font-mono text-sm font-bold mb-2 tracking-wider">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-[var(--tactical-green)] text-white font-mono text-sm focus:border-[var(--night-vision)] focus:outline-none transition-tactical"
                    placeholder="contact@organization.com"
                  />
                </div>

                <div>
                  <label className="block text-white font-mono text-sm font-bold mb-2 tracking-wider">
                    ORGANIZATION *
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-[var(--tactical-green)] text-white font-mono text-sm focus:border-[var(--night-vision)] focus:outline-none transition-tactical"
                    placeholder="Your Organization"
                  />
                </div>

                <div>
                  <label className="block text-white font-mono text-sm font-bold mb-2 tracking-wider">
                    PHONE
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-[var(--tactical-green)] text-white font-mono text-sm focus:border-[var(--night-vision)] focus:outline-none transition-tactical"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-white font-mono text-sm font-bold mb-2 tracking-wider">
                    MISSION OBJECTIVE *
                  </label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black border border-[var(--tactical-green)] text-white font-mono text-sm focus:border-[var(--night-vision)] focus:outline-none transition-tactical"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="assessment">Security Assessment</option>
                    <option value="incident">Incident Response</option>
                    <option value="soc">SOC Services</option>
                    <option value="infinite-view">Infinite View Demo</option>
                    <option value="careers">Career Opportunities</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-mono text-sm font-bold mb-2 tracking-wider">
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-black border border-[var(--tactical-green)] text-white font-mono text-sm focus:border-[var(--night-vision)] focus:outline-none transition-tactical resize-none"
                    placeholder="Describe your security requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full px-8 py-4 font-mono font-bold text-sm tracking-wider transition-tactical border ${
                    status === 'submitting'
                      ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                      : 'bg-[var(--night-vision)] text-black border-[var(--night-vision)] hover:bg-white hover:border-white hover:shadow-[0_0_30px_rgba(0,255,65,0.8)] pulse-predator'
                  }`}
                >
                  {status === 'submitting' ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
                </button>

                {status === 'success' && (
                  <div className="border border-[var(--night-vision)] bg-[var(--tactical-green-dark)] p-4 text-center">
                    <p className="text-[var(--night-vision)] font-mono text-sm font-bold">
                      MESSAGE RECEIVED. RESPONSE INBOUND.
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="border border-[var(--night-vision)] bg-[var(--tactical-green-dark)] p-4 text-center">
                    <p className="text-white font-mono text-sm font-bold">
                      TRANSMISSION FAILED. TRY ALTERNATE CHANNEL.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="relative py-48 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[var(--tactical-green-dark)] to-black">
        <div className="max-w-4xl mx-auto">
          <div className="border border-[var(--tactical-green)] bg-black/80 backdrop-blur-sm p-8 text-center">
            <h3 className="text-2xl font-bold text-[var(--night-vision)] mb-4 font-mono">
              SECURE COMMUNICATIONS PROTOCOL
            </h3>
            <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6">
              All communications are encrypted end-to-end. For highly sensitive matters, we can
              arrange secure channels including PGP-encrypted email, Signal, or air-gapped
              communication systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-gray-500">
              <span>TLS 1.3 ENCRYPTION</span>
              <span>|</span>
              <span>ZERO KNOWLEDGE</span>
              <span>|</span>
              <span>NO LOGS</span>
              <span>|</span>
              <span>GDPR COMPLIANT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="relative py-48 px-4 sm:px-6 lg:px-8 border-t border-[var(--tactical-green-dark)]">
        <div className="absolute inset-0 tactical-grid opacity-10" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono tracking-wider">
              ALTERNATIVE CHANNELS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[var(--tactical-green)] bg-black p-6 text-center hover:border-[var(--night-vision)] transition-tactical">
              <div className="w-16 h-16 border-2 border-[var(--night-vision)] flex items-center justify-center text-[var(--night-vision)] text-2xl mx-auto mb-4">
                📞
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-mono">SCHEDULE CALL</h3>
              <p className="text-gray-400 font-mono text-sm mb-4">
                Book a secure video briefing with our team
              </p>
              <button className="text-[var(--night-vision)] font-mono text-sm hover:text-glow transition-all">
                CALENDAR LINK →
              </button>
            </div>

            <div className="border border-[var(--tactical-green)] bg-black p-6 text-center hover:border-[var(--night-vision)] transition-tactical">
              <div className="w-16 h-16 border-2 border-[var(--night-vision)] flex items-center justify-center text-[var(--night-vision)] text-2xl mx-auto mb-4">
                🔐
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-mono">PGP KEY</h3>
              <p className="text-gray-400 font-mono text-sm mb-4">
                Download our public key for encrypted email
              </p>
              <button className="text-[var(--night-vision)] font-mono text-sm hover:text-glow transition-all">
                DOWNLOAD KEY →
              </button>
            </div>

            <div className="border border-[var(--tactical-green)] bg-black p-6 text-center hover:border-[var(--night-vision)] transition-tactical">
              <div className="w-16 h-16 border-2 border-[var(--night-vision)] flex items-center justify-center text-[var(--night-vision)] text-2xl mx-auto mb-4">
                💬
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-mono">SIGNAL</h3>
              <p className="text-gray-400 font-mono text-sm mb-4">
                Secure messaging for urgent matters
              </p>
              <button className="text-[var(--night-vision)] font-mono text-sm hover:text-glow transition-all">
                GET NUMBER →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="relative py-56 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-black via-[var(--tactical-green-dark)] to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-mono tracking-wider">
            RAPID RESPONSE GUARANTEE
          </h2>
          <p className="text-xl text-gray-300 mb-8 font-mono leading-relaxed">
            We understand that security threats do not wait for business hours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-[var(--tactical-green)] bg-black/50 backdrop-blur-sm p-8">
              <div className="text-5xl font-bold text-[var(--night-vision)] mb-2 font-mono">
                &lt; 4 hours
              </div>
              <div className="text-sm text-gray-400 font-mono">GENERAL INQUIRIES</div>
            </div>

            <div className="border-2 border-white bg-white/10 p-8">
              <div className="text-5xl font-bold text-white mb-2 font-mono eye-glow">
                &lt; 15 min
              </div>
              <div className="text-sm text-gray-400 font-mono">EMERGENCY RESPONSE</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
