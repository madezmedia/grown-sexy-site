"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface HeroVideoProps {
  videoSrc?: string
  posterSrc?: string
}

export function HeroVideo({ videoSrc = '/videos/hero-background.mp4', posterSrc }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [hasVideo, setHasVideo] = useState(false)

  useEffect(() => {
    // Check if video file exists
    const checkVideo = async () => {
      try {
        const response = await fetch(videoSrc, { method: 'HEAD' })
        if (response.ok) {
          setHasVideo(true)
        }
      } catch {
        setHasVideo(false)
      }
    }

    checkVideo()
  }, [videoSrc])

  useEffect(() => {
    if (videoRef.current && hasVideo) {
      const video = videoRef.current

      const handleCanPlay = () => {
        setIsVideoLoaded(true)
        video.play().catch(error => {
          console.log('Video autoplay failed:', error)
        })
      }

      video.addEventListener('canplay', handleCanPlay)

      return () => {
        video.removeEventListener('canplay', handleCanPlay)
      }
    }
  }, [hasVideo])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video Element */}
      {hasVideo && (
        <motion.video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          <source src={videoSrc} type="video/mp4" />
          <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        </motion.video>
      )}

      {/* Fallback Gradient Background */}
      {!hasVideo && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black via-[#1A0A0A] to-[#0A0000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 30% 50%, rgba(220, 20, 60, 0.15) 0%, transparent 50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 70% 50%, rgba(218, 165, 32, 0.1) 0%, transparent 50%)',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}

      {/* Color Overlay for brand consistency */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
    </div>
  )
}
