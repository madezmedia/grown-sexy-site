"use client"

import { motion } from 'framer-motion'

export function AnimatedLogo() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative z-10">
        {/* Ornamental flourish - top */}
        <motion.svg
          className="w-full max-w-2xl mx-auto mb-6"
          viewBox="0 0 600 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <motion.path
            d="M50,40 Q100,20 150,40 T250,40 Q270,30 290,40 L310,40 Q330,30 350,40 T450,40 Q500,20 550,40"
            stroke="url(#crimsonGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
          />
          <defs>
            <linearGradient id="crimsonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DC143C" />
              <stop offset="50%" stopColor="#C41E3A" />
              <stop offset="100%" stopColor="#DC143C" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Logo Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl mb-4">
            <span className="text-gradient-crimson text-glow-crimson">
              GROWN &amp; SEXY
            </span>
          </h1>
          <motion.p
            className="text-cream text-2xl md:text-3xl tracking-[0.3em] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            MOVEMENT
          </motion.p>
        </motion.div>

        {/* Ornamental flourish - bottom */}
        <motion.svg
          className="w-full max-w-2xl mx-auto mt-6"
          viewBox="0 0 600 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M50,40 Q100,60 150,40 T250,40 Q270,50 290,40 L310,40 Q330,50 350,40 T450,40 Q500,60 550,40"
            stroke="url(#crimsonGradient2)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.6 }}
          />
          <defs>
            <linearGradient id="crimsonGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DC143C" />
              <stop offset="50%" stopColor="#C41E3A" />
              <stop offset="100%" stopColor="#DC143C" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 blur-3xl opacity-50 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(220, 20, 60, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}
