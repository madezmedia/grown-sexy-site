"use client"

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { JoinFlow } from '@/components/onboarding/JoinFlow'
import { HeroVideo } from '@/components/hero/HeroVideo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Play, Calendar, Users, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  const pathname = usePathname()
  const [isJoinFlowOpen, setIsJoinFlowOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const eventsRef = useRef<HTMLElement>(null)
  const philosophyRef = useRef<HTMLElement>(null)
  
  // Hero parallax
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

  const { scrollYProgress: philosophyProgress } = useScroll({
    target: philosophyRef,
    offset: ['start end', 'end start'],
  })

  // Hero parallax transforms
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.2])
  const heroOpacity = useTransform(heroProgress, [0, 0.5, 1], [1, 0.8, 0])
  const heroContentY = useTransform(heroProgress, [0, 1], ['0%', '40%'])
  const videoY = useTransform(heroProgress, [0, 1], ['0%', '20%'])
  
  // Section parallax
  const aboutY = useTransform(aboutProgress, [0, 1], ['8%', '-8%'])
  const aboutImageY = useTransform(aboutProgress, [0, 1], ['12%', '-12%'])
  const eventsY = useTransform(eventsProgress, [0, 1], ['5%', '-5%'])
  const philosophyY = useTransform(philosophyProgress, [0, 1], ['6%', '-6%'])

  return (
    <>
      {pathname === '/' && <JoinFlow isOpen={isJoinFlowOpen} onClose={() => setIsJoinFlowOpen(false)} />}

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

        {/* Featured Section - Horizontal Cards */}
        <section className="py-24 md:py-32 px-6 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
                  What We Offer
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display">
                  The Experience
                </h2>
              </div>
              <p className="text-foreground/50 max-w-md text-lg">
                Curated experiences designed for the sophisticated and discerning.
              </p>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Calendar,
                  title: 'Exclusive Events',
                  description: 'From intimate wine tastings to vibrant dance parties, our events are crafted for meaningful connections.',
                  image: '/images/goddess/goddess-1.jpg',
                  accent: 'from-accent/30',
                },
                {
                  icon: Users,
                  title: 'Community',
                  description: 'Connect with like-minded individuals who value growth, authenticity, and living life fully.',
                  image: '/images/goddess/goddess-2.jpg',
                  accent: 'from-muted/40',
                },
                {
                  icon: Sparkles,
                  title: 'Wellness',
                  description: 'Health and vitality resources tailored for our evolving needs as we age gracefully.',
                  image: '/images/goddess/goddess-3.jpg',
                  accent: 'from-accent/20',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group relative bg-card rounded-3xl overflow-hidden border border-foreground/5 hover:border-foreground/10 transition-all duration-500"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
{/* Card Image Background */}
                                  <div className="aspect-[4/3] relative overflow-hidden">
                                    <Image 
                                      src={feature.image} 
                                      alt={feature.title}
                                      fill
                                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} via-card/60 to-card`} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute top-6 left-6">
                      <div className="w-12 h-12 rounded-2xl bg-foreground/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-foreground/20 transition-colors">
                        <feature.icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 -mt-20 relative">
                    <h3 className="text-2xl font-display mb-3">{feature.title}</h3>
                    <p className="text-foreground/50 leading-relaxed">{feature.description}</p>
                    
                    <motion.div 
                      className="mt-6 flex items-center gap-2 text-sm text-foreground/60 group-hover:text-foreground transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Artist Section with Parallax */}
        <motion.section
          ref={aboutRef}
          className="relative py-24 md:py-40 px-6"
          style={{ position: 'relative' }}
        >
          {/* Background Image with Parallax */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ y: aboutImageY }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-muted/10" />
            <div className="absolute inset-0 bg-background/90" />
          </motion.div>

          <motion.div 
            className="relative z-10 max-w-7xl mx-auto"
            style={{ y: aboutY }}
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Left: Large Image Card */}
              <div className="lg:col-span-5">
                <Link href="/artist/goddess" className="group block">
                  <motion.div 
                    className="aspect-[3/4] bg-card rounded-3xl overflow-hidden relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <Image 
                      src="/images/goddess/goddess-preview.jpg" 
                      alt="GODDE$$ - Featured Artist"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-muted/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-foreground/10 backdrop-blur-md flex items-center justify-center group-hover:bg-foreground/20 group-hover:scale-110 transition-all duration-500">
                        <Play className="w-8 h-8 ml-1" />
                      </div>
                    </div>

                    {/* Artist Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="text-xs tracking-[0.3em] uppercase text-foreground/50 mb-3 block">
                        Featured Artist
                      </span>
                      <h3 className="text-4xl md:text-5xl font-display mb-2">GODDE$$</h3>
                      <div className="flex items-center gap-2 text-sm text-foreground/60 group-hover:text-foreground transition-colors">
                        <span>View Gallery</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>

              {/* Right: About Content */}
              <div className="lg:col-span-7 space-y-12">
                <div>
                  <motion.span 
                    className="text-xs tracking-[0.3em] uppercase text-accent mb-6 block"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    About Our Community
                  </motion.span>
                  <motion.h2 
                    className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    Where age is 
                    <span className="text-foreground/40 block">celebrated, not hidden</span>
                  </motion.h2>
                  <motion.p 
                    className="text-foreground/60 text-lg md:text-xl leading-relaxed max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    We cater to the intellectual and self-motivated who are inspired to keep 
                    themselves and their community pushing forward. No nonsense, just growth.
                  </motion.p>
                </div>

                {/* Stats Grid */}
                <motion.div 
                  className="grid grid-cols-3 gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {[
                    { value: '30+', label: 'Age Community' },
                    { value: '500+', label: 'Members' },
                    { value: '50+', label: 'Events Yearly' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center lg:text-left">
                      <span className="text-3xl md:text-4xl font-display mb-2 block">{stat.value}</span>
                      <span className="text-xs md:text-sm text-foreground/50 tracking-wide">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <button 
                    onClick={() => setIsJoinFlowOpen(true)}
                    className="group inline-flex items-center gap-3 text-sm tracking-wide"
                  >
                    <span className="px-6 py-3 border border-foreground/20 rounded-full group-hover:bg-foreground group-hover:text-background transition-all">
                      Become a Member
                    </span>
                    <span className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Philosophy Section with Parallax */}
        <motion.section 
          ref={philosophyRef}
          className="py-24 md:py-32 px-6 bg-card relative overflow-hidden"
          style={{ position: 'relative' }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-muted/10 to-transparent rounded-full blur-3xl" />

          <motion.div 
            className="relative z-10 max-w-7xl mx-auto"
            style={{ y: philosophyY }}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
              <div>
                <motion.span 
                  className="text-xs tracking-[0.3em] uppercase text-accent mb-6 block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Our Philosophy
                </motion.span>
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Built on three pillars of excellence
                </motion.h2>
              </div>
              <motion.p 
                className="text-foreground/50 text-lg leading-relaxed lg:pt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Our approach combines psychological depth with physical vitality and meaningful connections, 
                creating a holistic experience for growth at any age.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  num: '01',
                  title: 'Mindset',
                  description: 'We value psychological insight, strong communication, and the drive for continuous personal growth.',
                  gradient: 'from-accent/20 to-transparent',
                },
                {
                  num: '02',
                  title: 'Connection',
                  description: 'Network with like-minded individuals through curated events, parties, and authentic community experiences.',
                  gradient: 'from-muted/30 to-transparent',
                },
                {
                  num: '03',
                  title: 'Vitality',
                  description: 'From wellness routines to nutrition guidance, we understand that health needs evolve with age.',
                  gradient: 'from-accent/15 to-transparent',
                },
              ].map((item, index) => (
                <motion.div 
                  key={item.num} 
                  className="group relative bg-background rounded-3xl p-10 md:p-12 border border-foreground/5 hover:border-accent/20 transition-all duration-500 overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <span className="text-xs tracking-[0.3em] text-accent mb-8 block font-medium">
                      {item.num}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display mb-4 group-hover:text-foreground transition-colors">{item.title}</h3>
                    <p className="text-foreground/50 leading-relaxed group-hover:text-foreground/70 transition-colors">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Events Section with Parallax */}
        <motion.section
          ref={eventsRef}
          className="py-24 md:py-32 px-6 bg-background relative"
          style={{ position: 'relative' }}
        >
          <motion.div 
            className="max-w-7xl mx-auto"
            style={{ y: eventsY }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <motion.span 
                  className="text-xs tracking-[0.3em] uppercase text-accent mb-6 block"
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
              <Link href="/events" className="group inline-flex items-center gap-3 px-6 py-3 border border-foreground/20 rounded-full text-sm tracking-wide hover:bg-foreground hover:text-background transition-all">
                View All Events
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="space-y-0">
              {[
                { title: 'Monthly Spades Tournament', tag: 'Featured', date: 'Every Last Saturday', image: '/images/events/spades-tournament.jpg' },
                { title: 'Wine Tastings', tag: 'Social', date: 'Bi-Weekly', image: '/images/events/wine.jpg' },
                { title: 'Dance Parties', tag: 'Entertainment', date: 'Monthly', image: '/images/goddess/goddess-4.jpg' },
                { title: 'Wellness Retreats', tag: 'Health', date: 'Quarterly', image: '/images/events/wellness.jpg' },
              ].map((event, index) => (
                <motion.div
                  key={index}
                  className="group relative py-8 md:py-10 border-b border-foreground/10 cursor-pointer hover:bg-foreground/[0.02] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-8">
{/* Event Preview Thumbnail */}
                                      <div className="hidden md:block w-16 h-16 rounded-2xl bg-card overflow-hidden flex-shrink-0 relative">
                                        <Image 
                                          src={event.image} 
                                          alt={event.title}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs tracking-[0.2em] uppercase text-accent">
                          {event.tag}
                        </span>
                        <h3 className="text-xl md:text-2xl font-display group-hover:translate-x-2 transition-transform">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 md:gap-8">
                      <span className="text-sm text-foreground/50">{event.date}</span>
                      <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-foreground group-hover:text-background transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Gallery Section */}
        <section className="py-24 md:py-32 px-6 bg-card relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <motion.span 
                  className="text-xs tracking-[0.3em] uppercase text-accent mb-4 block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Gallery
                </motion.span>
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-display"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Moments Captured
                </motion.h2>
              </div>
              <Link href="/artist/goddess" className="group inline-flex items-center gap-3 px-6 py-3 border border-foreground/20 rounded-full text-sm tracking-wide hover:bg-foreground hover:text-background transition-all">
                View Full Gallery
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Masonry-style Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div 
                className="col-span-2 row-span-2 relative aspect-square rounded-3xl overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Image 
                  src="/images/goddess/goddess-1.jpg" 
                  alt="Gallery image 1"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              
              <motion.div 
                className="relative aspect-square rounded-3xl overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Image 
                  src="/images/goddess/goddess-2.jpg" 
                  alt="Gallery image 2"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              
              <motion.div 
                className="relative aspect-square rounded-3xl overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Image 
                  src="/images/goddess/goddess-3.jpg" 
                  alt="Gallery image 3"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              
              <motion.div 
                className="relative aspect-square rounded-3xl overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Image 
                  src="/images/goddess/goddess-4.jpg" 
                  alt="Gallery image 4"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              
              <motion.div 
                className="relative aspect-square rounded-3xl overflow-hidden group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Image 
                  src="/images/goddess/goddess-5.jpg" 
                  alt="Gallery image 5"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 md:py-48 px-6 relative overflow-hidden bg-background">
          {/* Background gradient */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-accent/10 via-transparent to-muted/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.span 
              className="text-xs tracking-[0.3em] uppercase text-accent mb-8 block"
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
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={() => setIsJoinFlowOpen(true)}
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-foreground text-background rounded-full text-base tracking-wide hover:scale-105 transition-transform"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <Link href="/events">
                <button className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-foreground/20 rounded-full text-base tracking-wide hover:bg-foreground/5 transition-colors">
                  Browse Events
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 md:py-24 px-6 border-t border-foreground/10 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                <span className="text-sm tracking-[0.2em] uppercase font-medium mb-6 block">
                  Grown & Sexy
                </span>
                <p className="text-foreground/50 leading-relaxed max-w-md mb-8">
                  Embracing age. Celebrating individuality. Living our best lives. 
                  Join a community that understands the beauty of experience.
                </p>
                <button
                  onClick={() => setIsJoinFlowOpen(true)}
                  className="inline-flex items-center gap-2 text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors"
                >
                  Join the community <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-foreground/40 mb-6 block">
                  Navigate
                </span>
                <div className="space-y-4">
                  <Link href="/events" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                    Events
                  </Link>
                  <Link href="/artist/goddess" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                    Artists
                  </Link>
                  <Link href="#" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                    Membership
                  </Link>
                  <Link href="#" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </div>
              </div>
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-foreground/40 mb-6 block">
                  Connect
                </span>
                <div className="space-y-4">
                  <a href="#" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-xs text-foreground/40">
                © 2026 Grown & Sexy. All rights reserved.
              </span>
              <div className="flex gap-6">
                <Link href="#" className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
