"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface GalleryImage {
  url: string;
  alt: string;
}

interface ArtistData {
  name: string;
  slug: string;
  stageName: string;
  coverImage: string;
  gallery: GalleryImage[];
  genre: string[];
  socialLinks: {
    instagram?: string;
    twitter?: string;
    spotify?: string;
    youtube?: string;
  };
  bio: string;
  tagline?: string;
}

interface ArtistPageProps {
  artist: ArtistData;
}

export function ArtistPage({ artist }: ArtistPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const images = artist.gallery.length > 0 
    ? artist.gallery 
    : [
        { url: `/images/artists/${artist.slug}-1.jpg`, alt: `${artist.stageName} promotional` },
        { url: `/images/artists/${artist.slug}-2.jpg`, alt: `${artist.stageName} in performance` },
        { url: `/images/artists/${artist.slug}-3.jpg`, alt: `${artist.stageName} portrait` },
      ];

  return (
    <main ref={containerRef} className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-muted/10"
          style={{ y, opacity }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
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
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-display font-bold mb-6 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              {artist.stageName}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-4 max-w-3xl mx-auto">
              Featured artist of The Grown & Sexy Movement
            </p>
            {artist.tagline && (
              <p className="text-lg md:text-xl text-accent mb-12">
                {artist.tagline}
              </p>
            )}

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {artist.socialLinks.instagram && (
                <a href={artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <button className="px-8 py-4 bg-foreground text-background rounded-full text-sm tracking-wide hover:scale-105 transition-transform">
                    Follow on Instagram
                  </button>
                </a>
              )}
              <Link href="/">
                <button className="px-8 py-4 border border-foreground/30 rounded-full text-sm tracking-wide hover:border-foreground/60 hover:bg-foreground/5 transition-all">
                  ← Back to Home
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 2 } }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-accent/50 flex justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-accent"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-24 md:py-32 px-6 bg-card">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <div className="rounded-3xl p-8 md:p-12 border border-foreground/10 bg-background/50 backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-8">
                About {artist.stageName}
              </h2>
              <div 
                className="prose prose-lg prose-invert max-w-none text-foreground/70"
                dangerouslySetInnerHTML={{ __html: artist.bio }}
              />
              {artist.genre.length > 0 && (
                <div className="mt-8 pt-8 border-t border-foreground/10">
                  <p className="text-sm text-foreground/50 mb-3">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    {artist.genre.map((g) => (
                      <span 
                        key={g}
                        className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="text-xs tracking-[0.3em] uppercase text-accent mb-4 block">
              Visual Journey
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display">
              Gallery
            </h2>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
              >
                <div className="relative overflow-hidden rounded-3xl group cursor-pointer border border-foreground/5 hover:border-accent/30 transition-all duration-500">
                  <div
                    className={`
                      ${index === 0 ? "aspect-[16/10]" : "aspect-square"}
                      relative
                    `}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-foreground font-display text-lg">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Connect Section */}
      <section className="py-24 md:py-32 px-6 bg-card">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-8"
            variants={fadeInUp}
          >
            Connect with {artist.stageName}
          </motion.h2>
          <motion.p className="text-lg md:text-xl text-foreground/60 mb-12" variants={fadeInUp}>
            Follow the journey and stay updated with the latest work
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            {artist.socialLinks.instagram && (
              <a href={artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-4 bg-foreground text-background rounded-full text-sm tracking-wide hover:scale-105 transition-transform">
                  Instagram
                </button>
              </a>
            )}
            {artist.socialLinks.spotify && (
              <a href={artist.socialLinks.spotify} target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-4 border border-foreground/30 rounded-full text-sm tracking-wide hover:border-foreground/60 hover:bg-foreground/5 transition-all">
                  Spotify
                </button>
              </a>
            )}
            {artist.socialLinks.youtube && (
              <a href={artist.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-4 border border-foreground/30 rounded-full text-sm tracking-wide hover:border-foreground/60 hover:bg-foreground/5 transition-all">
                  YouTube
                </button>
              </a>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-foreground/10 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sm tracking-[0.2em] uppercase font-medium mb-2 block">
            The Grown & Sexy Movement
          </span>
          <p className="text-foreground/50 text-sm">
            Featuring extraordinary artists from our community
          </p>
        </div>
      </footer>
    </main>
  );
}
