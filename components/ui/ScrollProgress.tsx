"use client"

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-50 origin-left"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#DC143C] via-[#C41E3A] to-[#DAA520] origin-left"
        style={{ scaleX }}
      />
    </motion.div>
  )
}
