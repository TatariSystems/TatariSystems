import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const Research = () => {
  return (
    <div className="min-h-screen bg-black pt-navbar">
      <Navbar />
      <section className="relative min-h-screen flex flex-col items-center justify-center z-10 overflow-hidden pt-16">
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            Research
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xl"
          >
            <span className="w-3 h-3 rounded-full bg-primary-500 animate-pulse" />
            Coming soon
          </motion.div>
        </div>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  )
}

export default Research


