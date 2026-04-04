"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react'

const galleryImages = [
  { id: 1, src: '/images/gallery/gallery-1.jpg', alt: 'Cocktail party networking event', category: 'Social' },
  { id: 2, src: '/images/gallery/gallery-2.jpg', alt: 'Elegant dinner party', category: 'Dining' },
  { id: 3, src: '/images/gallery/gallery-3.jpg', alt: 'Garden party celebration', category: 'Outdoor' },
  { id: 4, src: '/images/gallery/gallery-4.jpg', alt: 'Live jazz performance', category: 'Music' },
  { id: 5, src: '/images/gallery/gallery-5.jpg', alt: 'Wine tasting event', category: 'Social' },
  { id: 6, src: '/images/gallery/gallery-6.jpg', alt: 'Spades tournament game night', category: 'Games' },
  { id: 7, src: '/images/events/wine.jpg', alt: 'Wine tasting experience', category: 'Dining' },
  { id: 8, src: '/images/events/dance-party.jpg', alt: 'Dance party celebration', category: 'Music' },
  { id: 9, src: '/images/events/spades-tournament.jpg', alt: 'Spades tournament', category: 'Games' },
  { id: 10, src: '/images/events/line-stepping.jpg', alt: 'Line dancing night', category: 'Dance' },
  { id: 11, src: '/images/events/comedy.jpg', alt: 'Comedy night', category: 'Entertainment' },
  { id: 12, src: '/images/events/wellness.jpg', alt: 'Wellness retreat', category: 'Wellness' },
]

const categories = ['All', 'Social', 'Dining', 'Outdoor', 'Music', 'Games', 'Dance', 'Entertainment', 'Wellness']

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

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
            <Link href="/events" className="text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
              Events
            </Link>
            <Link href="/gallery" className="text-sm tracking-wide text-foreground">
              Gallery
            </Link>
            <Link href="/music" className="text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
              Music
            </Link>
            <Link href="/artist/goddess" className="text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
              Artists
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
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
              Our Community
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display mb-6">
              Photo Gallery
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
              Capturing the elegance, joy, and connection of our community events
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 bg-card sticky top-20 z-40 border-y border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-foreground text-background'
                    : 'bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            layout
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                  index === 0 ? 'col-span-2 row-span-2' : ''
                }`}
                onClick={() => openLightbox(index)}
              >
                <div className={index === 0 ? 'aspect-square' : 'aspect-[4/3]'}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-3 py-1 bg-accent/80 text-background rounded-full text-xs font-medium">
                      {image.category}
                    </span>
                  </div>
                  
                  {/* Caption */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-24">
              <p className="text-foreground/50 text-lg">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-lg flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-6 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-6 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <motion.div
            key={lightboxIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-5xl max-h-[80vh] w-full mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <Image
                src={filteredImages[lightboxIndex]?.src || ''}
                alt={filteredImages[lightboxIndex]?.alt || ''}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            
            {/* Caption */}
            <div className="text-center mt-6">
              <p className="text-lg font-medium mb-1">{filteredImages[lightboxIndex]?.alt}</p>
              <p className="text-sm text-foreground/50">
                {lightboxIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 bg-card">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.span
            className="text-xs tracking-[0.3em] uppercase text-accent mb-6 block"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            Join Us
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-display mb-6"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          >
            Want to be part of these moments?
          </motion.h2>
          <motion.p
            className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            Join our community and experience these events firsthand. New members always welcome.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <Link
              href="/#join"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-foreground text-background rounded-full text-base tracking-wide hover:scale-105 transition-transform"
            >
              Become a Member
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
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
                <Link href="/gallery" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Gallery
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
