"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Music as MusicIcon, Calendar, Disc3, ArrowRight } from 'lucide-react'
import type { Music } from '@/lib/outstatic'

export default function MusicPage() {
  const [tracks, setTracks] = useState<Music[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMusic() {
      try {
        const response = await fetch('/api/music')
        if (response.ok) {
          const data = await response.json()
          setTracks(data)
        }
      } catch (error) {
        console.error('Error fetching music:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMusic()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground/60">Loading music...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 backdrop-blur-md bg-background/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-sm tracking-[0.2em] uppercase font-medium">
            Grown & Sexy
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/music" className="text-sm tracking-wide text-foreground">
              Music
            </Link>
            <Link href="/videos" className="text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
              Videos
            </Link>
            <Link href="/" className="text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
              <MusicIcon className="w-8 h-8 text-accent" />
            </div>
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-accent">
                Sonic Experience
              </span>
              <h1 className="text-6xl md:text-7xl font-display font-bold">
                Music
              </h1>
            </div>
          </motion.div>
          <motion.p
            className="text-xl text-foreground/60 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Curated sounds from our featured artists. Stream, vibe, and support the movement.
          </motion.p>
        </div>
      </section>

      {/* Music Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {tracks.length === 0 ? (
            <div className="text-center py-16">
              <Disc3 className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
              <p className="text-foreground/40">No tracks yet. Coming soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/music/${track.slug}`}>
                    <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 bg-card">
                      {track.coverImage ? (
                        <Image
                          src={track.coverImage}
                          alt={track.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-muted/20">
                          <MusicIcon className="w-16 h-16 text-foreground/20" />
                        </div>
                      )}
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center">
                          <Play className="w-6 h-6 ml-1" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-display font-semibold group-hover:text-accent transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-foreground/60">{track.artist}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-foreground/40">
                          {track.genre && (
                            <>
                              <span>{track.genre}</span>
                              <span>•</span>
                            </>
                          )}
                          {track.releaseDate && (
                            <span>{new Date(track.releaseDate).getFullYear()}</span>
                          )}
                        </div>

                        {(track.spotifyUrl || track.appleMusicUrl) && (
                          <div className="flex gap-2">
                            {track.spotifyUrl && (
                              <a
                                href={track.spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-3 py-1 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                                onClick={(e) => e.preventDefault()}
                              >
                                Spotify
                              </a>
                            )}
                            {track.appleMusicUrl && (
                              <a
                                href={track.appleMusicUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-3 py-1 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                                onClick={(e) => e.preventDefault()}
                              >
                                Apple
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-display mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Support the Artists
          </motion.h2>
          <motion.p
            className="text-foreground/60 text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Stream on your favorite platform, attend live shows, and help spread the word.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/artist/goddess"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full text-sm tracking-wide hover:scale-105 transition-transform"
            >
              View Featured Artists
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
