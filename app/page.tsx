"use client"

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { JoinFlow } from '@/components/onboarding/JoinFlow'
import { HeroVideo } from '@/components/hero/HeroVideo'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function Home() {
  const [isJoinFlowOpen, setIsJoinFlowOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const eventsRef = useRef<HTMLElement>(null)
  
  // Hero parallax - video scales up and fades as you scroll
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

  // Hero parallax transforms
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.2])
  const heroOpacity = useTransform(heroProgress, [0, 0.5, 1], [1, 0.8, 0])
  const heroContentY = useTransform(heroProgress, [0, 1], ['0%', '40%'])
  const videoY = useTransform(heroProgress, [0, 1], ['0%', '20%'])
  
  // About section parallax
  const aboutY = useTransform(aboutProgress, [0, 1], ['8%', '-8%'])
  const aboutImageY = useTransform(aboutProgress, [0, 1], ['15%', '-15%'])
  
  // Events parallax
  const eventsY = useTransform(eventsProgress, [0, 1], ['5%', '-5%'])

  return (
    <>
      <JoinFlow isOpen={isJoinFlowOpen} onClose={() => setIsJoinFlowOpen(false)} />

      <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
        
        {/* Navigation */}
        <motion.nav 
          className="fixed top-0 left-0 right-0 z-50 px-6 py-6 backdrop-blur-md bg-background/30"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
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
        </motion.nav>

        {/* Hero Section with Video Background */}
        <section
          ref={heroRef}
          className="relative h-[120vh] overflow-hidden"
          style={{ position: 'relative' }}
        >
          {/* Video Background with Parallax */}
          <motion.div 
            className="absolute inset-0"
            style={{ y: videoY, scale: heroScale }}
          >
            <HeroVideo />
          </motion.div>

          {/* Content Overlay */}
          <motion.div 
            className="relative z-10 h-screen flex flex-col justify-center px-6 pt-24"
            style={{ y: heroContentY, opacity: heroOpacity }}
          >
            <div className="max-w-7xl mx-auto w-full">
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
                    <button className="flex items-center gap-3 px-8 py-4 border border-foreground/30 rounded-full text-sm tracking-wide hover:border-foreground/60 hover:bg-foreground/5 transition-all backdrop-blur-sm">
                      Explore Events
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Scroll indicator */}
            <motion.div 
              className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.div
                className="w-px h-16 bg-gradient-to-b from-foreground/50 to-transparent"
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-xs tracking-[0.3em] uppercase text-foreground/40">
                Scroll
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Artist Section with Parallax */}
        <motion.section
          ref={aboutRef}
          className="relative py-32 px-6 bg-background"
          style={{ position: 'relative' }}
        >
          <motion.div 
            className="max-w-7xl mx-auto"
            style={{ y: aboutY }}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Image with parallax */}
              <Link href="/artist/goddess" className="group block">
                <motion.div 
                  className="aspect-[4/5] bg-card rounded-2xl overflow-hidden relative"
                  style={{ y: aboutImageY }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-muted/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
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
                </motion.div>
              </Link>

              {/* Right: About Text */}
              <div className="space-y-12">
                <div>
                  <motion.span 
                    className="text-xs tracking-[0.3em] uppercase text-foreground/50 mb-6 block"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    About Us
                  </motion.span>
                  <motion.h2 
                    className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    Where age is celebrated, not hidden
                  </motion.h2>
                  <motion.p 
                    className="text-foreground/60 text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    We cater to the intellectual and self-motivated who are inspired to keep 
                    themselves and their community pushing forward. No nonsense, just growth.
                  </motion.p>
                </div>

                <motion.div 
                  className="grid grid-cols-2 gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div>
                    <span className="text-4xl font-display mb-2 block">30+</span>
                    <span className="text-sm text-foreground/50">Age Community</span>
                  </div>
                  <div>
                    <span className="text-4xl font-display mb-2 block">100%</span>
                    <span className="text-sm text-foreground/50">Authentic</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Philosophy Section */}
        <section className="py-32 px-6 border-t border-foreground/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <motion.span 
                className="text-xs tracking-[0.3em] uppercase text-foreground/50 mb-6 block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Our Philosophy
              </motion.span>
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-display max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Built on three pillars of excellence
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
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
              ].map((item, index) => (
                <motion.div 
                  key={item.num} 
                  className="bg-card rounded-2xl p-10 md:p-12 border border-foreground/5 hover:border-foreground/10 transition-colors"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <span className="text-xs tracking-[0.3em] text-accent mb-8 block">
                    {item.num}
                  </span>
                  <h3 className="text-2xl font-display mb-4">{item.title}</h3>
                  <p className="text-foreground/50 leading-relaxed">{item.description}</p>
                </motion.div>
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
                <motion.span 
                  className="text-xs tracking-[0.3em] uppercase text-foreground/50 mb-6 block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Experiences
                </motion.span>
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-display"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Upcoming Events
                </motion.h2>
              </div>
              <Link href="/events" className="group inline-flex items-center gap-2 text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
                View All Events
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="space-y-0">
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
                      <span className="text-xs tracking-[0.2em] uppercase text-foreground/40 w-24">
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
        <section className="py-32 px-6 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.span 
              className="text-xs tracking-[0.3em] uppercase text-foreground/50 mb-8 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Join Us
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-display mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Age is just a number
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Whether you're looking for events, health information, artist promotion, 
              or genuine connections — we've got you covered.
            </motion.p>
            <motion.button
              onClick={() => setIsJoinFlowOpen(true)}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background rounded-full text-base tracking-wide hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
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
                    className="block text-sm text-foreground/60 hover:text-foreground transition-colors text-left"
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
                2026 The Grown & Sexy Movement. All rights reserved.
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
