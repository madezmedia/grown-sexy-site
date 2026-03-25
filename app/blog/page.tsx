"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, Tag, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/outstatic'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog')
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground/60">Loading posts...</div>
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
          <Link href="/" className="text-sm tracking-wide text-foreground/60 hover:text-foreground transition-colors">
            Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-6xl md:text-7xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Stories & Updates
          </motion.h1>
          <motion.p
            className="text-xl text-foreground/60 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Event recaps, community highlights, and everything happening in the movement.
          </motion.p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-foreground/40">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    {post.coverImage && (
                      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-foreground/60">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                      </div>

                      <h2 className="text-2xl font-display font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      {post.excerpt && (
                        <p className="text-foreground/60 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary">{post.category}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-foreground/60 group-hover:text-primary transition-colors">
                        Read more
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
