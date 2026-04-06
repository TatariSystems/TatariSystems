import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { getAssetPath } from '../utils/paths'
import { getIconSrc } from '../utils/iconMapping'
import ReactMemo from 'react'
import OrbBackground from '../components/OrbBackground'
import FilmGrain from '../components/FilmGrain'
import SectionLabel from '../components/SectionLabel'
import useInView from '../hooks/useInView'

const Home = () => {
  const navigate = useNavigate()

  const [heroRef, heroVisible] = useInView<HTMLDivElement>(0.08)
  const [statsRef, statsVisible] = useInView<HTMLDivElement>(0.08)
  const [gpuRef, gpuVisible] = useInView<HTMLDivElement>(0.08)
  const [ctaRef, ctaVisible] = useInView<HTMLDivElement>(0.08)

  const [heroActiveRef, heroActive] = useInView<HTMLDivElement>(0.5, false, '-20% 0px -45% 0px')
  const [statsActiveRef, statsActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [metricsActiveRef, metricsActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [ctaActiveRef, ctaActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')

  const tatariEdgeStats = ReactMemo.useMemo(() => [
    { number: "$0.02–0.04/kWh", label: "Ethiopia Power Cost", icon: "Zap" },
    { number: "4+ Countries", label: "Active Target Markets", icon: "Globe" },
    { number: "Phase 1 Live", label: "Mining Operations Active", icon: "Cpu" }
  ], [])

  const homepageMetrics = ReactMemo.useMemo(() => [
    {
      value: '144',
      label: 'ASICs Operational',
    },
    {
      value: '1+ BTC',
      label: 'Mined to Date',
    },
    {
      value: '99%+',
      label: 'Mining Uptime',
    },
    {
      value: '5 MW',
      label: 'Power Under Contract',
    },
    {
      value: '4+',
      label: 'Target Markets',
    },
    {
      value: '~70%',
      label: 'Cost Advantage vs. US Rates',
    },
    {
      value: '$0.02–0.04',
      label: 'Cost per kWh (Ethiopia)',
    },
    {
      value: '2024',
      label: 'Year Operations Began',
    },
  ], [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--inst-bg)', color: 'var(--inst-text)' }}>
      <Navbar />
      <OrbBackground />
      <FilmGrain />

      <main style={{ position: 'relative', zIndex: 2, paddingTop: 88 }}>
        <section
          ref={heroRef}
          style={{
            minHeight: '76vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px 32px',
          }}
        >
          <div
            ref={heroActiveRef}
            style={{
              width: '100%',
              maxWidth: 1040,
              textAlign: 'center',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.8s var(--inst-ease-out-expo)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
              <SectionLabel number="00" title="Tatari Systems" />
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--inst-font-serif)',
                fontSize: 'clamp(40px, 7vw, 92px)',
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: heroActive ? '#fff' : 'var(--inst-text-70)',
                transition: 'color 0.4s ease-in-out',
              }}
            >
              Where Energy Meets
              <br />
              Opportunity
            </h1>

            <p
              style={{
                maxWidth: 760,
                margin: '18px auto 0',
                fontFamily: 'var(--inst-font-sans)',
                fontSize: 15,
                color: heroActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)',
                lineHeight: 1.8,
                transition: 'color 0.4s ease-in-out',
              }}
            >
              Tatari is a Bitcoin mining and compute infrastructure company operating in emerging
              markets. We find stranded renewable energy, put it to work today, and build the
              infrastructure that comes next.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
              <button
                onClick={() => navigate('/compute')}
                style={{
                  background: 'var(--inst-surface-8)',
                  border: '1px solid var(--inst-border-15)',
                  color: '#fff',
                  padding: '10px 18px',
                  borderRadius: 8,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Our Roadmap
              </button>

              <button
                onClick={() => navigate('/contact')}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--inst-border-8)',
                  color: 'var(--inst-text-70)',
                  padding: '10px 18px',
                  borderRadius: 8,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                Talk to Us
              </button>
            </div>
          </div>
        </section>

        <section
          ref={statsRef}
          style={{
            padding: '24px 24px 60px',
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'all 0.7s var(--inst-ease-out-expo)',
          }}
        >
          <div ref={statsActiveRef} style={{ maxWidth: 1120, margin: '0 auto' }}>
            <SectionLabel number="01" title="How We Build" active={statsActive} />
            <p style={{ marginTop: 16, color: statsActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)', fontSize: 14, lineHeight: 1.8, maxWidth: 860, transition: 'color 0.4s ease-in-out' }}>
              We don't start with a pitch deck. We start with a power contract.
              <br />
              <br />
              Every market we enter follows the same playbook: identify stranded or underpriced
              renewable energy, validate the economics with Bitcoin mining, then build the compute
              infrastructure that region needs next.
              <br />
              <br />
              This is how Tatari works — prove it cheap, then scale it sovereign.
            </p>

            <div
              style={{
                marginTop: 20,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
              }}
            >
              {tatariEdgeStats.map((stat) => (
                <article
                  key={stat.label}
                  style={{
                    border: '1px solid var(--inst-border-6)',
                    background: 'var(--inst-surface-2)',
                    borderRadius: 14,
                    padding: 18,
                  }}
                >
                  <img src={getIconSrc(stat.icon)} alt={stat.label} style={{ width: 18, height: 18, opacity: 0.85 }} />
                  <div style={{ fontFamily: 'var(--inst-font-serif)', fontSize: 28, marginTop: 12, color: statsActive ? '#fff' : 'var(--inst-text-70)', transition: 'color 0.4s ease-in-out' }}>{stat.number}</div>
                  <div style={{ fontSize: 12, color: statsActive ? 'var(--inst-text-60)' : 'var(--inst-text-40)', transition: 'color 0.4s ease-in-out' }}>{stat.label}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          ref={gpuRef}
          style={{
            padding: '12px 24px 72px',
            opacity: gpuVisible ? 1 : 0,
            transform: gpuVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'all 0.7s var(--inst-ease-out-expo)',
          }}
        >
          <div ref={metricsActiveRef} style={{ maxWidth: 1120, margin: '0 auto' }}>
            <SectionLabel number="02" title="Operational Metrics" active={metricsActive} />
            <div
              style={{
                marginTop: 20,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 14,
              }}
            >
              {homepageMetrics.map((metric) => (
                <article
                  key={metric.label}
                  style={{
                    border: '1px solid var(--inst-border-6)',
                    background: 'var(--inst-surface-1)',
                    borderRadius: 14,
                    padding: 16,
                  }}
                >
                  <div style={{ fontFamily: 'var(--inst-font-serif)', fontWeight: 400, fontSize: 28, color: metricsActive ? '#fff' : 'var(--inst-text-70)', transition: 'color 0.4s ease-in-out' }}>{metric.value}</div>
                  <p style={{ margin: '8px 0 0', fontSize: 12, lineHeight: 1.7, color: metricsActive ? 'var(--inst-text-60)' : 'var(--inst-text-40)', transition: 'color 0.4s ease-in-out' }}>{metric.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          ref={ctaRef}
          style={{
            padding: '8px 24px 88px',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'all 0.7s var(--inst-ease-out-expo)',
          }}
        >
          <div
            ref={ctaActiveRef}
            style={{
              maxWidth: 960,
              margin: '0 auto',
              border: '1px solid var(--inst-border-8)',
              background: 'var(--inst-surface-2)',
              borderRadius: 18,
              padding: 28,
              textAlign: 'center',
            }}
          >
            <SectionLabel number="03" title="Build with Tatari" className="justify-center" active={ctaActive} />
            <h2 style={{ margin: '16px 0 8px', fontFamily: 'var(--inst-font-serif)', fontWeight: 400, fontSize: 'clamp(30px, 4vw, 52px)', color: ctaActive ? '#fff' : 'var(--inst-text-70)', transition: 'color 0.4s ease-in-out' }}>
              Learn About Our Roadmap
            </h2>
            <p style={{ margin: 0, color: ctaActive ? 'var(--inst-text-70)' : 'var(--inst-text-45)', fontSize: 14, lineHeight: 1.8, transition: 'color 0.4s ease-in-out' }}>
              See how we move from energy contracts to sovereign compute infrastructure.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
              <button
                onClick={() => navigate('/compute')}
                style={{ background: '#fff', color: '#000', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, cursor: 'pointer' }}
              >
                Learn About Our Roadmap
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ReactMemo.memo(Home)