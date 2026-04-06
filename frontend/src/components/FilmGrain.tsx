import React from 'react'

/**
 * Full-viewport SVG film-grain noise overlay matching the Tatari Institute reference.
 * Uses feTurbulence (fractalNoise) at low opacity for a subtle analog texture.
 * Renders as a fixed overlay with pointer-events: none and high z-index.
 */
const FilmGrain: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        pointerEvents: 'none',
        opacity: 0.4,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

export default FilmGrain
