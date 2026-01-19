import Link from 'next/link'
import CTAButton from '@/components/CTAButton'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Tactical grid background */}
      <div className="absolute inset-0 tactical-grid opacity-10" />

      {/* Subtle predator eyes in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute left-[10%] top-[20%] flex gap-4">
          <div className="w-2 h-2 bg-night-vision rounded-full eye-glow" />
          <div className="w-2 h-2 bg-night-vision rounded-full eye-glow" />
        </div>
        <div className="absolute right-[15%] top-[60%] flex gap-3">
          <div className="w-1.5 h-1.5 bg-night-vision rounded-full eye-glow" />
          <div className="w-1.5 h-1.5 bg-night-vision rounded-full eye-glow" />
        </div>
        <div className="absolute left-[70%] bottom-[25%] flex gap-5">
          <div className="w-2 h-2 bg-night-vision rounded-full eye-glow" />
          <div className="w-2 h-2 bg-night-vision rounded-full eye-glow" />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <div className="inline-block border border-night-vision px-4 py-2 mb-6 font-mono text-xs text-night-vision bg-black/50 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 bg-night-vision rounded-full mr-2 eye-glow" />
            TRACKING ERROR
          </div>

          <h1 className="text-8xl md:text-9xl font-bold text-night-vision font-mono tracking-wider mb-6 text-glow">
            404
          </h1>
        </div>

        {/* Hunting-themed message */}
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-mono tracking-wide">
            NOTHING TO HUNT HERE
          </h2>

          <p className="text-lg text-gray-400 font-mono leading-relaxed">
            The trail went cold. This path leads nowhere in the digital forest.
          </p>

          <div className="border-l-2 border-tactical-green pl-6 py-4 text-left max-w-md mx-auto">
            <p className="text-sm text-gray-500 font-mono">
              TACTICAL ASSESSMENT: Target not found at coordinates. Recommend returning to base camp or initiating new search pattern.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <CTAButton href="/" variant="alert" size="lg">
            RETURN TO BASE
          </CTAButton>
          <CTAButton href="/contact" variant="secondary" size="lg">
            REQUEST EXTRACTION
          </CTAButton>
        </div>

        {/* Status indicator */}
        <div className="mt-12 flex items-center justify-center gap-3 font-mono text-sm text-night-vision/60">
          <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          TARGET NOT ACQUIRED
        </div>
      </div>

      {/* Tactical corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-tactical-green-dark/30 pointer-events-none" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-tactical-green-dark/30 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-tactical-green-dark/30 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-tactical-green-dark/30 pointer-events-none" />
    </div>
  )
}
