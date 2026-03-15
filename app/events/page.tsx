"use client"

import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { TiltCard } from '@/components/ui/TiltCard'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, MapPin, Users, Trophy, Music, Wine, Heart, Sparkles } from 'lucide-react'

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
    location: 'Vintner\'s Room',
    price: '$45',
    category: 'Wine',
    icon: Wine,
    image: '/images/events/wine.jpg',
    description: 'An evening of sophisticated wine tasting paired with engaging conversation.',
    spots: 28,
  },
  {
    id: 'line-stepping',
    title: 'Line Steppin\' Night',
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
  return (
    <main className="min-h-screen bg-black text-cream">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1A0A0A] to-[#0A0000]">
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
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-6xl md:text-8xl font-display font-black text-gradient-crimson mb-6">
                Upcoming Events
              </h1>
              <p className="text-xl md:text-2xl text-cream/80 max-w-3xl mx-auto leading-relaxed mb-8">
                Curated experiences for grown folks who know how to have a good time
              </p>

              <Link href="/#join">
                <MagneticButton variant="primary" size="lg">
                  Become a Member
                </MagneticButton>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Featured Event - Spades Tournament */}
        <section className="py-32 px-6 bg-[#0A0A0A]">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <Trophy className="w-16 h-16 mx-auto mb-6 text-[#DAA520]" />
              <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient-gold mb-4">
                Featured Event
              </h2>
              <p className="text-xl text-cream/70">Don&apos;t miss our signature monthly tournament</p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <TiltCard>
                <div className="glass-crimson rounded-3xl overflow-hidden glow-gold border-2 border-[#DAA520]">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image Side */}
                    <div className="relative aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-[#DAA520]/30 to-[#DC143C]/30 flex items-center justify-center">
                      <Image
                        src={featuredEvent.image}
                        alt={featuredEvent.title}
                        fill
                        className="object-cover opacity-0 transition-opacity duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.display = 'none';
                        }}
                        onLoadingComplete={(image) => {
                          image.classList.remove('opacity-0');
                          image.classList.add('opacity-100');
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center z-10 group-hover:opacity-0 transition-opacity duration-300">
                        <div className="text-center p-12">
                          <Trophy className="w-32 h-32 mx-auto mb-6 text-[#DAA520]" />
                          <p className="text-6xl font-display font-black text-gradient-gold">♠️</p>
                        </div>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-12">
                      <span className="inline-block px-4 py-1 bg-gold-gradient rounded-full text-black text-sm font-semibold mb-6">
                        🏆 Monthly Tournament
                      </span>

                      <h3 className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-4">
                        {featuredEvent.title}
                      </h3>
                      <p className="text-2xl text-cream/90 mb-8">{featuredEvent.subtitle}</p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-cream/80">
                          <Calendar className="w-5 h-5 text-[#DAA520]" />
                          <span className="text-lg">{featuredEvent.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-cream/80">
                          <Clock className="w-5 h-5 text-[#DAA520]" />
                          <span className="text-lg">{featuredEvent.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-cream/80">
                          <MapPin className="w-5 h-5 text-[#DAA520]" />
                          <span className="text-lg">{featuredEvent.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-cream/80">
                          <Trophy className="w-5 h-5 text-[#DAA520]" />
                          <span className="text-lg font-semibold">{featuredEvent.prizePool}</span>
                        </div>
                      </div>

                      <p className="text-cream/80 leading-relaxed mb-8">
                        {featuredEvent.description}
                      </p>

                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-[#DAA520] mb-4">What's Included:</h4>
                        <ul className="grid grid-cols-2 gap-3">
                          {featuredEvent.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-cream/70">
                              <span className="text-[#DAA520] mt-1">✓</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <MagneticButton variant="secondary" size="lg" className="flex-1">
                          Register Now - {featuredEvent.price}
                        </MagneticButton>
                        <MagneticButton variant="outline" size="lg">
                          Learn More
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </section>

        {/* Upcoming Events Grid */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-black to-[#0A0A0A]" />

          <motion.div
            className="relative z-10 max-w-7xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient-crimson mb-6">
                More Events
              </h2>
              <p className="text-xl text-cream/70 max-w-2xl mx-auto">
                Something special happening every week
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <motion.div key={event.id} variants={fadeInUp}>
                  <TiltCard>
                    <div className="glass rounded-2xl overflow-hidden h-full hover:glow-crimson transition-all duration-500 group">
                    {/* Image/Icon Header */}
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-[#DC143C]/20 to-[#DAA520]/20 flex items-center justify-center">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.display = 'none';
                        }}
                        onLoadingComplete={(image) => {
                          image.classList.remove('opacity-0');
                          image.classList.add('opacity-100');
                        }}
                      />
                      <event.icon className="w-24 h-24 text-cream/30 group-hover:text-cream/50 transition-colors duration-500 z-10 group-hover:opacity-0" />
                    </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-3 py-1 bg-crimson-gradient rounded-full text-white text-xs font-semibold">
                            {event.category}
                          </span>
                          <span className="text-sm text-cream/60 flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.spots} spots left
                          </span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-gradient-gold mb-3">
                          {event.title}
                        </h3>

                        <p className="text-cream/70 mb-6 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="space-y-2 mb-6 text-sm">
                          <div className="flex items-center gap-2 text-cream/60">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-cream/60">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-cream/60">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-[#DAA520]">{event.price}</span>
                          <MagneticButton variant="primary" size="sm">
                            Reserve Spot
                          </MagneticButton>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 bg-gradient-to-b from-[#0A0A0A] to-black">
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
              Ready to Join Us?
            </motion.h2>
            <motion.p className="text-2xl text-cream/80 mb-12 leading-relaxed" variants={fadeInUp}>
              Become a member to get exclusive access to all our events, early registration, and special member pricing.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center" variants={fadeInUp}>
              <Link href="/#join">
                <MagneticButton variant="primary" size="lg">
                  Become a Member
                </MagneticButton>
              </Link>
              <Link href="/">
                <MagneticButton variant="outline" size="lg">
                  ← Back to Home
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-[#DC143C]/20">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xl font-display text-cream/60 mb-2">The Grown & Sexy Movement</p>
            <p className="text-cream/40">
              Creating unforgettable experiences for our community
            </p>
          </div>
        </footer>
    </main>
  )
}
