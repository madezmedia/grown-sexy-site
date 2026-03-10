"use client"

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed right-6 top-0 bottom-0 w-[2px] bg-white/10 z-50 hidden md:block"
      style={{ originY: 0 }}
    >
      <motion.div
        className="w-full bg-gradient-to-b from-[#DC143C] via-[#C41E3A] to-[#DAA520] origin-top"
        style={{ scaleY }}
      />
    </motion.div>
  )
}
