import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import { getAssetPath } from '../utils/paths'
import OrbBackground from '../components/OrbBackground'
import FilmGrain from '../components/FilmGrain'
import SectionLabel from '../components/SectionLabel'
import useInView from '../hooks/useInView'

const papers = [
  {
    id: 'chinas-fiber-footprint',
    title: "China's Fiber Footprint",
    fileName: "China's Fiber Footprint.pdf",
  },
  {
    id: 'institute-data-localization',
    title: 'Institute - Data Localization',
    fileName: 'Institute - Data Localization.pdf',
  },
  {
    id: 'institute-dual-use-problem',
    title: 'Institute - Dual Use Problem',
    fileName: 'Institute - Dual Use Problem.pdf',
  },
  {
    id: 'us-iran-war-impact',
    title: 'US-Iran War Impact',
    fileName: 'US-Iran War Impact.pdf',
  },
  {
    id: 'annual-report-2025',
    title: 'Tatari Systems Annual Report 2025',
    fileName: 'Tatari Systems Annual Report 2025-compressed.pdf',
  },
]

const Research = () => {
  const [selectedPaperId, setSelectedPaperId] = useState(papers[0].id)
  const [heroActiveRef, heroActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')
  const [contentActiveRef, contentActive] = useInView<HTMLDivElement>(0.45, false, '-20% 0px -45% 0px')

  const selectedPaper = useMemo(
    () => papers.find((paper) => paper.id === selectedPaperId) || papers[0],
    [selectedPaperId],
  )

  const paperPath = getAssetPath(`research/${selectedPaper.fileName}`)
  const paperUrl = encodeURI(paperPath)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--inst-bg)', color: 'var(--inst-text)' }}>
      <Navbar />
      <OrbBackground />
      <FilmGrain />
      <section className="relative min-h-screen z-10 overflow-hidden pt-24 pb-16">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={heroActiveRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <SectionLabel number="01" title="Research" active={heroActive} />
            </div>
            <h1
              style={{
                margin: '0 0 10px',
                textAlign: 'center',
                fontFamily: 'var(--inst-font-serif)',
                fontWeight: 400,
                fontSize: 'clamp(42px, 8vw, 86px)',
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                color: heroActive ? '#fff' : 'var(--inst-text-70)',
                transition: 'color 0.4s ease-in-out',
              }}
            >
              Research
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: heroActive ? 'var(--inst-text-70)' : 'var(--inst-text-50)',
              fontSize: 14,
              lineHeight: 1.8,
              maxWidth: 760,
              margin: '0 auto 30px',
              textAlign: 'center',
              transition: 'color 0.4s ease-in-out',
            }}
          >
            Explore our latest publications directly on here. Select a paper below to preview, then open in a new tab or download it.
          </motion.p>

          <motion.div
            ref={contentActiveRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-3 sm:p-4 lg:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
              <div className="flex items-center gap-3">
                <h2 style={{ color: contentActive ? '#fff' : 'var(--inst-text-80)', fontFamily: 'var(--inst-font-serif)', fontSize: 22, fontWeight: 400, transition: 'color 0.4s ease-in-out' }}>{selectedPaper.title}</h2>
                <span className="text-xs text-white/60 bg-white/10 border border-white/10 px-2 py-1 rounded-md">
                  {papers.length} papers
                </span>
              </div>

              <div className="w-full order-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {papers.map((paper) => {
                    const isActive = paper.id === selectedPaperId
                    return (
                      <button
                        key={paper.id}
                        type="button"
                        onClick={() => setSelectedPaperId(paper.id)}
                        className={`w-full text-left rounded-lg border px-3 py-2 text-sm transition-colors ${
                          isActive
                            ? 'border-white/25 bg-white/10 text-white'
                            : 'border-white/10 bg-black/30 text-white/80 hover:border-white/25 hover:bg-white/5'
                        }`}
                      >
                        {paper.title}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-white text-black text-sm hover:bg-white/90 transition-colors"
                >
                  Open in new tab
                </a>
                <a
                  href={paperUrl}
                  download
                  className="px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  Download PDF
                </a>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/30">
              <iframe
                title={`${selectedPaper.title} PDF`}
                src={`${paperUrl}#view=FitH`}
                className="w-full h-[70vh] min-h-[500px]"
              />

              <noscript>
                <div className="p-4 text-white/80 text-sm">
                  PDF preview requires JavaScript.
                  {' '}
                  <a href={paperUrl} target="_blank" rel="noopener noreferrer" className="underline text-white">
                    Open the report here.
                  </a>
                </div>
              </noscript>
            </div>
          </motion.div>
        </div>

      </section>
    </div>
  )
}

export default Research


