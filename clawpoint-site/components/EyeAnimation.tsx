'use client'

import { useEffect, useRef, useState } from 'react'

const EyeAnimation = () => {
  const eyeRef = useRef<HTMLDivElement>(null)
  const pupilRef = useRef<HTMLDivElement>(null)
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current || !pupilRef.current || isBlinking) return

      const eye = eyeRef.current.getBoundingClientRect()
      const eyeCenterX = eye.left + eye.width / 2
      const eyeCenterY = eye.top + eye.height / 2

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX)
      const distance = Math.min(
        Math.sqrt(
          Math.pow(e.clientX - eyeCenterX, 2) + Math.pow(e.clientY - eyeCenterY, 2)
        ) / 20,
        20
      )

      const pupilX = Math.cos(angle) * distance
      const pupilY = Math.sin(angle) * distance

      pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`
    }

    // Random blinking
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, Math.random() * 3000 + 2000)

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(blinkInterval)
    }
  }, [isBlinking])

  return (
    <div className="flex items-center justify-center min-h-[400px] relative">
      {/* Outer eye container */}
      <div
        ref={eyeRef}
        className="relative w-64 h-64 rounded-full bg-gradient-to-br from-black via-[var(--tactical-green-dark)] to-black border-4 border-[var(--night-vision)] shadow-[0_0_40px_rgba(0,255,65,0.3)] overflow-hidden"
      >
        {/* Eye white/sclera */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-900 to-black" />

        {/* Iris */}
        <div className="absolute inset-8 rounded-full bg-gradient-radial from-[var(--night-vision)] via-[var(--tactical-green)] to-[var(--tactical-green-dark)] shadow-inner">
          {/* Iris patterns */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-full h-0.5 bg-black origin-left"
                style={{
                  transform: `rotate(${i * 30}deg)`,
                }}
              />
            ))}
          </div>

          {/* Pupil container for movement */}
          <div
            ref={pupilRef}
            className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
          >
            {/* Pupil */}
            <div className="w-16 h-16 rounded-full bg-black shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              {/* Pupil highlight */}
              <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-[var(--night-vision)] opacity-40 blur-sm" />
            </div>
          </div>
        </div>

        {/* Eyelid for blinking */}
        <div
          className={`absolute inset-0 bg-black transition-all duration-150 ${
            isBlinking ? 'translate-y-0' : '-translate-y-full'
          }`}
        />

        {/* Tactical scan lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-[var(--night-vision)] opacity-10"
              style={{ top: `${(i + 1) * 12.5}%` }}
            />
          ))}
        </div>

        {/* Glowing center dot */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 bg-[var(--night-vision)] rounded-full eye-glow" />
      </div>

      {/* Outer glow rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full border border-[var(--night-vision)] opacity-20 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute w-80 h-80 rounded-full border border-[var(--night-vision)] opacity-10 animate-ping" style={{ animationDuration: '4s' }} />
      </div>

      {/* Corner brackets for tactical feel */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[var(--night-vision)] opacity-50" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[var(--night-vision)] opacity-50" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[var(--night-vision)] opacity-50" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[var(--night-vision)] opacity-50" />
    </div>
  )
}

export default EyeAnimation
