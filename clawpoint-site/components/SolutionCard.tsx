'use client'

import { ReactNode } from 'react'

interface SolutionCardProps {
  icon: ReactNode
  title: string
  description: string
  features: string[]
  className?: string
}

const SolutionCard = ({
  icon,
  title,
  description,
  features,
  className = '',
}: SolutionCardProps) => {
  return (
    <div
      className={`group relative bg-black border border-[var(--tactical-green-dark)] hover:border-[var(--night-vision)] transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Tactical grid background */}
      <div className="absolute inset-0 tactical-grid opacity-20" />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--tactical-green-dark)] via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

      <div className="relative p-6 space-y-4">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 border-2 border-[var(--night-vision)] text-[var(--night-vision)] group-hover:eye-glow transition-all duration-300">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-white font-mono font-bold text-xl tracking-wider border-l-2 border-[var(--night-vision)] pl-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 font-mono text-sm leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2 pt-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start space-x-2 text-gray-300 font-mono text-xs"
            >
              <span className="text-[var(--night-vision)] mt-1 flex-shrink-0">▸</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Tactical corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--night-vision)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  )
}

export default SolutionCard
