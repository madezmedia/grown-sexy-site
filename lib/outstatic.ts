import { getDocuments, getDocumentSlugs } from 'outstatic/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// ============================================
// DIRECT FILE READING (bypasses Outstatic bugs)
// ============================================

function readMarkdownFile(collection: string, slug: string): { frontmatter: Record<string, unknown>, content: string } | null {
  try {
    const contentDir = path.join(process.cwd(), 'outstatic/content', collection)
    const filePath = path.join(contentDir, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    return {
      frontmatter: data,
      content: content.trim()
    }
  } catch (error) {
    console.error(`Error reading ${collection}/${slug}:`, error)
    return null
  }
}

function getMarkdownSlugs(collection: string): string[] {
  try {
    const contentDir = path.join(process.cwd(), 'outstatic/content', collection)
    if (!fs.existsSync(contentDir)) {
      return []
    }
    return fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''))
  } catch (error) {
    console.error(`Error getting slugs for ${collection}:`, error)
    return []
  }
}

// ============================================
// EVENTS
// ============================================

export interface Event {
  slug: string
  title: string
  subtitle?: string
  content: string
  publishedAt: string
  date: string
  time: string
  location: string
  price: string
  category: 'Spades' | 'Wine' | 'Dance' | 'Comedy' | 'Wellness'
  coverImage?: string
  isFeatured?: boolean
  prizePool?: string
  spots?: number
  highlights?: string[]
  status: 'upcoming' | 'sold-out' | 'completed'
}

export async function getEvents(): Promise<Event[]> {
  try {
    const events = getDocuments('events', [
      'title',
      'slug',
      'publishedAt',
      'subtitle',
      'date',
      'time',
      'location',
      'price',
      'category',
      'coverImage',
      'isFeatured',
      'prizePool',
      'spots',
      'highlights',
      'status',
      'content'
    ]) as unknown as Event[]

    // Filter for upcoming events only
    return events.filter((event: Event) => event.status === 'upcoming')
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function getFeaturedEvents(): Promise<Event[]> {
  try {
    const events = await getEvents()
    return events.filter((event: Event) => event.isFeatured === true)
  } catch (error) {
    console.error('Error fetching featured events:', error)
    return []
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const event = getDocumentBySlug('events', slug, [
      'title',
      'slug',
      'publishedAt',
      'subtitle',
      'date',
      'time',
      'location',
      'price',
      'category',
      'coverImage',
      'isFeatured',
      'prizePool',
      'spots',
      'highlights',
      'status',
      'content'
    ])

    return event as unknown as Event
  } catch (error) {
    console.error(`Error fetching event with slug ${slug}:`, error)
    return null
  }
}

export async function getAllEventSlugs(): Promise<string[]> {
  try {
    return getDocumentSlugs('events')
  } catch (error) {
    console.error('Error fetching event slugs:', error)
    return []
  }
}

// ============================================
// ARTISTS
// ============================================

export interface Artist {
  slug: string
  name: string
  stageName: string
  content: string
  publishedAt: string
  coverImage?: string
  gallery?: string[]
  genre?: string[]
  socialLinks?: {
    instagram?: string
    twitter?: string
    spotify?: string
    youtube?: string
  }
  featuredOnHomepage?: boolean
  tagline?: string
}

export async function getArtists(): Promise<Artist[]> {
  try {
    const slugs = getMarkdownSlugs('artists')
    const artists: Artist[] = []
    
    for (const slug of slugs) {
      const file = readMarkdownFile('artists', slug)
      if (file) {
        const { frontmatter, content } = file
        artists.push({
          slug: frontmatter.slug as string || slug,
          name: frontmatter.name as string || '',
          stageName: frontmatter.stageName as string || '',
          content: content,
          publishedAt: frontmatter.publishedAt as string || '',
          coverImage: frontmatter.coverImage as string | undefined,
          gallery: frontmatter.gallery as string[] | undefined,
          genre: frontmatter.genre as string[] | undefined,
          socialLinks: frontmatter.socialLinks as Artist['socialLinks'] | undefined,
          featuredOnHomepage: frontmatter.featuredOnHomepage as boolean | undefined,
          tagline: frontmatter.tagline as string | undefined,
        })
      }
    }
    
    return artists
  } catch (error) {
    console.error('Error fetching artists:', error)
    return []
  }
}

export async function getFeaturedArtist(): Promise<Artist | null> {
  try {
    const artists = await getArtists()
    return artists.find((artist: Artist) => artist.featuredOnHomepage === true) || null
  } catch (error) {
    console.error('Error fetching featured artist:', error)
    return null
  }
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  try {
    const file = readMarkdownFile('artists', slug)
    if (!file) {
      console.error(`Artist file not found: ${slug}`)
      return null
    }
    
    const { frontmatter, content } = file
    return {
      slug: frontmatter.slug as string || slug,
      name: frontmatter.name as string || '',
      stageName: frontmatter.stageName as string || '',
      content: content,
      publishedAt: frontmatter.publishedAt as string || '',
      coverImage: frontmatter.coverImage as string | undefined,
      gallery: frontmatter.gallery as string[] | undefined,
      genre: frontmatter.genre as string[] | undefined,
      socialLinks: frontmatter.socialLinks as Artist['socialLinks'] | undefined,
      featuredOnHomepage: frontmatter.featuredOnHomepage as boolean | undefined,
      tagline: frontmatter.tagline as string | undefined,
    }
  } catch (error) {
    console.error(`Error fetching artist with slug ${slug}:`, error)
    return null
  }
}

export async function getAllArtistSlugs(): Promise<string[]> {
  return getMarkdownSlugs('artists')
}

// ============================================
// BLOG POSTS
// ============================================

export interface BlogPost {
  slug: string
  title: string
  content: string
  publishedAt: string
  author: string
  category: 'Events' | 'Community' | 'News' | 'Artist Spotlight'
  coverImage?: string
  excerpt?: string
  tags?: string[]
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = getDocuments('blog', [
      'title',
      'slug',
      'content',
      'publishedAt',
      'author',
      'category',
      'coverImage',
      'excerpt',
      'tags'
    ]) as unknown as BlogPost[]

    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = getDocumentBySlug('blog', slug, [
      'title',
      'slug',
      'content',
      'publishedAt',
      'author',
      'category',
      'coverImage',
      'excerpt',
      'tags'
    ])

    return post as unknown as BlogPost
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
}

export async function getAllBlogPostSlugs(): Promise<string[]> {
  try {
    return getDocumentSlugs('blog')
  } catch (error) {
    console.error('Error fetching blog post slugs:', error)
    return []
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const posts = await getBlogPosts()
    return posts.filter((post: BlogPost) => post.category === category)
  } catch (error) {
    console.error(`Error fetching blog posts by category ${category}:`, error)
    return []
  }
}

// ============================================
// MUSIC
// ============================================

export interface Music {
  slug: string
  title: string
  artist: string
  content: string
  publishedAt: string
  coverImage?: string
  audioUrl?: string
  spotifyUrl?: string
  appleMusicUrl?: string
  genre?: string
  releaseDate?: string
  featured?: boolean
}

export async function getMusic(): Promise<Music[]> {
  try {
    const tracks = getDocuments('music', [
      'title',
      'slug',
      'artist',
      'content',
      'publishedAt',
      'coverImage',
      'audioUrl',
      'spotifyUrl',
      'appleMusicUrl',
      'genre',
      'releaseDate',
      'featured'
    ]) as unknown as Music[]

    return tracks
  } catch (error) {
    console.error('Error fetching music:', error)
    return []
  }
}

export async function getMusicBySlug(slug: string): Promise<Music | null> {
  try {
    const track = getDocumentBySlug('music', slug, [
      'title',
      'slug',
      'artist',
      'content',
      'publishedAt',
      'coverImage',
      'audioUrl',
      'spotifyUrl',
      'appleMusicUrl',
      'genre',
      'releaseDate',
      'featured'
    ])

    return track as unknown as Music
  } catch (error) {
    console.error(`Error fetching music with slug ${slug}:`, error)
    return null
  }
}

export async function getAllMusicSlugs(): Promise<string[]> {
  try {
    return getDocumentSlugs('music')
  } catch (error) {
    console.error('Error fetching music slugs:', error)
    return []
  }
}

// ============================================
// VIDEOS
// ============================================

export interface Video {
  slug: string
  title: string
  content: string
  publishedAt: string
  coverImage?: string
  videoUrl?: string
  youtubeId?: string
  category?: string
  duration?: string
  featured?: boolean
}

export async function getVideos(): Promise<Video[]> {
  try {
    const videos = getDocuments('videos', [
      'title',
      'slug',
      'content',
      'publishedAt',
      'coverImage',
      'videoUrl',
      'youtubeId',
      'category',
      'duration',
      'featured'
    ]) as unknown as Video[]

    return videos
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

export async function getVideoBySlug(slug: string): Promise<Video | null> {
  try {
    const video = getDocumentBySlug('videos', slug, [
      'title',
      'slug',
      'content',
      'publishedAt',
      'coverImage',
      'videoUrl',
      'youtubeId',
      'category',
      'duration',
      'featured'
    ])

    return video as unknown as Video
  } catch (error) {
    console.error(`Error fetching video with slug ${slug}:`, error)
    return null
  }
}

export async function getAllVideoSlugs(): Promise<string[]> {
  try {
    return getDocumentSlugs('videos')
  } catch (error) {
    console.error('Error fetching video slugs:', error)
    return []
  }
}
