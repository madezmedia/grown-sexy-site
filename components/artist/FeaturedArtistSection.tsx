"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface FeaturedArtist {
  slug: string;
  stageName: string;
  coverImage: string;
  tagline?: string;
  genre?: string[];
}

interface FeaturedArtistSectionProps {
  artists: FeaturedArtist[];
}

export function FeaturedArtistSection({ artists }: FeaturedArtistSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  if (artists.length === 0) return null;

  // Show up to 3 featured artists
  const featuredArtists = artists.slice(0, 3);

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-24 md:py-40 px-6"
      style={{ position: "relative" }}
    >
      {/* Background with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-muted/10" />
        <div className="absolute inset-0 bg-background/90" />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        style={{ y }}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.span
              className="text-xs tracking-[0.3em] uppercase text-accent mb-6 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Featured Artists
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-display"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              The talent behind the movement
            </motion.h2>
          </div>
          <Link href="/artists" className="group inline-flex items-center gap-3 px-6 py-3 border border-foreground/20 rounded-full text-sm tracking-wide hover:bg-foreground hover:text-background transition-all">
            View All Artists
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Artists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtists.map((artist, index) => (
            <motion.div
              key={artist.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/artist/${artist.slug}`} className="group block">
                <motion.div
                  className="aspect-[3/4] bg-card rounded-3xl overflow-hidden relative border border-foreground/5 hover:border-accent/30 transition-all duration-500"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Image
                    src={artist.coverImage}
                    alt={artist.stageName}
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
                    {artist.tagline && (
                      <span className="text-xs tracking-[0.2em] uppercase text-foreground/50 mb-3 block">
                        {artist.tagline}
                      </span>
                    )}
                    <h3 className="text-3xl md:text-4xl font-display mb-2">{artist.stageName}</h3>
                    {artist.genre && artist.genre.length > 0 && (
                      <p className="text-sm text-foreground/60">
                        {artist.genre.slice(0, 2).join(" • ")}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-2 text-sm text-foreground/60 group-hover:text-foreground transition-colors">
                      <span>View Gallery</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
