import { getDocuments, getDocumentBySlug, getDocumentSlugs } from 'outstatic/server'

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
    ]) as Event[]

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

    return event as Event
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
}

export async function getArtists(): Promise<Artist[]> {
  try {
    const artists = getDocuments('artists', [
      'name',
      'slug',
      'stageName',
      'content',
      'publishedAt',
      'coverImage',
      'gallery',
      'genre',
      'socialLinks',
      'featuredOnHomepage'
    ]) as Artist[]

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
    const artist = getDocumentBySlug('artists', slug, [
      'name',
      'slug',
      'stageName',
      'content',
      'publishedAt',
      'coverImage',
      'gallery',
      'genre',
      'socialLinks',
      'featuredOnHomepage'
    ])

    return artist as Artist
  } catch (error) {
    console.error(`Error fetching artist with slug ${slug}:`, error)
    return null
  }
}

export async function getAllArtistSlugs(): Promise<string[]> {
  try {
    return getDocumentSlugs('artists')
  } catch (error) {
    console.error('Error fetching artist slugs:', error)
    return []
  }
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
    ]) as BlogPost[]

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

    return post as BlogPost
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
