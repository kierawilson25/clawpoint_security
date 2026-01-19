'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import CTAButton from './CTAButton'

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/information', label: 'Information' },
  { href: '/infinite-view', label: 'Infinite View' },
  { href: '/contact', label: 'Contact' }
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Track scroll position for backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-tactical-green-dark' : 'bg-transparent'
      }`}
    >
      {/* Scanline effect overlay */}
      <div className="scanline" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/logo.png"
                alt="Clawpoint Security"
                fill
                className="object-contain drop-shadow-[0_0_10px_rgba(0,255,65,0.3)]"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-mono font-bold text-lg tracking-wider">
                CLAWPOINT
              </span>
              <span className="text-night-vision font-mono font-bold text-lg tracking-wider ml-2">
                SECURITY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono text-sm tracking-wider uppercase transition-all duration-300 relative group ${
                  pathname === link.href
                    ? 'text-night-vision'
                    : 'text-gray-300 hover:text-night-vision'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-night-vision transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <CTAButton href="/contact" variant="alert" size="sm">
              Secure Now
            </CTAButton>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-night-vision transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-night-vision transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-night-vision transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />

            {/* Tactical corners */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-night-vision opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-night-vision opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-24 bg-black/98 backdrop-blur-lg transition-all duration-500 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Tactical grid background */}
        <div className="absolute inset-0 tactical-grid opacity-10" />

        {/* Mobile navigation links */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 px-4">
          {navigationLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-mono text-2xl tracking-wider uppercase transition-all duration-300 relative group ${
                pathname === link.href
                  ? 'text-night-vision scale-110'
                  : 'text-gray-300 hover:text-night-vision hover:scale-110'
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.3s ease-out ${index * 50}ms`
              }}
            >
              {link.label}

              {/* Tactical bracket decoration */}
              <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-tactical-green opacity-0 group-hover:opacity-100 transition-opacity">
                {'['}
              </span>
              <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-tactical-green opacity-0 group-hover:opacity-100 transition-opacity">
                {']'}
              </span>
            </Link>
          ))}

          {/* Mobile CTA */}
          <div
            className="mt-8"
            style={{
              animationDelay: `${navigationLinks.length * 50}ms`,
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.3s ease-out ${navigationLinks.length * 50}ms`
            }}
          >
            <CTAButton href="/contact" variant="alert" size="lg">
              Secure Now
            </CTAButton>
          </div>

          {/* Status indicator */}
          <div
            className="mt-12 flex items-center gap-3 font-mono text-sm text-night-vision/60"
            style={{
              animationDelay: `${(navigationLinks.length + 1) * 50}ms`,
              opacity: isMenuOpen ? 1 : 0,
              transition: `all 0.3s ease-out ${(navigationLinks.length + 1) * 50}ms`
            }}
          >
            <span className="inline-block w-2 h-2 bg-night-vision rounded-full eye-glow" />
            HUNTERS READY
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border-2 border-tactical-green/20 rotate-45" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-night-vision/20" />
      </div>
    </nav>
  )
}
