'use client'

import Link from 'next/link'
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'alert' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  className?: string
}

interface LinkButtonProps extends BaseButtonProps {
  href: string
  onClick?: never
  type?: never
}

interface ActionButtonProps extends BaseButtonProps {
  href?: never
  onClick?: () => void
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

type CTAButtonProps = LinkButtonProps | ActionButtonProps

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-tactical-green border-tactical-green-light text-white hover:bg-tactical-green-light hover:border-night-vision hover:shadow-[0_0_30px_rgba(0,255,65,0.3)]',
  secondary: 'bg-transparent border-tactical-green text-night-vision hover:bg-tactical-green-dark hover:border-night-vision hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]',
  alert: 'bg-night-vision/10 border-night-vision text-night-vision hover:bg-night-vision/20 hover:shadow-[0_0_40px_rgba(0,255,65,0.4)] pulse-predator',
  ghost: 'bg-transparent border-transparent text-tactical-green-light hover:text-night-vision hover:bg-tactical-green-dark/30'
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

export default function CTAButton({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  onClick,
  type = 'button'
}: CTAButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center border-2 font-mono font-bold tracking-wider uppercase transition-all duration-300 relative overflow-hidden group whitespace-nowrap'

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  // Scanline overlay effect
  const scanlineOverlay = (
    <span className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="absolute inset-0 bg-gradient-to-b from-transparent via-night-vision/5 to-transparent animate-[scanline_2s_linear_infinite]" />
    </span>
  )

  // Tactical corners that appear on hover
  const tacticalCorners = (
    <>
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-night-vision opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-night-vision opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-night-vision opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-night-vision opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </>
  )

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {tacticalCorners}
        {scanlineOverlay}
        <span className="relative z-10">{children}</span>
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {tacticalCorners}
      {scanlineOverlay}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
