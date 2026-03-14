"use client"

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function MagneticButton({
  children,
  className,
  onClick,
  variant = 'primary',
  size = 'md',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    setPosition({ x: x * 0.15, y: y * 0.15 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const variants = {
    primary: 'bg-gradient-to-r from-[#DC143C] to-[#C41E3A] text-white hover:shadow-[0_0_30px_rgba(220,20,60,0.4)]',
    secondary: 'bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-black hover:shadow-[0_0_30px_rgba(218,165,32,0.3)]',
    outline: 'border-2 border-cream/30 text-cream hover:border-cream hover:bg-cream/5',
  }

  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  }

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden rounded-full font-semibold transition-all duration-300',
        'hover:scale-105 active:scale-95',
        variants[variant],
        sizes[size],
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
