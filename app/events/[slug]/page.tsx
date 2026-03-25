"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Users, Trophy, ArrowLeft, Check } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import type { Event } from '@/lib/outstatic'

export default function EventDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`/api/events/${slug}`)
        if (!response.ok) {
          setEvent(null)
          return
        }
        const data = await response.json()
        setEvent(data)
      } catch (error) {
        console.error('Error fetching event:', error)
        setEvent(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground/60">Loading event...</div>
      </div>
    )
  }

  if (!event) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 backdrop-blur-md bg-background/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/events" className="flex items-center gap-2 text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden mt-20">
        {event.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          </div>
        )}

        <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-4">
              {event.category}
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-4">
              {event.title}
            </h1>
            {event.subtitle && (
              <p className="text-2xl text-foreground/70 mb-8">
                {event.subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Event Details */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-primary mt-1" />
              <div>
                <div className="text-sm text-foreground/60 mb-1">Date</div>
                <div className="text-lg">{event.date}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary mt-1" />
              <div>
                <div className="text-sm text-foreground/60 mb-1">Time</div>
                <div className="text-lg">{event.time}</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <div className="text-sm text-foreground/60 mb-1">Location</div>
                <div className="text-lg">{event.location}</div>
              </div>
            </div>

            {event.spots && (
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-primary mt-1" />
                <div>
                  <div className="text-sm text-foreground/60 mb-1">Available Spots</div>
                  <div className="text-lg">{event.spots} spots remaining</div>
                </div>
              </div>
            )}

            {event.prizePool && (
              <div className="flex items-start gap-4">
                <Trophy className="w-6 h-6 text-primary mt-1" />
                <div>
                  <div className="text-sm text-foreground/60 mb-1">Prize Pool</div>
                  <div className="text-lg font-semibold text-primary">{event.prizePool}</div>
                </div>
              </div>
            )}

            <div className="pt-8">
              <div className="text-4xl font-bold mb-2">{event.price}</div>
              <MagneticButton variant="primary" size="lg" className="w-full">
                Reserve Your Spot
              </MagneticButton>
            </div>
          </div>

          {/* Right Column - Description & Highlights */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">About This Event</h2>
            <div
              className="prose prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: event.content }}
            />

            {event.highlights && event.highlights.length > 0 && (
              <div>
                <h3 className="text-xl font-display font-semibold mb-4">Event Highlights</h3>
                <ul className="space-y-3">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-foreground/10 pt-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-display font-bold mb-4">
              Don't Miss Out
            </h3>
            <p className="text-lg text-foreground/60 mb-8">
              {event.status === 'sold-out'
                ? 'This event is sold out. Join our mailing list to be notified of future events.'
                : 'Secure your spot today and join us for an unforgettable experience.'
              }
            </p>
            {event.status !== 'sold-out' && (
              <MagneticButton variant="primary" size="lg">
                Register Now
              </MagneticButton>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
