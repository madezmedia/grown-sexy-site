"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { Calendar, Clock, MapPin, Users, Trophy, Music, Wine, Heart, Sparkles, ArrowRight } from 'lucide-react'

const featuredEvent = {
  id: 'spades-tournament',
  title: 'Monthly Spades Tournament',
  subtitle: 'Test Your Skills, Win Big',
  date: 'Every Last Saturday',
  time: '7:00 PM - 11:00 PM',
  location: 'The Lounge at 5th & Main',
  price: '$25 Entry',
  prizePool: '$500+ Prize Pool',
  description: 'Bring your A-game to our legendary monthly spades tournament. Great music, drinks, and competition. All skill levels welcome.',
  highlights: [
    'Professional tournament format',
    'Cash prizes for top 3 teams',
    'Complimentary appetizers',
    'Full bar available',
    'Live DJ between rounds',
    'VIP table reservations available',
  ],
  image: '/images/events/spades-tournament.jpg',
}

const upcomingEvents = [
  {
    id: 'wine-tasting',
    title: 'Wine & Conversation',
    date: 'March 15, 2026',
    time: '6:00 PM',
    location: "Vintner's Room",
    price: '$45',
    category: 'Wine',
    icon: Wine,
    image: '/images/events/wine.jpg',
    description: 'An evening of sophisticated wine tasting paired with engaging conversation.',
    spots: 28,
  },
  {
    id: 'line-stepping',
    title: "Line Steppin' Night",
    date: 'March 22, 2026',
    time: '8:00 PM',
    location: 'Grand Ballroom',
    price: '$20',
    category: 'Dance',
    icon: Music,
    image: '/images/events/line-stepping.jpg',
    description: 'Classic dances, new connections, and unforgettable nights on the dance floor.',
    spots: 45,
  },
  {
    id: 'comedy-night',
    title: 'Comedy & Cocktails',
    date: 'March 29, 2026',
    time: '9:00 PM',
    location: 'The Laugh Factory',
    price: '$30',
    category: 'Comedy',
    icon: Sparkles,
    image: '/images/events/comedy.jpg',
    description: 'Laughter is medicine. Come get your dose with top local comedians.',
    spots: 18,
  },
  {
    id: 'wellness-retreat',
    title: 'Weekend Wellness Retreat',
    date: 'April 5-7, 2026',
    time: 'All Weekend',
    location: 'Mountain Resort',
    price: '$350',
    category: 'Wellness',
    icon: Heart,
    image: '/images/events/wellness.jpg',
    description: 'Recharge with yoga, meditation, and community in nature.',
    spots: 12,
  },
]

export default function EventsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 backdrop-blur-md bg-background/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-sm tracking-[0.2em] uppercase font-medium">
            Grown & Sexy
          </Link>
          <div className="hidden md:flex items-center gap-12">
            <Link href="/events" className="text-sm tracking-wide text-foreground">
              Events
            </Link>
            <Link href="/music" className="text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
              Music
            </Link>
            <Link href="/videos" className="text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
              Videos
            </Link>
            <Link href="/artist/goddess" className="text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
              Artists
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-muted/10"
          style={{ y: heroY }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-accent mb-6 block">
              What We Offer
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display mb-6">
              Upcoming Events
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed mb-8">
              Curated experiences for grown folks who know how to have a good time
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Event - Spades Tournament */}
      <section className="py-24 md:py-32 px-6 bg-card">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div
            className="text-center mb-16"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Trophy className="w-12 h-12 mx-auto mb-6 text-accent" />
            <span className="text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
              Don't Miss
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display">
              Featured Event
            </h2>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="rounded-3xl overflow-hidden border border-accent/30 bg-background">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative aspect-[4/3] lg:aspect-auto min-h-[400px]">
                  <Image
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-muted/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background lg:block hidden" />
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12">
                  <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
                    🏆 Monthly Tournament
                  </span>

                  <h3 className="text-3xl md:text-4xl font-display mb-2">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-xl text-foreground/70 mb-8">{featuredEvent.subtitle}</p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-foreground/60">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span>{featuredEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/60">
                      <Clock className="w-5 h-5 text-accent" />
                      <span>{featuredEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/60">
                      <MapPin className="w-5 h-5 text-accent" />
                      <span>{featuredEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/60">
                      <Trophy className="w-5 h-5 text-accent" />
                      <span className="font-medium text-foreground">{featuredEvent.prizePool}</span>
                    </div>
                  </div>

                  <p className="text-foreground/60 leading-relaxed mb-8">
                    {featuredEvent.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-foreground/50 uppercase tracking-wide mb-4">
                      What&apos;s Included:
                    </h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {featuredEvent.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/60">
                          <span className="text-accent mt-0.5">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 px-6 py-3 bg-foreground text-background rounded-full text-sm tracking-wide hover:scale-105 transition-transform">
                      Register Now - {featuredEvent.price}
                    </button>
                    <button className="px-6 py-3 border border-foreground/20 rounded-full text-sm tracking-wide hover:border-foreground/60 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Upcoming Events Grid */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div
            className="text-center mb-16"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
              Calendar
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display">
              More Events
            </h2>
            <p className="text-lg text-foreground/50 mt-4 max-w-2xl mx-auto">
              Something special happening every week
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group"
              >
                <div className="rounded-3xl overflow-hidden border border-foreground/5 hover:border-accent/30 transition-all duration-500 bg-card h-full">
                  {/* Image Header */}
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 -mt-20 relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                        {event.category}
                      </span>
                      <span className="text-sm text-foreground/50 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.spots} spots left
                      </span>
                    </div>

                    <h3 className="text-2xl font-display mb-3">{event.title}</h3>

                    <p className="text-foreground/50 mb-6 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex items-center gap-2 text-foreground/50">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/50">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/50">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-display text-accent">{event.price}</span>
                      <button className="group/btn flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
                        Reserve Spot
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-48 px-6 relative overflow-hidden bg-card">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-accent/10 via-transparent to-muted/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.span
            className="text-xs tracking-[0.3em] uppercase text-accent mb-8 block"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            Join Us
          </motion.span>
          <motion.h2
            className="text-4xl md:text-6xl font-display mb-8 leading-tight"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          >
            Ready to Join Us?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            Become a member to get exclusive access to all our events, early registration, and
            special member pricing.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <Link
              href="/#join"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-foreground text-background rounded-full text-base tracking-wide hover:scale-105 transition-transform"
            >
              Become a Member
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-foreground/20 rounded-full text-base tracking-wide hover:bg-foreground/5 transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
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
                <Link href="/music" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Music
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
  )
}
