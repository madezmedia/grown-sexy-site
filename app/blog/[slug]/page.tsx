"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react'
import type { BlogPost } from '@/lib/outstatic'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/${slug}`)
        if (!response.ok) {
          setPost(null)
          return
        }
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Error fetching blog post:', error)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground/60">Loading post...</div>
      </div>
    )
  }

  if (!post) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 backdrop-blur-md bg-background/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-2 text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <article className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Meta */}
          <motion.div
            className="flex items-center gap-6 text-sm text-foreground/60 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-6xl font-display font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {post.title}
          </motion.h1>

          {/* Featured Image */}
          {post.coverImage && (
            <motion.div
              className="relative aspect-video overflow-hidden rounded-2xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-foreground/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-foreground/5 text-sm text-foreground/60"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Back to Blog */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Read more stories
            </Link>
          </motion.div>
        </div>
      </article>
    </div>
  )
}
