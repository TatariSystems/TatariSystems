import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'
import OrbBackground from '../components/OrbBackground'
import FilmGrain from '../components/FilmGrain'
import SectionLabel from '../components/SectionLabel'
import useInView from '../hooks/useInView'

const AIPlatform = () => {
  const [heroRef, heroVisible] = useInView<HTMLDivElement>(0.08)
  const [challengeRef, challengeVisible] = useInView<HTMLDivElement>(0.08)
  const [pricingRef, pricingVisible] = useInView<HTMLDivElement>(0.08)
  const [compareRef, compareVisible] = useInView<HTMLDivElement>(0.08)

  const [heroActiveRef, heroActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [challengeActiveRef, challengeActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [empowerActiveRef, empowerActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [chooseActiveRef, chooseActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [pricingActiveRef, pricingActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [compareActiveRef, compareActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [builtActiveRef, builtActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--inst-bg)', color: 'var(--inst-text)' }}>
      <Navbar />
      <OrbBackground />
      <FilmGrain />

      <main style={{ position: 'relative', zIndex: 2, padding: '112px 24px 84px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <section
            ref={heroRef}
            style={{
              marginBottom: 44,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.8s var(--inst-ease-out-expo)',
            }}
          >
            <div ref={heroActiveRef}>
              <SectionLabel number="01" title="AI Platform" active={heroActive} />
              <h1 style={{ margin: '16px 0 10px', fontFamily: 'var(--inst-font-serif)', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.03em', color: heroActive ? '#fff' : 'var(--inst-text-70)', transition: 'color 0.4s ease-in-out' }}>
                Supercharge Your AI Startup
              </h1>
              <p style={{ margin: 0, maxWidth: 860, color: heroActive ? 'var(--inst-text-70)' : 'var(--inst-text-50)', fontSize: 14, lineHeight: 1.8, transition: 'color 0.4s ease-in-out' }}>
                Tatari gives you the power and flexibility to scale your models without enterprise price lock-in.
              </p>
            </div>
          </section>

          <section
            ref={challengeRef}
            style={{
              marginBottom: 44,
              opacity: challengeVisible ? 1 : 0,
              transform: challengeVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s var(--inst-ease-out-expo)',
            }}
          >
            <div ref={challengeActiveRef}>
              <SectionLabel number="02" title="The Challenge" active={challengeActive} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 18 }}>
                {[
                  ['70,000', 'AI startups are being priced out of AWS/GCP compute.'],
                  ['4.4x', 'Demand for compute is exploding, but affordable, reliable options are scarce.'],
                  ['26x', 'Global AI compute demand is projected to grow 26× by 2030.'],
                ].map(([value, text]) => (
                  <article key={value} style={{ border: '1px solid var(--inst-border-6)', background: 'var(--inst-surface-2)', borderRadius: 12, padding: 16 }}>
                    <div style={{ fontFamily: 'var(--inst-font-serif)', fontSize: 34, color: challengeActive ? '#fff' : 'var(--inst-text-80)', transition: 'color 0.4s ease-in-out' }}>{value}</div>
                    <p style={{ margin: '6px 0 0', color: challengeActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', fontSize: 12, lineHeight: 1.6, transition: 'color 0.4s ease-in-out' }}>{text}</p>
                  </article>
                ))}
              </div>
              <div style={{ marginTop: 12, border: '1px solid var(--inst-border-5)', borderRadius: 12, background: 'var(--inst-surface-1)', padding: 14, color: challengeActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', fontSize: 12, lineHeight: 1.75, transition: 'color 0.4s ease-in-out' }}>
                AWS H200 = $10.6/hr vs. Vast.ai = $2.4/hr. Cheap compute is often unreliable, leaving teams stuck. Tatari is built for founders who need to train and deploy faster—without breaking the bank.
              </div>
            </div>
          </section>

          <motion.section
            ref={empowerActiveRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginBottom: 44 }}
          >
            <SectionLabel number="03" title="How Tatari Empowers Startups" active={empowerActive} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginTop: 18 }}>
              {[
                ['Idle GPUs', '~50% of GPUs are idle globally at any given time.'],
                ['Carbon-Aware Scheduling', 'Intelligent placement can reduce emissions by up to 75%.'],
                ['Aggregation', 'Tatari brokers surplus capacity with proper SLAs.'],
              ].map(([title, body]) => (
                <article key={title} style={{ border: '1px solid var(--inst-border-6)', background: 'var(--inst-surface-2)', borderRadius: 12, padding: 16 }}>
                  <h3 style={{ margin: 0, fontFamily: 'var(--inst-font-serif)', fontWeight: 400, fontSize: 24, color: empowerActive ? '#fff' : 'var(--inst-text-80)', transition: 'color 0.4s ease-in-out' }}>{title}</h3>
                  <p style={{ margin: '8px 0 0', color: empowerActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', fontSize: 12, lineHeight: 1.7, transition: 'color 0.4s ease-in-out' }}>{body}</p>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section
            ref={chooseActiveRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ marginBottom: 44 }}
          >
            <SectionLabel number="04" title="Why Teams Choose Tatari" active={chooseActive} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginTop: 18 }}>
              {[
                ['1. Sourcing', 'Aggregates trusted GPU vendors across marketplaces and private clouds.'],
                ['2. Reliability', 'Guarantees uptime via SLAs and region-aware placement.'],
                ['3. Interface', 'White-labeled console with roadmap to green infrastructure.'],
              ].map(([title, body]) => (
                <article key={title} style={{ border: '1px solid var(--inst-border-6)', background: 'var(--inst-surface-2)', borderRadius: 12, padding: 16 }}>
                  <h3 style={{ margin: 0, fontFamily: 'var(--inst-font-serif)', fontWeight: 400, fontSize: 24, color: chooseActive ? '#fff' : 'var(--inst-text-80)', transition: 'color 0.4s ease-in-out' }}>{title}</h3>
                  <p style={{ margin: '8px 0 0', color: chooseActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', fontSize: 12, lineHeight: 1.7, transition: 'color 0.4s ease-in-out' }}>{body}</p>
                </article>
              ))}
            </div>
            <div style={{ marginTop: 12, border: '1px solid var(--inst-border-5)', borderRadius: 12, background: 'var(--inst-surface-1)', padding: 14, color: chooseActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', fontSize: 12, lineHeight: 1.75, transition: 'color 0.4s ease-in-out' }}>
              • Partner SLAs enforce 99.9% uptime (~4.4 hrs downtime/year)
              <br />
              • Tatari guarantees {'<'}1 minute startup latency and 95%+ success rate
              <br />
              • User → Tatari Broker → Region-aware infra → SLA Monitor
            </div>
          </motion.section>

          <section
            ref={pricingRef}
            style={{
              marginBottom: 44,
              opacity: pricingVisible ? 1 : 0,
              transform: pricingVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s var(--inst-ease-out-expo)',
            }}
          >
            <div ref={pricingActiveRef}>
              <SectionLabel number="05" title="Transparent Pricing" active={pricingActive} />
              <div style={{ marginTop: 16, border: '1px solid var(--inst-border-8)', borderRadius: 14, overflow: 'hidden' }}>
                {[
                  ['Wholesale GPU', '$1.00'],
                  ['Infrastructure & Ops', '$0.30'],
                  ['Support & SLA', '$0.10'],
                  ['Payment Processing Fees', '$0.10'],
                  ['Total Cost', '$1.50'],
                  ['+ 20% Markup', '$0.30'],
                  ['Final Price to User', '$1.80'],
                ].map(([k, v], idx) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderTop: idx === 0 ? 'none' : '1px solid var(--inst-border-4)', background: idx === 6 ? 'var(--inst-surface-8)' : 'var(--inst-surface-2)' }}>
                    <span style={{ color: pricingActive ? 'var(--inst-text-80)' : 'var(--inst-text-70)', fontSize: 13, transition: 'color 0.4s ease-in-out' }}>{k}</span>
                    <span style={{ color: '#fff', fontFamily: 'var(--inst-font-mono)', fontSize: 13 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={compareRef}
            style={{
              marginBottom: 44,
              opacity: compareVisible ? 1 : 0,
              transform: compareVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s var(--inst-ease-out-expo)',
            }}
          >
            <div ref={compareActiveRef}>
              <SectionLabel number="06" title="Provider Comparison" active={compareActive} />
              <div style={{ marginTop: 16, border: '1px solid var(--inst-border-8)', borderRadius: 14, overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
                  <thead>
                    <tr style={{ background: 'var(--inst-surface-8)' }}>
                      <th style={{ textAlign: 'left', padding: 10, fontSize: 12, color: compareActive ? 'var(--inst-text-80)' : 'var(--inst-text-70)', transition: 'color 0.4s ease-in-out' }}>Provider</th>
                      <th style={{ textAlign: 'center', padding: 10, fontSize: 12, color: compareActive ? 'var(--inst-text-80)' : 'var(--inst-text-70)', transition: 'color 0.4s ease-in-out' }}>Price (H100/hr)</th>
                      <th style={{ textAlign: 'center', padding: 10, fontSize: 12, color: compareActive ? 'var(--inst-text-80)' : 'var(--inst-text-70)', transition: 'color 0.4s ease-in-out' }}>SLA/Uptime</th>
                      <th style={{ textAlign: 'center', padding: 10, fontSize: 12, color: compareActive ? 'var(--inst-text-80)' : 'var(--inst-text-70)', transition: 'color 0.4s ease-in-out' }}>Green Energy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Tatari', '$1.80', '99.9%', '100% hydroelectric'],
                      ['Vast.ai', '$0.89', 'No centralized SLA', 'Host-dependent'],
                      ['Coreweave', '$2.25', '99.9%', 'Partial clean sourcing'],
                      ['AWS/GCP', '$3.06', '99.9%', 'Partial REC-backed'],
                    ].map((row, idx) => (
                      <tr key={row[0]} style={{ borderTop: idx === 0 ? 'none' : '1px solid var(--inst-border-4)' }}>
                        <td style={{ padding: 10, color: row[0] === 'Tatari' ? '#fff' : 'var(--inst-text-70)' }}>{row[0]}</td>
                        <td style={{ textAlign: 'center', padding: 10, color: compareActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', transition: 'color 0.4s ease-in-out' }}>{row[1]}</td>
                        <td style={{ textAlign: 'center', padding: 10, color: compareActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', transition: 'color 0.4s ease-in-out' }}>{row[2]}</td>
                        <td style={{ textAlign: 'center', padding: 10, color: compareActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', transition: 'color 0.4s ease-in-out' }}>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <motion.section
            ref={builtActiveRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionLabel number="07" title="Built for AI Innovators" active={builtActive} />
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
              <article style={{ border: '1px solid var(--inst-border-6)', background: 'var(--inst-surface-2)', borderRadius: 12, padding: 16 }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--inst-font-serif)', fontWeight: 400, fontSize: 22, color: builtActive ? '#fff' : 'var(--inst-text-80)', transition: 'color 0.4s ease-in-out' }}>AI/ML Startups</h3>
                <p style={{ margin: '8px 0 0', color: builtActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', fontSize: 12, lineHeight: 1.7, transition: 'color 0.4s ease-in-out' }}>Need scalable, cost-effective inference and training compute with low commitment.</p>
              </article>
              <article style={{ border: '1px solid var(--inst-border-6)', background: 'var(--inst-surface-2)', borderRadius: 12, padding: 16 }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--inst-font-serif)', fontWeight: 400, fontSize: 22, color: builtActive ? '#fff' : 'var(--inst-text-80)', transition: 'color 0.4s ease-in-out' }}>Academic Labs & Research</h3>
                <p style={{ margin: '8px 0 0', color: builtActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', fontSize: 12, lineHeight: 1.7, transition: 'color 0.4s ease-in-out' }}>Require powerful GPUs for experimentation with better latency and geographic proximity.</p>
              </article>
            </div>
            <div style={{ marginTop: 12, border: '1px solid var(--inst-border-6)', background: 'var(--inst-surface-1)', borderRadius: 12, padding: 16, color: builtActive ? 'var(--inst-text-65, rgba(255,255,255,0.65))' : 'var(--inst-text-50)', fontSize: 12, lineHeight: 1.75, transition: 'color 0.4s ease-in-out' }}>
              Can we deliver low-cost compute without sacrificing uptime and support? Can we aggregate underutilized capacity with SLAs? Can we build global-first infrastructure that is also green and regulation-friendly? Tatari is designed to do exactly that.
            </div>
          </motion.section>

        </div>
      </main>
    </div>
  )
}

export default AIPlatform