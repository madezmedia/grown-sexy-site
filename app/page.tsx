"use client"

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { JoinFlow } from '@/components/onboarding/JoinFlow'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function Home() {
  const [isJoinFlowOpen, setIsJoinFlowOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const eventsRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end start'],
  })

  const { scrollYProgress: eventsProgress } = useScroll({
    target: eventsRef,
    offset: ['start end', 'end start'],
  })

  const heroY = useTransform(heroProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0])
  const aboutY = useTransform(aboutProgress, [0, 1], ['10%', '-10%'])
  const eventsY = useTransform(eventsProgress, [0, 1], ['5%', '-5%'])

  return (
    <>
      <JoinFlow isOpen={isJoinFlowOpen} onClose={() => setIsJoinFlowOpen(false)} />

      <div ref={containerRef} className="min-h-screen bg-background text-foreground">
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-sm tracking-[0.2em] uppercase font-medium">
              Grown & Sexy
            </span>
            <div className="hidden md:flex items-center gap-12">
              <Link href="/events" className="text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
                Events
              </Link>
              <Link href="/artist/goddess" className="text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
                Artists
              </Link>
              <button 
                onClick={() => setIsJoinFlowOpen(true)}
                className="text-sm tracking-wide px-5 py-2.5 border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-all"
              >
                Join
              </button>
            </div>
            <button className="md:hidden text-sm tracking-wide">
              Menu
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="relative min-h-screen flex flex-col justify-center px-6 pt-24"
          style={{ position: 'relative' }}
        >
          <motion.div 
            className="max-w-7xl mx-auto w-full"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            {/* Main headline */}
            <div className="mb-12">
              <motion.h1 
                className="text-[clamp(3rem,12vw,10rem)] leading-[0.9] font-display tracking-tight"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block">Elegance</span>
                <span className="block text-foreground/40">meets attitude</span>
              </motion.h1>
            </div>

            {/* Subtext and CTA */}
            <div className="grid md:grid-cols-2 gap-12 items-end">
              <motion.p 
                className="text-lg md:text-xl text-foreground/60 max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                An exclusive lifestyle community for individuals ages 30+. 
                Where sophistication meets authenticity.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4 md:justify-end"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setIsJoinFlowOpen(true)}
                  className="group flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full text-sm tracking-wide hover:scale-105 transition-transform"
                >
                  Join the Movement
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <Link href="/events">
                  <button className="flex items-center gap-3 px-8 py-4 border border-foreground/20 rounded-full text-sm tracking-wide hover:border-foreground/40 transition-colors">
                    Explore Events
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-12 left-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-foreground/40 rotate-90 origin-left block">
              Scroll
            </span>
          </motion.div>
        </motion.section>

        {/* Featured Artist Section */}
        <motion.section
          ref={aboutRef}
          className="relative py-32 px-6"
          style={{ position: 'relative' }}
        >
          <motion.div 
            className="max-w-7xl mx-auto"
            style={{ y: aboutY }}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Image/Featured */}
              <Link href="/artist/goddess" className="group block">
                <div className="aspect-[4/5] bg-card rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="text-xs tracking-[0.3em] uppercase text-foreground/50 mb-2 block">
                      Featured Artist
                    </span>
                    <h3 className="text-4xl md:text-5xl font-display mb-4">GODDE$$</h3>
                    <span className="inline-flex items-center gap-2 text-sm text-foreground/60 group-hover:text-foreground transition-colors">
                      View Gallery
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Right: About Text */}
              <div className="space-y-12">
                <div>
                  <span className="text-xs tracking-[0.3em] uppercase text-foreground/50 mb-6 block">
                    About Us
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-8">
                    Where age is celebrated, not hidden
                  </h2>
                  <p className="text-foreground/60 text-lg leading-relaxed">
                    We cater to the intellectual and self-motivated who are inspired to keep 
                    themselves and their community pushing forward. No nonsense, just growth.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="text-3xl font-display mb-2 block">30+</span>
                    <span className="text-sm text-foreground/50">Age Community</span>
                  </div>
                  <div>
                    <span className="text-3xl font-display mb-2 block">100%</span>
                    <span className="text-sm text-foreground/50">Authentic</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Philosophy Section */}
        <section className="py-32 px-6 border-t border-foreground/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <span className="text-xs tracking-[0.3em] uppercase text-foreground/50 mb-6 block">
                Our Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display max-w-3xl">
                Built on three pillars of excellence
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
              {[
                {
                  num: '01',
                  title: 'Mindset',
                  description: 'We value psychological insight, strong communication, and the drive for continuous personal growth.',
                },
                {
                  num: '02',
                  title: 'Connection',
                  description: 'Network with like-minded individuals through curated events, parties, and authentic community experiences.',
                },
                {
                  num: '03',
                  title: 'Vitality',
                  description: 'From wellness routines to nutrition guidance, we understand that health needs evolve with age.',
                },
              ].map((item) => (
                <div key={item.num} className="bg-background p-10 md:p-12">
                  <span className="text-xs tracking-[0.3em] text-foreground/30 mb-8 block">
                    ({item.num})
                  </span>
                  <h3 className="text-2xl font-display mb-4">{item.title}</h3>
                  <p className="text-foreground/50 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events Section with Parallax */}
        <motion.section
          ref={eventsRef}
          className="py-32 px-6 bg-card"
          style={{ position: 'relative' }}
        >
          <motion.div 
            className="max-w-7xl mx-auto"
            style={{ y: eventsY }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-foreground/50 mb-6 block">
                  Experiences
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display">
                  Upcoming Events
                </h2>
              </div>
              <Link href="/events" className="group inline-flex items-center gap-2 text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
                View All Events
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="space-y-px">
              {[
                { title: 'Monthly Spades Tournament', tag: 'Featured', date: 'Every Last Saturday' },
                { title: 'Wine Tastings', tag: 'Social', date: 'Bi-Weekly' },
                { title: 'Dance Parties', tag: 'Entertainment', date: 'Monthly' },
                { title: 'Wellness Retreats', tag: 'Health', date: 'Quarterly' },
              ].map((event, index) => (
                <motion.div
                  key={index}
                  className="group py-8 border-b border-foreground/10 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <span className="text-xs tracking-[0.2em] uppercase text-foreground/40 w-20">
                        {event.tag}
                      </span>
                      <h3 className="text-xl md:text-2xl font-display group-hover:translate-x-2 transition-transform">
                        {event.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-foreground/50">{event.date}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs tracking-[0.3em] uppercase text-foreground/50 mb-8 block">
              Join Us
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display mb-8 leading-tight">
              Age is just a number
            </h2>
            <p className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you're looking for events, health information, artist promotion, 
              or genuine connections — we've got you covered.
            </p>
            <button
              onClick={() => setIsJoinFlowOpen(true)}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background rounded-full text-base tracking-wide hover:scale-105 transition-transform"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-foreground/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div>
                <span className="text-sm tracking-[0.2em] uppercase font-medium mb-6 block">
                  Grown & Sexy
                </span>
                <p className="text-sm text-foreground/50 leading-relaxed max-w-xs">
                  Embracing age. Celebrating individuality. Living our best lives.
                </p>
              </div>
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-foreground/40 mb-6 block">
                  Navigate
                </span>
                <div className="space-y-3">
                  <Link href="/events" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                    Events
                  </Link>
                  <Link href="/artist/goddess" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                    Artists
                  </Link>
                  <button
                    onClick={() => setIsJoinFlowOpen(true)}
                    className="block text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    Join Community
                  </button>
                </div>
              </div>
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-foreground/40 mb-6 block">
                  Connect
                </span>
                <div className="space-y-3">
                  <a href="#" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-foreground/10">
              <span className="text-xs text-foreground/40">
                &copy; 2026 The Grown & Sexy Movement. All rights reserved.
              </span>
              <span className="text-xs text-foreground/40">
                It's not about appearance — it's about attitude.
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
