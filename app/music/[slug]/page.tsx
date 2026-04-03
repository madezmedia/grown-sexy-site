import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Play, Music as MusicIcon } from 'lucide-react'
import { getMusicBySlug, getAllMusicSlugs } from '@/lib/outstatic'
import type { Music } from '@/lib/outstatic'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllMusicSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const track = await getMusicBySlug(params.slug)

  if (!track) {
    return {
      title: 'Track Not Found',
    }
  }

  return {
    title: `${track.title} - Grown & Sexy`,
    description: `Listen to ${track.title} by ${track.artist}`,
  }
}

export default async function MusicTrackPage({ params }: PageProps) {
  const track = await getMusicBySlug(params.slug) as Music

  if (!track) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 backdrop-blur-md bg-background/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-sm tracking-[0.2em] uppercase font-medium">
            Grown & Sexy
          </Link>
          <Link href="/music" className="flex items-center gap-2 text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Music
          </Link>
        </div>
      </nav>

      {/* Track Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Cover Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-card">
              {track.coverImage ? (
                <Image
                  src={track.coverImage}
                  alt={track.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-muted/20">
                  <MusicIcon className="w-32 h-32 text-foreground/20" />
                </div>
              )}
            </div>

            {/* Track Info */}
            <div className="space-y-8 pt-8">
              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-accent">
                  Track
                </span>
                <h1 className="text-5xl md:text-6xl font-display font-bold mt-4 mb-2">
                  {track.title}
                </h1>
                <p className="text-2xl text-foreground/60">{track.artist}</p>
              </div>

              {/* Streaming Links */}
              {(track.spotifyUrl || track.appleMusicUrl) && (
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-foreground/40 mb-4 block">
                    Stream On
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {track.spotifyUrl && (
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-medium transition-colors"
                      >
                        Spotify
                      </a>
                    )}
                    {track.appleMusicUrl && (
                      <a
                        href={track.appleMusicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-foreground hover:bg-foreground/80 text-background rounded-full text-sm font-medium transition-colors"
                      >
                        Apple Music
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="space-y-3 text-sm">
                {track.genre && (
                  <div className="flex items-center gap-3">
                    <span className="text-foreground/40">Genre:</span>
                    <span>{track.genre}</span>
                  </div>
                )}
                {track.releaseDate && (
                  <div className="flex items-center gap-3">
                    <span className="text-foreground/40">Released:</span>
                    <span>{new Date(track.releaseDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              {track.content && (
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: track.content }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-display mb-6">Support the Artist</h2>
          <p className="text-foreground/60 text-lg mb-8">
            Stream, share, and help spread the word about this track.
          </p>
          <Link
            href="/artist/goddess"
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full text-sm tracking-wide hover:scale-105 transition-transform"
          >
            View More from {track.artist}
          </Link>
        </div>
      </section>
    </div>
  )
}
