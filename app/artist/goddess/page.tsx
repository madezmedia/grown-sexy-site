"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { TiltCard } from '@/components/ui/TiltCard'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Link from 'next/link'
import { useRef } from 'react'

const images = [
  { id: 1, url: '/images/goddess/goddess-1.jpg', alt: 'GODDE$$ in elegant black gown' },
  { id: 2, url: '/images/goddess/goddess-2.jpg', alt: 'GODDE$$ in tiger print fur' },
  { id: 3, url: '/images/goddess/goddess-3.jpg', alt: 'GODDE$$ in white fur' },
  { id: 4, url: '/images/goddess/goddess-4.jpg', alt: 'GODDE$$ in gold dress' },
  { id: 5, url: '/images/goddess/goddess-5.jpg', alt: 'GODDE$$ in prayer pose' },
]

export default function GoddessPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-cream">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black via-[#1A0A0A] to-[#0A0000]"
          style={{ y, opacity }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(220, 20, 60, 0.2) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-8xl md:text-9xl font-display font-black text-gradient-gold mb-6 text-glow-crimson">
              GODDE$$
            </h1>
            <p className="text-2xl md:text-3xl text-cream/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Featured artist of The Grown & Sexy Movement
              <br />
              <span className="text-gradient-crimson">
                Elegance, Confidence, Artistry
              </span>
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <MagneticButton variant="primary" size="lg">
                Follow on Instagram
              </MagneticButton>
              <Link href="/">
                <MagneticButton variant="outline" size="lg">
                  ← Back to Home
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 2 } }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-[#DAA520] flex justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#DAA520]"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-32 px-6 bg-[#0A0A0A]">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <TiltCard>
              <div className="glass-crimson rounded-3xl p-12">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-8">
                  About GODDE$$
                </h2>
                <div className="space-y-6 text-lg text-cream/80 leading-relaxed">
                  <p>
                    GODDE$$ embodies the essence of The Grown & Sexy Movement — a celebration of confidence,
                    sophistication, and authentic self-expression. Her artistry transcends conventional boundaries,
                    creating a unique fusion of elegance and bold creativity.
                  </p>
                  <p>
                    From high fashion to soulful expression, GODDE$$ represents what it means to embrace
                    who you are with unapologetic confidence. Her work inspires our community to live their
                    best lives, regardless of age or circumstance.
                  </p>
                  <p className="text-gradient-crimson font-semibold text-xl">
                    Age is just a number. Attitude is everything.
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Section - Horizontal Scroll */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-black to-[#0A0A0A]" />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient-crimson mb-6">
              Gallery
            </h2>
            <p className="text-xl text-cream/70">
              A visual journey through elegance and artistry
            </p>
          </motion.div>

          {/* Image Grid with Masonry Layout */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                variants={fadeInUp}
                custom={index}
                className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              >
                <TiltCard>
                  <div className="relative overflow-hidden rounded-2xl group cursor-pointer">
                    {/* Placeholder gradient - client will replace with actual images */}
                    <div
                      className={`
                        ${index === 0 ? 'aspect-[16/10]' : 'aspect-square'}
                        bg-gradient-to-br from-[#DC143C]/30 to-[#DAA520]/30
                        hover:from-[#DC143C]/50 hover:to-[#DAA520]/50
                        transition-all duration-500
                        flex items-center justify-center
                        relative
                      `}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                      <p className="text-cream/60 text-lg font-display">
                        {image.alt}
                      </p>
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                      <p className="text-cream font-display">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center mt-16" variants={fadeInUp}>
            <p className="text-cream/60 text-lg mb-6">
              Images will be added by client
            </p>
            <MagneticButton variant="secondary" size="lg">
              View Full Portfolio
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Connect Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0A0A0A] to-black">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-display font-bold text-gradient-gold mb-8"
            variants={fadeInUp}
          >
            Connect with GODDE$$
          </motion.h2>
          <motion.p className="text-2xl text-cream/80 mb-12 leading-relaxed" variants={fadeInUp}>
            Follow the journey and stay updated with the latest work
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-6 justify-center" variants={fadeInUp}>
            <MagneticButton variant="primary" size="lg">
              Instagram
            </MagneticButton>
            <MagneticButton variant="secondary" size="lg">
              Contact
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#DC143C]/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xl font-display text-cream/60 mb-2">The Grown & Sexy Movement</p>
          <p className="text-cream/40">
            Featuring extraordinary artists from our community
          </p>
        </div>
      </footer>
    </main>
  )
}
