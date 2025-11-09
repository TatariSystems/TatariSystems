import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'

const AICompute = () => {
  return (
    <div className="min-h-screen bg-black pt-navbar">
      <Navbar />
      <div className="flex items-center justify-center h-[70vh] px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">AI Compute</h1>
          <p className="text-xl text-gray-300">Coming soon</p>
        </motion.div>
      </div>
    </div>
  )
}

export default AICompute


