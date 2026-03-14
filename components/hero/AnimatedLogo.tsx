"use client"

import { motion } from 'framer-motion'

export function AnimatedLogo() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative z-10">
        {/* Decorative line - top */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#DC143C]" />
          <div className="w-2 h-2 rotate-45 bg-[#DC143C]" />
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#DC143C]" />
        </motion.div>

        {/* Logo Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl mb-4">
            <span className="text-gradient-crimson">
              GROWN &amp; SEXY
            </span>
          </h1>
          <motion.p
            className="text-cream text-xl md:text-2xl tracking-[0.4em] font-light uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Movement
          </motion.p>
        </motion.div>

        {/* Decorative line - bottom */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#DAA520]" />
          <div className="w-2 h-2 rotate-45 bg-[#DAA520]" />
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#DAA520]" />
        </motion.div>
      </div>
    </motion.div>
  )
}
