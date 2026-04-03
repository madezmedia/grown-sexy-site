import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Play } from 'lucide-react'
import { getVideoBySlug, getAllVideoSlugs } from '@/lib/outstatic'
import type { Video } from '@/lib/outstatic'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllVideoSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const video = await getVideoBySlug(params.slug)

  if (!video) {
    return {
      title: 'Video Not Found',
    }
  }

  return {
    title: `${video.title} - Grown & Sexy`,
    description: video.content?.replace(/<[^>]*>/g, '').slice(0, 160) || 'Watch now',
  }
}

export default async function VideoPage({ params }: PageProps) {
  const video = await getVideoBySlug(params.slug) as Video

  if (!video) {
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
          <Link href="/videos" className="flex items-center gap-2 text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Videos
          </Link>
        </div>
      </nav>

      {/* Video Player Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Video Player */}
          <div className="aspect-video rounded-3xl overflow-hidden bg-card mb-8">
            {video.youtubeId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : video.videoUrl ? (
              <video
                src={video.videoUrl}
                controls
                className="w-full h-full"
              />
            ) : video.coverImage ? (
              <div className="relative w-full h-full">
                <Image
                  src={video.coverImage}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="w-20 h-20 rounded-full bg-foreground/90 flex items-center justify-center">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-foreground/10">
                <Play className="w-16 h-16 text-foreground/20" />
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              {video.category && (
                <span className="text-xs tracking-[0.2em] uppercase text-accent">
                  {video.category}
                </span>
              )}
              {video.duration && (
                <span className="text-sm text-foreground/40">{video.duration}</span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {video.title}
            </h1>

            {video.content && (
              <div className="prose prose-lg max-w-none text-foreground/80">
                <div dangerouslySetInnerHTML={{ __html: video.content }} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-display mb-6">More Videos</h2>
          <p className="text-foreground/60 text-lg mb-8">
            Explore more events, performances, and behind-the-scenes content.
          </p>
          <Link
            href="/videos"
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full text-sm tracking-wide hover:scale-105 transition-transform"
          >
            Browse All Videos
          </Link>
        </div>
      </section>
    </div>
  )
}
