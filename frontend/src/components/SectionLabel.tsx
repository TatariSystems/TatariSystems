import React from 'react'

interface SectionLabelProps {
  /** Two-digit section number, e.g. "01" */
  number: string
  /** Section title displayed in uppercase */
  title: string
  /** Optional extra className on the wrapper */
  className?: string
  /** If true, label appears highlighted for active section */
  active?: boolean
}

/**
 * "01 —— SECTION NAME" header pattern from the Tatari Institute reference.
 * Renders a monospace number, a decorative line, and an uppercase label.
 */
const SectionLabel: React.FC<SectionLabelProps> = ({
  number,
  title,
  className = '',
  active = false,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <span
        style={{
          fontFamily: "var(--inst-font-mono, 'SF Mono', monospace)",
          fontSize: 11,
          color: active
            ? 'var(--inst-text-55, rgba(255,255,255,0.55))'
            : 'var(--inst-text-25, rgba(255,255,255,0.25))',
          letterSpacing: '0.04em',
          transition: 'color 0.4s ease-in-out',
        }}
      >
        {number}
      </span>

      <div
        style={{
          height: 1,
          width: 40,
          background: active
            ? 'var(--inst-border-15, rgba(255,255,255,0.15))'
            : 'var(--inst-border-8, rgba(255,255,255,0.08))',
          transition: 'background 0.4s ease-in-out',
        }}
      />

      <h2
        style={{
          fontFamily: "var(--inst-font-sans, 'Inter', sans-serif)",
          fontSize: 12,
          fontWeight: 500,
          color: active
            ? 'var(--inst-text-80, rgba(255,255,255,0.8))'
            : 'var(--inst-text-50, rgba(255,255,255,0.5))',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          margin: 0,
          transition: 'color 0.4s ease-in-out',
        }}
      >
        {title}
      </h2>
    </div>
  )
}

export default SectionLabel
