import React from 'react'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import OrbBackground from '../components/OrbBackground'
import FilmGrain from '../components/FilmGrain'
import SectionLabel from '../components/SectionLabel'
import useInView from '../hooks/useInView'

type ContentCard = {
  title: string
  description: string
}

const revealTransition = 'all 0.75s var(--inst-ease-out-expo)'

const RevealGridCard: React.FC<{ item: ContentCard; index: number }> = ({ item, index }) => {
  const [cardRef, cardVisible] = useInView<HTMLDivElement>(0.12)

  return (
    <article
      ref={cardRef}
      style={{
        padding: 24,
        borderRadius: 16,
        border: '1px solid var(--inst-border-5)',
        background: 'var(--inst-surface-2)',
        minHeight: 176,
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? 'translateY(0)' : 'translateY(22px)',
        transition: `all 0.7s var(--inst-ease-out-expo) ${index * 90}ms`,
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--inst-font-serif)',
          fontSize: 26,
          fontWeight: 400,
          color: '#fff',
          lineHeight: 1.2,
          margin: '0 0 12px',
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--inst-font-sans)',
          fontSize: 13,
          fontWeight: 300,
          color: 'var(--inst-text-55)',
          lineHeight: 1.7,
        }}
      >
        {item.description}
      </p>
    </article>
  )
}

const AICompute = () => {
  const navigate = useNavigate()

  const [heroRef, heroVisible] = useInView<HTMLDivElement>(0.08)
  const [problemRef, problemVisible] = useInView<HTMLDivElement>(0.08)
  const [solutionRef, solutionVisible] = useInView<HTMLDivElement>(0.08)
  const [visionRef, visionVisible] = useInView<HTMLDivElement>(0.08)
  const [roadmapRef, roadmapVisible] = useInView<HTMLDivElement>(0.08)

  const [heroActiveRef, heroActive] = useInView<HTMLDivElement>(0.5, false, '-20% 0px -45% 0px')
  const [problemActiveRef, problemActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [solutionActiveRef, solutionActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [visionActiveRef, visionActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [roadmapActiveRef, roadmapActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')

  const [phase1Ref, phase1Active] = useInView<HTMLDivElement>(0.6, false, '-25% 0px -35% 0px')
  const [phase2Ref, phase2Active] = useInView<HTMLDivElement>(0.6, false, '-25% 0px -35% 0px')
  const [phase3Ref, phase3Active] = useInView<HTMLDivElement>(0.6, false, '-25% 0px -35% 0px')

  const solutions = [
    {
      title: 'Bitcoin Mining',
      description: '144 ASIC miners live in Addis Ababa, Ethiopia. Powered by hydroelectric energy at $0.02–0.04/kWh. Operational today.',
    },
    {
      title: 'Hydroelectric Power',
      description: "Ethiopia's Grand Renaissance Dam produces surplus baseload hydro — the cheapest and cleanest power source for compute in Africa.",
    },
    {
      title: 'Emerging Market Reach',
      description: 'Active operations in Ethiopia with expansion underway into Nigeria, Paraguay, Georgia, and Ecuador — each selected for sub-$0.05/kWh power access.',
    },
    {
      title: 'Data Center Pipeline',
      description: "Owned facility development planned for Ethiopia. GPU compute leasing to regional clients is the next phase — currently in infrastructure planning.",
    },
  ]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--inst-bg)',
        color: 'var(--inst-text)',
        position: 'relative',
      }}
    >
      <Navbar />
      <OrbBackground />
      <FilmGrain />

      <section
        ref={heroRef}
        style={{
          padding: '130px 48px 56px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div ref={heroActiveRef} style={{ maxWidth: 1160, margin: '0 auto' }}>
          <SectionLabel number="00" title="Infrastructure" active={heroActive} />
          <h1
            style={{
              fontFamily: 'var(--inst-font-serif)',
              fontSize: 'clamp(36px, 6vw, 76px)',
              fontWeight: 400,
              lineHeight: 1.03,
              letterSpacing: '-0.02em',
              margin: '18px 0 14px',
              color: heroActive ? '#fff' : 'var(--inst-text-70)',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
              transition: `${revealTransition}, color 0.4s ease-in-out`,
            }}
          >
            Building the Compute Infrastructure
            <br />
            of Emerging Markets
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: 780,
              fontFamily: 'var(--inst-font-sans)',
              fontSize: 14,
              fontWeight: 300,
              color: heroActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)',
              lineHeight: 1.75,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
              transition: `all 0.85s var(--inst-ease-out-expo) 120ms, color 0.4s ease-in-out`,
            }}
          >
            We are developing owned data center infrastructure and compute leasing across markets
            where hyperscalers don't operate. Our foundation starts in Ethiopia, where we already
            have active mining operations and power infrastructure on the ground.
          </p>
        </div>
      </section>

      <section
        ref={problemRef}
        style={{
          padding: '24px 48px 80px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          ref={problemActiveRef}
          style={{
            maxWidth: 960,
            margin: '0 auto',
            opacity: problemVisible ? 1 : 0,
            transform: problemVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: revealTransition,
          }}
        >
          <SectionLabel number="01" title="The Opportunity" active={problemActive} />
          <p
            style={{
              margin: '18px 0 0',
              fontFamily: 'var(--inst-font-serif)',
              fontSize: 'clamp(26px, 3.5vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.2,
              color: problemActive ? '#fff' : 'var(--inst-text-70)',
              transition: 'color 0.4s ease-in-out',
            }}
          >
            The world's cheapest energy is stranded in places with no infrastructure to use it.
          </p>
          <p
            style={{
              margin: '14px 0 0',
              fontFamily: 'var(--inst-font-sans)',
              fontSize: 14,
              fontWeight: 300,
              color: problemActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)',
              lineHeight: 1.75,
              maxWidth: 760,
              transition: 'color 0.4s ease-in-out',
            }}
          >
            Electricity in Ethiopia costs $0.02–0.04/kWh — roughly 70% cheaper than the US
            commercial average. Paraguay's Itaipu Dam produces surplus hydro at similar rates.
            Nigeria sits on underutilized gas and solar resources. These are not fringe markets.
            They are the foundation of the next wave of compute infrastructure, and they are almost
            entirely unserved.
          </p>
        </div>
      </section>

      <section
        ref={solutionRef}
        style={{
          padding: '20px 48px 92px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          ref={solutionActiveRef}
          style={{
            maxWidth: 1160,
            margin: '0 auto',
            opacity: solutionVisible ? 1 : 0,
            transform: solutionVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: revealTransition,
          }}
        >
          <SectionLabel number="02" title="Our Approach" active={solutionActive} />
          <div
            style={{
              marginTop: 26,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 14,
            }}
          >
            {solutions.map((item, index) => (
              <RevealGridCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={visionRef}
        style={{
          padding: '20px 48px 88px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          ref={visionActiveRef}
          style={{
            maxWidth: 960,
            margin: '0 auto',
            opacity: visionVisible ? 1 : 0,
            transform: visionVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: revealTransition,
          }}
        >
          <SectionLabel number="03" title="Where We're Going" active={visionActive} />
          <div
            style={{
              margin: '18px 0 0',
              fontFamily: 'var(--inst-font-sans)',
              fontSize: 16,
              fontWeight: 300,
              color: visionActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)',
              lineHeight: 1.8,
              maxWidth: 840,
              transition: 'color 0.4s ease-in-out',
            }}
          >
            <div ref={phase1Ref} style={{ marginBottom: 18, paddingLeft: 8, borderLeft: `2px solid ${phase1Active ? 'var(--inst-border-15)' : 'var(--inst-border-6)'}`, transition: 'border-color 0.4s ease-in-out' }}>
              <p style={{ margin: 0, fontSize: 17, color: phase1Active ? '#fff' : 'var(--inst-text-60)', transition: 'color 0.4s ease-in-out' }}>
                <strong>Phase 1 — Mining Operations</strong> <em>(Active)</em>
              </p>
              <p style={{ margin: '8px 0 0', fontSize: 15, color: phase1Active ? 'var(--inst-text-70)' : 'var(--inst-text-50)', transition: 'color 0.4s ease-in-out' }}>
                144 ASIC miners running in Addis Ababa, Ethiopia. 5 MW of power in the contracting
                process. 99%+ uptime. 1+ BTC mined. Proving the energy arbitrage thesis with real
                hardware and real economics.
              </p>
            </div>

            <div ref={phase2Ref} style={{ marginBottom: 18, paddingLeft: 8, borderLeft: `2px solid ${phase2Active ? 'var(--inst-border-15)' : 'var(--inst-border-6)'}`, transition: 'border-color 0.4s ease-in-out' }}>
              <p style={{ margin: 0, fontSize: 17, color: phase2Active ? '#fff' : 'var(--inst-text-60)', transition: 'color 0.4s ease-in-out' }}>
                <strong>Phase 2 — Geographic Expansion</strong> <em>(In Progress)</em>
              </p>
              <p style={{ margin: '8px 0 0', fontSize: 15, color: phase2Active ? 'var(--inst-text-70)' : 'var(--inst-text-50)', transition: 'color 0.4s ease-in-out' }}>
                Expanding mining operations into Nigeria, Paraguay, Georgia, and Ecuador. Each market
                selected for sub-$0.05/kWh renewable or stranded energy and regulatory accessibility.
              </p>
            </div>

            <div ref={phase3Ref} style={{ paddingLeft: 8, borderLeft: `2px solid ${phase3Active ? 'var(--inst-border-15)' : 'var(--inst-border-6)'}`, transition: 'border-color 0.4s ease-in-out' }}>
              <p style={{ margin: 0, fontSize: 17, color: phase3Active ? '#fff' : 'var(--inst-text-60)', transition: 'color 0.4s ease-in-out' }}>
                <strong>Phase 3 — Compute Infrastructure</strong> <em>(Roadmap)</em>
              </p>
              <p style={{ margin: '8px 0 0', fontSize: 15, color: phase3Active ? 'var(--inst-text-70)' : 'var(--inst-text-50)', transition: 'color 0.4s ease-in-out' }}>
                First owned data center facility in Ethiopia. GPU compute leasing to clients who need
                infrastructure in markets where hyperscalers don't reach.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={roadmapRef}
        style={{
          padding: '20px 48px 110px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          ref={roadmapActiveRef}
          style={{
            maxWidth: 960,
            margin: '0 auto',
            opacity: roadmapVisible ? 1 : 0,
            transform: roadmapVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: revealTransition,
          }}
        >
          <SectionLabel number="04" title="Partner" active={roadmapActive} />
          <h2
            style={{
              margin: '18px 0 10px',
              fontFamily: 'var(--inst-font-serif)',
              fontSize: 'clamp(30px, 4vw, 52px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: roadmapActive ? '#fff' : 'var(--inst-text-70)',
              transition: 'color 0.4s ease-in-out',
            }}
          >
            Partner With Tatari
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--inst-font-sans)',
              fontSize: 14,
              fontWeight: 300,
              color: roadmapActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)',
              lineHeight: 1.8,
              maxWidth: 860,
              transition: 'color 0.4s ease-in-out',
            }}
          >
            We're building compute infrastructure where others aren't. If you're an energy partner,
            investor, or operator in our target markets, we want to hear from you.
          </p>
          <button
            onClick={() => navigate('/contact')}
            style={{
              marginTop: 28,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: 'var(--inst-font-sans)',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#fff',
              background: 'var(--inst-surface-6)',
              border: '1px solid var(--inst-border-12)',
              borderRadius: 10,
              padding: '11px 16px',
              cursor: 'pointer',
              transition: 'all 0.3s var(--inst-ease-out-expo)',
            }}
          >
            Partner With Us
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  )
}

export default AICompute
