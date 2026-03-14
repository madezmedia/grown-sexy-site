"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  bgClassName?: string
  speed?: number
  direction?: 'up' | 'down'
  overlay?: boolean
}

export function ParallaxSection({
  children,
  className,
  bgClassName,
  speed = 0.5,
  direction = 'up',
  overlay = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const factor = direction === 'up' ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed * factor])

  return (
    <section ref={ref} className={cn('relative overflow-hidden', className)} style={{ position: 'relative' }}>
      <motion.div
        className={cn('absolute inset-0 -z-10', bgClassName)}
        style={{ y }}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 -z-10" />
      )}
      {children}
    </section>
  )
}

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number
}

export function ParallaxImage({ src, alt, className, speed = 0.3 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])

  return (
    <motion.div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y, scale }}
      />
    </motion.div>
  )
}

interface ParallaxTextProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function ParallaxText({ children, className, speed = 0.2, direction = 'up' }: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const isVertical = direction === 'up' || direction === 'down'
  const factor = direction === 'up' || direction === 'left' ? -1 : 1
  
  const transform = useTransform(scrollYProgress, [0, 1], [0, 100 * speed * factor])

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      style={isVertical ? { y: transform } : { x: transform }}
    >
      {children}
    </motion.div>
  )
}
