import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'


const Careers = () => {

  const tatariWay = [
    'Build like Owners',
    'Never Stop Learning',
    'Move with Urgency',
    'Deliver 10× Value',
    'Scale with Purpose'
  ]

  const [currentTatariWay, setCurrentTatariWay] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTatariWay((prev) => (prev + 1) % tatariWay.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [tatariWay.length])

  const fadeInProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <div className="min-h-screen bg-black pt-navbar">
      <Navbar />
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInProps}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              We're not currently recruiting, but…
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
              …we're perpetually scouting the game-changers. If you're driven to build high-impact systems on an agile team, and see yourself pioneering a greener and more inclusive future for AI and Crypto, we'd love to hear from you. Exceptional contributors always find a seat.
            </p>
          </motion.div>

          <motion.div {...fadeInProps} className="text-center mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">The Tatari Way</h2>
            {/* Animated subheadline */}
            <div className="h-12 mb-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTatariWay}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl text-primary-400 max-w-2xl mx-auto italic"
                >
                  {tatariWay[currentTatariWay]}
                </motion.p>
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Careers
