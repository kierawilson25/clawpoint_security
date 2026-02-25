'use client'

import { useState } from 'react'

interface DownloadBriefProps {
  variant?: 'inline' | 'banner'
  className?: string
  title?: string
  hideLabel?: boolean
}

export default function DownloadBrief({ variant = 'inline', className = '', title = 'CLAWPOINT SECURITY BRIEF', hideLabel = false }: DownloadBriefProps) {
  const [isHovered, setIsHovered] = useState(false)

  if (variant === 'banner') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* Tactical grid background */}
        <div className="absolute inset-0 tactical-grid opacity-5" />

        <div className="relative z-10 border border-[var(--tactical-green-dark)] bg-black/80 backdrop-blur-sm p-8 hover:border-[var(--night-vision)] transition-all duration-300 group">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left side - Text content */}
            <div className="flex-1 text-center md:text-left">
              {!hideLabel && (
                <div className="inline-block border border-[var(--night-vision)] px-3 py-1 mb-4 font-mono text-xs text-[var(--night-vision)] bg-black/50">
                  <span className="inline-block w-1.5 h-1.5 bg-[var(--night-vision)] rounded-full mr-2 eye-glow" />
                  SECURITY OVERVIEW
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2 font-mono tracking-wider">
                {title}
              </h3>
              <p className="text-gray-400 font-mono text-sm">
                Download our comprehensive security overview and capabilities brief
              </p>
            </div>

            {/* Right side - Download button */}
            <div>
              <a
                href="/downloads/clawpoint-brief.pdf"
                download
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[var(--tactical-green)] bg-black hover:bg-[var(--tactical-green-dark)] hover:border-[var(--night-vision)] text-white font-mono font-bold text-sm tracking-wider transition-all duration-300 group-hover:scale-105 relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Scan line effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/20 to-transparent transition-transform duration-700 ${
                    isHovered ? 'translate-x-full' : '-translate-x-full'
                  }`}
                />

                <svg
                  className="w-5 h-5 relative z-10"
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
                <span className="relative z-10">DOWNLOAD BRIEF</span>

                {/* Tactical corners */}
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Inline variant - compact button
  return (
    <a
      href="/downloads/clawpoint-brief.pdf"
      download
      className={`inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--tactical-green)] bg-black hover:bg-[var(--tactical-green-dark)] hover:border-[var(--night-vision)] text-white font-mono font-bold text-sm tracking-wider transition-all duration-300 relative overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scan line effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-[var(--night-vision)]/20 to-transparent transition-transform duration-700 ${
          isHovered ? 'translate-x-full' : '-translate-x-full'
        }`}
      />

      <svg
        className="w-4 h-4 relative z-10"
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
      <span className="relative z-10">DOWNLOAD BRIEF</span>

      {/* Tactical corners */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  )
}
