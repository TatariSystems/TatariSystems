import React from 'react'

const PARTICLE_COUNT = 12

/**
 * Full-viewport animated background matching the Tatari Institute reference.
 * Layers:
 *   1. Subtle grid pattern (pulsing opacity)
 *   2. Two large radial-gradient orbs with slow drift animations
 *   3. Rising micro-particles
 *
 * Renders as a fixed overlay with pointer-events: none.
 */
const OrbBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(60px, -40px) scale(1.1); }
          66%      { transform: translate(-30px, 30px) scale(0.95); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-50px, 50px) scale(1.08); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.018; }
          50%      { opacity: 0.045; }
        }
        @keyframes particleDrift {
          0%   { transform: translateY(0);      opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>

      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          animation: 'gridPulse 8s ease-in-out infinite',
        }}
      />

      {/* Orb 1 — top-right */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '15%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          animation: 'orbFloat1 20s ease-in-out infinite',
          filter: 'blur(60px)',
        }}
      />

      {/* Orb 2 — bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          animation: 'orbFloat2 25s ease-in-out infinite',
          filter: 'blur(50px)',
        }}
      />

      {/* Rising particles */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${5 + ((i * 37) % 90)}%`,
            bottom: `-${(i * 13) % 10}%`,
            width: 1 + (i % 3),
            height: 1 + (i % 3),
            borderRadius: '50%',
            background: `rgba(255,255,255,${0.06 + (i % 5) * 0.04})`,
            animation: `particleDrift ${16 + (i % 8) * 2}s linear infinite`,
            animationDelay: `${(i * 3) % 20}s`,
          }}
        />
      ))}
    </div>
  )
}

export default OrbBackground
