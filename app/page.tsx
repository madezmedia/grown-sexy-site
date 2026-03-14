"use client"

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedLogo } from '@/components/hero/AnimatedLogo'
import { HeroVideo } from '@/components/hero/HeroVideo'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { JoinFlow } from '@/components/onboarding/JoinFlow'
import { ParallaxSection, ParallaxText } from '@/components/ui/ParallaxSection'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function Home() {
  const [isJoinFlowOpen, setIsJoinFlowOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <>
      <ScrollProgress />
      <JoinFlow isOpen={isJoinFlowOpen} onClose={() => setIsJoinFlowOpen(false)} />

      <main className="min-h-screen bg-black text-cream">
        {/* Hero Section with Parallax */}
        <motion.section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ opacity: heroOpacity, scale: heroScale, position: 'relative' }}
        >
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
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <button
                onClick={() => setIsJoinFlowOpen(true)}
                className="group px-8 py-4 bg-gradient-to-r from-[#DC143C] to-[#C41E3A] text-white rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.4)] hover:scale-105"
              >
                Join the Movement
                <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <Link href="/events">
                <button className="px-8 py-4 border-2 border-cream/30 text-cream rounded-full font-semibold text-lg transition-all duration-300 hover:border-cream hover:bg-cream/5">
                  Explore Events
                </button>
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ChevronDown className="w-8 h-8 text-cream/50" />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Artist Section */}
        <ParallaxSection
          className="py-32 px-6"
          bgClassName="bg-gradient-to-b from-black via-[#0A0000] to-black"
          overlay={false}
        >
          <motion.div
            className="relative z-10 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <ParallaxText speed={0.1}>
              <motion.div className="text-center mb-16" variants={fadeInUp}>
                <span className="text-sm uppercase tracking-[0.3em] text-[#DAA520] mb-4 block">
                  Spotlight
                </span>
                <h2 className="text-5xl md:text-7xl font-display font-bold text-cream mb-6">
                  Featured Artist
                </h2>
                <p className="text-xl text-cream/60 max-w-2xl mx-auto">
                  Discover extraordinary talent from our community
                </p>
              </motion.div>
            </ParallaxText>

            <motion.div variants={fadeInUp}>
              <Link href="/artist/goddess" className="block">
                <div className="max-w-4xl mx-auto group">
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#DC143C]/10 to-[#DAA520]/10 border border-white/10 transition-all duration-500 group-hover:border-[#DC143C]/30">
                    <div className="aspect-[16/9] relative flex items-center justify-center">
                      <Image
                        src="/images/goddess/goddess-preview.jpg"
                        alt="GODDE$$ Preview"
                        fill
                        className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                        sizes="(max-width: 1024px) 100vw, 80vw"
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.display = 'none';
                        }}
                      />

                      <div className="relative z-10 text-center p-12">
                        <h3 className="text-6xl md:text-8xl font-display font-black text-gradient-gold mb-4">
                          GODDE$$
                        </h3>
                        <p className="text-xl text-cream/80 flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                          Explore Gallery
                          <ArrowRight className="w-5 h-5" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </ParallaxSection>

        {/* What We're About - Parallax Cards */}
        <section className="py-32 px-6 bg-[#050505]">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <ParallaxText speed={0.15}>
              <motion.div className="text-center mb-20" variants={fadeInUp}>
                <span className="text-sm uppercase tracking-[0.3em] text-[#DC143C] mb-4 block">
                  Our Philosophy
                </span>
                <h2 className="text-5xl md:text-7xl font-display font-bold text-cream mb-6">
                  What We&apos;re About
                </h2>
                <p className="text-xl text-cream/60 max-w-2xl mx-auto">
                  Excellence, sophistication, and authentic connections
                </p>
              </motion.div>
            </ParallaxText>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Mindset Over Everything',
                  description:
                    'We cater to the intellectual and self-motivated who are inspired to keep themselves and their community pushing forward. No nonsense, just growth.',
                  accent: '#DC143C',
                },
                {
                  title: 'Connection & Culture',
                  description:
                    'Network with like-minded individuals who value psychological insight, strong communication, and beautiful culture. Comedy, parties, and authentic connections.',
                  accent: '#DAA520',
                },
                {
                  title: 'Health & Vitality',
                  description:
                    'From alkaline recipes to workout routines tailored for your 30s-70s. We understand that health needs change, and we\'ve got you covered.',
                  accent: '#DC143C',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group"
                >
                  <div
                    className="h-full rounded-2xl p-8 bg-[#0A0A0A] border border-white/5 transition-all duration-500 hover:border-white/10"
                    style={{
                      '--accent': item.accent,
                    } as React.CSSProperties}
                  >
                    <div
                      className="w-12 h-1 rounded-full mb-6 transition-all duration-300 group-hover:w-16"
                      style={{ backgroundColor: item.accent }}
                    />
                    <h3 className="text-2xl font-display font-bold text-cream mb-4">
                      {item.title}
                    </h3>
                    <p className="text-cream/60 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Events Preview with Parallax */}
        <ParallaxSection
          className="py-32 px-6"
          bgClassName="bg-gradient-to-b from-[#050505] via-black to-[#050505]"
          overlay={false}
        >
          <motion.div
            className="relative z-10 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <ParallaxText speed={0.12}>
              <motion.div className="text-center mb-20" variants={fadeInUp}>
                <span className="text-sm uppercase tracking-[0.3em] text-[#DAA520] mb-4 block">
                  Experience
                </span>
                <h2 className="text-5xl md:text-7xl font-display font-bold text-cream mb-6">
                  Upcoming Events
                </h2>
                <p className="text-xl text-cream/60 max-w-2xl mx-auto">
                  Curated experiences for grown folks who know how to have a good time
                </p>
              </motion.div>
            </ParallaxText>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Monthly Spades Tournament', featured: true, desc: 'Test your skills against the best' },
                { title: 'Wine Tastings', desc: 'Sophisticated evenings with fine wines' },
                { title: 'Dance Parties', desc: 'Let loose with music and movement' },
                { title: 'Line Steppin\'', desc: 'Classic dances, new connections' },
                { title: 'Comedy Nights', desc: 'Laughter is medicine' },
                { title: 'Wellness Retreats', desc: 'Recharge and reconnect' },
              ].map((event, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group"
                >
                  <div
                    className={`rounded-2xl p-6 h-full transition-all duration-500 ${
                      event.featured
                        ? 'bg-gradient-to-br from-[#DAA520]/20 to-[#DAA520]/5 border-2 border-[#DAA520]/50'
                        : 'bg-[#0A0A0A] border border-white/5 hover:border-white/10'
                    }`}
                  >
                    {event.featured && (
                      <span className="inline-block px-3 py-1 bg-[#DAA520] text-black text-xs font-semibold rounded-full mb-4">
                        Featured Event
                      </span>
                    )}
                    <h3 className="text-xl font-display font-bold text-cream mb-2">
                      {event.title}
                    </h3>
                    <p className="text-cream/60 text-sm">{event.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div className="text-center mt-12" variants={fadeInUp}>
              <Link href="/events">
                <button className="group px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-black rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(218,165,32,0.3)] hover:scale-105">
                  View All Events
                  <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </ParallaxSection>

        {/* CTA Section */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A0000] to-black" />
          
          {/* Subtle background accent */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#DC143C]/10 rounded-full blur-[150px]" />
          </div>

          <motion.div
            className="relative z-10 max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span
              className="text-sm uppercase tracking-[0.3em] text-[#DC143C] mb-4 block"
              variants={fadeInUp}
            >
              Join Us
            </motion.span>
            <motion.h2
              className="text-5xl md:text-7xl font-display font-bold text-cream mb-8"
              variants={fadeInUp}
            >
              Ready to Join?
            </motion.h2>
            <motion.p className="text-xl text-cream/70 mb-8 leading-relaxed" variants={fadeInUp}>
              Whether you&apos;re looking for events, health information, artist promotion, or
              genuine connections — we&apos;ve got you covered.
            </motion.p>
            <motion.p className="text-2xl md:text-3xl font-display text-gradient-gold font-semibold mb-12" variants={fadeInUp}>
              Age is just a number.
              <br />
              We&apos;re all capable of living our best lives.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <button
                onClick={() => setIsJoinFlowOpen(true)}
                className="group px-10 py-5 bg-gradient-to-r from-[#DC143C] to-[#C41E3A] text-white rounded-full font-semibold text-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(220,20,60,0.4)] hover:scale-105"
              >
                Get Started Today
                <ArrowRight className="inline-block ml-2 w-6 h-6 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/5 bg-[#030303]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-xl font-display text-cream mb-1">The Grown & Sexy Movement</p>
                <p className="text-cream/40 text-sm">
                  Embracing age. Celebrating individuality. Living our best lives.
                </p>
              </div>
              <div className="flex gap-6">
                <Link href="/events" className="text-cream/60 hover:text-cream transition-colors text-sm">
                  Events
                </Link>
                <Link href="/artist/goddess" className="text-cream/60 hover:text-cream transition-colors text-sm">
                  Artists
                </Link>
                <button
                  onClick={() => setIsJoinFlowOpen(true)}
                  className="text-[#DC143C] hover:text-[#FF6B6B] transition-colors text-sm font-semibold"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
