"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedLogo } from '@/components/hero/AnimatedLogo'
import { HeroVideo } from '@/components/hero/HeroVideo'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { TiltCard } from '@/components/ui/TiltCard'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { JoinFlow } from '@/components/onboarding/JoinFlow'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Link from 'next/link'

export default function Home() {
  const [isJoinFlowOpen, setIsJoinFlowOpen] = useState(false)
  return (
    <>
      <ScrollProgress />
      <JoinFlow isOpen={isJoinFlowOpen} onClose={() => setIsJoinFlowOpen(false)} />

      <main className="min-h-screen bg-black text-cream">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <HeroVideo />

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <AnimatedLogo />

            <motion.p
              className="text-xl md:text-2xl text-cream/80 max-w-3xl mx-auto leading-relaxed mt-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              An exclusive lifestyle community for individuals ages 30+.
              <br />
              <span className="text-gradient-gold font-semibold">
                It&apos;s not about your appearance — it&apos;s about your attitude.
              </span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => setIsJoinFlowOpen(true)}
              >
                Join the Movement
              </MagneticButton>
              <Link href="/events">
                <MagneticButton variant="outline" size="lg">
                  Explore Events
                </MagneticButton>
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2 } }}
            >
              <div className="w-6 h-10 rounded-full border-2 border-[#DC143C] flex justify-center p-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[#DC143C]"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Artist Teaser */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0000] to-black" />

          <motion.div
            className="relative z-10 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient-crimson mb-6">
                Featured Artist
              </h2>
              <p className="text-xl text-cream/70 max-w-2xl mx-auto">
                Discover extraordinary talent from our community
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link href="/artist/goddess">
                <TiltCard className="max-w-4xl mx-auto cursor-pointer group">
                  <div className="glass rounded-3xl overflow-hidden hover:border-[#DC143C]/50 transition-all duration-500">
                    <div className="aspect-[16/9] bg-gradient-to-br from-[#DC143C]/20 to-[#DAA520]/20 flex items-center justify-center relative">
                      {/* Placeholder for artist image */}
                      <div className="absolute inset-0 bg-[url('/images/goddess-preview.jpg')] bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10 text-center p-12">
                        <h3 className="text-6xl md:text-8xl font-display font-black text-gradient-gold mb-4">
                          GODDE$$
                        </h3>
                        <p className="text-2xl text-cream/90">
                          Explore Gallery →
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* What We're About */}
        <section className="py-32 px-6 bg-[#0A0A0A]">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-20" variants={fadeInUp}>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient-crimson mb-6">
                What We&apos;re About
              </h2>
              <p className="text-xl text-cream/70 max-w-2xl mx-auto">
                Excellence, sophistication, and authentic connections
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Mindset Over Everything',
                  description:
                    'We cater to the intellectual and self-motivated who are inspired to keep themselves and their community pushing forward. No nonsense, just growth.',
                },
                {
                  title: 'Connection & Culture',
                  description:
                    'Network with like-minded individuals who value psychological insight, strong communication, and beautiful culture. Comedy, parties, and authentic connections.',
                },
                {
                  title: 'Health & Vitality',
                  description:
                    'From alkaline recipes to workout routines tailored for your 30s-70s. We understand that health needs change, and we&apos;ve got you covered.',
                },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <TiltCard>
                    <div className="glass-crimson rounded-2xl p-8 h-full hover:glow-crimson transition-all duration-500">
                      <h3 className="text-2xl font-display font-bold text-gradient-gold mb-4">
                        {item.title}
                      </h3>
                      <p className="text-cream/80 leading-relaxed">{item.description}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Events Preview */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-black to-[#0A0A0A]" />

          <motion.div
            className="relative z-10 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-20" variants={fadeInUp}>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient-crimson mb-6">
                Upcoming Events
              </h2>
              <p className="text-xl text-cream/70 max-w-2xl mx-auto">
                Curated experiences for grown folks who know how to have a good time
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Monthly Spades Tournament', featured: true, desc: 'Test your skills against the best' },
                { title: 'Wine Tastings', desc: 'Sophisticated evenings with fine wines' },
                { title: 'Dance Parties', desc: 'Let loose with music and movement' },
                { title: 'Line Steppin\'', desc: 'Classic dances, new connections' },
                { title: 'Comedy Nights', desc: 'Laughter is medicine' },
                { title: 'Wellness Retreats', desc: 'Recharge and reconnect' },
              ].map((event, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <TiltCard>
                    <div
                      className={`glass rounded-2xl p-8 h-full transition-all duration-500 ${
                        event.featured ? 'glow-gold border-2 border-[#DAA520]' : 'hover:glow-crimson'
                      }`}
                    >
                      {event.featured && (
                        <span className="inline-block px-4 py-1 bg-gold-gradient rounded-full text-black text-sm font-semibold mb-4">
                          Featured Event
                        </span>
                      )}
                      <h3 className="text-2xl font-display font-bold text-gradient-gold mb-3">
                        {event.title}
                      </h3>
                      <p className="text-cream/80">{event.desc}</p>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            <motion.div className="text-center mt-12" variants={fadeInUp}>
              <Link href="/events">
                <MagneticButton variant="secondary" size="lg">
                  View All Events
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section id="join" className="py-32 px-6 bg-gradient-to-b from-[#0A0A0A] to-black">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-5xl md:text-7xl font-display font-bold text-gradient-crimson mb-8"
              variants={fadeInUp}
            >
              Ready to Join?
            </motion.h2>
            <motion.p className="text-2xl text-cream/80 mb-12 leading-relaxed" variants={fadeInUp}>
              Whether you&apos;re looking for events, health information, artist promotion, or
              genuine connections — we&apos;ve got you covered.
            </motion.p>
            <motion.p className="text-3xl font-display text-gradient-gold font-bold mb-12" variants={fadeInUp}>
              Age is just a number.
              <br />
              We&apos;re all capable of living our best lives.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => setIsJoinFlowOpen(true)}
              >
                Get Started Today
              </MagneticButton>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-[#DC143C]/20">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xl font-display text-cream/60 mb-2">The Grown & Sexy Movement</p>
            <p className="text-cream/40">
              Embracing age. Celebrating individuality. Living our best lives.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
