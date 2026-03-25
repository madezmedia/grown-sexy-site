# Outstatic CMS Integration Plan
## The Grown & Sexy Movement

---

## Executive Summary

**Goal**: Integrate Outstatic CMS to enable non-technical client management of events, artist profiles, blog posts, and site content without requiring GitHub knowledge.

**Timeline**: ~2-3 hours of development work

**Impact**: Client can independently manage all site content through a visual dashboard at `/admin`

---

## Why Outstatic for Grown & Sexy?

### Perfect Use Case Match
1. **Events Management**: Currently hardcoded event data - client needs to add/edit events frequently
2. **Artist Profiles**: GODDE$$ and future artists need easy content updates
3. **Blog/News**: Potential for community stories, event recaps, announcements
4. **No Database Needed**: Keeps content in GitHub repo (already using Vercel + GitHub)
5. **Client-Friendly**: Notion-like editor - no markdown knowledge required
6. **Free Forever**: No monthly costs for basic features

### Current Pain Points Being Solved
- **Events**: Hardcoded in `/app/events/page.tsx` - requires developer to update
- **Artist Info**: Static content in `/app/artist/goddess/page.tsx`
- **Images**: Manual upload to `/public/images/events/` and `/public/images/goddess/`
- **No Content Versioning**: Changes require git commits from developer
- **No Preview/Draft**: Can't preview changes before publishing

---

## Content Architecture

### Collections to Create

#### 1. **Events** (Primary Collection)
**Purpose**: Replace hardcoded event data with dynamic CMS content

**Custom Fields**:
```typescript
{
  title: string              // "Monthly Spades Tournament"
  slug: string               // Auto-generated: "monthly-spades-tournament"
  subtitle: string           // "Test Your Skills, Win Big"
  date: date                 // Event date
  time: string               // "7:00 PM - 11:00 PM"
  location: string           // "The Lounge at 5th & Main"
  price: string              // "$25 Entry"
  category: select           // ["Spades", "Wine", "Dance", "Comedy", "Wellness"]
  featuredImage: image       // Main event image
  description: richText      // Full event description (MDX)
  isFeatured: boolean        // Show on homepage
  prizePool: string          // Optional - for tournaments
  spots: number              // Available spots
  highlights: array<string>  // Bullet points
  status: select             // ["upcoming", "sold-out", "completed"]
  publishDate: date          // When to show on site
}
```

**Benefits**:
- Client adds new events via dashboard
- Auto-generates event pages at `/events/[slug]`
- Supports draft mode for testing
- Images uploaded directly in editor

#### 2. **Artists** (Collection)
**Purpose**: Dynamic artist profiles (GODDE$$, future artists)

**Custom Fields**:
```typescript
{
  name: string               // "GODDE$$"
  slug: string               // "goddess"
  stageName: string          // Display name
  bio: richText              // Full artist bio (MDX)
  profileImage: image        // Main profile photo
  gallery: array<image>      // Gallery images
  genre: array<string>       // ["R&B", "Soul"]
  socialLinks: object        // { instagram, twitter, spotify, etc }
  featuredOnHomepage: boolean
  upcomingShows: array<object> // { date, venue, ticketLink }
}
```

**Benefits**:
- Easy artist profile updates
- Gallery management without FTP/GitHub
- Auto-generates routes at `/artist/[slug]`

#### 3. **Blog Posts** (Collection)
**Purpose**: Event recaps, community stories, announcements

**Custom Fields**:
```typescript
{
  title: string
  slug: string
  author: string
  publishDate: date
  category: select           // ["Events", "Community", "News", "Artist Spotlight"]
  featuredImage: image
  excerpt: string            // For preview cards
  content: richText          // Full post (MDX)
  tags: array<string>
}
```

**Benefits**:
- Build community through content
- SEO benefits for event discovery
- Client can share event recaps/photos

#### 4. **Site Settings** (Singleton)
**Purpose**: Global site content (hero text, CTAs, about section)

**Custom Fields**:
```typescript
{
  heroTitle: string          // "The Movement for Grown & Sexy Individuals"
  heroSubtitle: string
  heroCtaText: string        // "Join the Movement"
  aboutText: richText
  featuredArtistId: string   // Reference to artist slug
  socialLinks: object
  contactEmail: string
  footerText: string
}
```

---

## Technical Implementation

### Phase 1: Installation & Setup (30 minutes)

**1. Install Outstatic**
```bash
npm install outstatic
```

**2. Create Admin Route**
```typescript
// app/outstatic/[[...ost]]/page.tsx
import { Outstatic, OstSSG } from 'outstatic'
import 'outstatic/outstatic.css'

export default async function Page({ params }: { params: { ost: string[] } }) {
  const ostData = await Outstatic()
  return <Outstatic {...ostData} />
}
```

**3. Configure Environment Variables**
```bash
# .env.local
OST_GITHUB_ID=your_github_oauth_app_id
OST_GITHUB_SECRET=your_github_oauth_app_secret
OST_TOKEN_SECRET=random_32_char_string
OST_REPO_SLUG=madezmedia/grown-sexy-site
OST_REPO_BRANCH=main
```

**4. GitHub OAuth App Setup** (5 minutes)
- Go to GitHub Settings → Developer Settings → OAuth Apps
- Create new OAuth app
- Homepage URL: `https://www.grownandsexy.vip`
- Callback URL: `https://www.grownandsexy.vip/api/outstatic/callback`
- Get Client ID & Secret

### Phase 2: Schema Creation (30 minutes)

**1. Create Collections via Dashboard**
- Navigate to `/outstatic` after installation
- Create 3 collections: Events, Artists, Blog
- Define custom fields for each

**2. Create Singleton**
- Add Site Settings singleton for global content

**3. Test Content Creation**
- Add 1-2 sample events
- Test image upload
- Verify markdown rendering

### Phase 3: Frontend Integration (60 minutes)

**1. Create Helper Functions**
```typescript
// lib/outstatic.ts
import { getDocuments, getDocumentBySlug } from 'outstatic/server'

export async function getEvents() {
  const events = await getDocuments('events', [
    'title', 'slug', 'date', 'time', 'location',
    'price', 'category', 'featuredImage', 'isFeatured'
  ])
  return events.filter(event => event.status === 'upcoming')
}

export async function getFeaturedEvents() {
  const events = await getEvents()
  return events.filter(event => event.isFeatured)
}

export async function getEventBySlug(slug: string) {
  return await getDocumentBySlug('events', slug, [
    'title', 'slug', 'date', 'time', 'location', 'price',
    'category', 'featuredImage', 'description', 'highlights'
  ])
}
```

**2. Update Events Page**
```typescript
// app/events/page.tsx
import { getEvents, getFeaturedEvents } from '@/lib/outstatic'

export default async function EventsPage() {
  const featuredEvents = await getFeaturedEvents()
  const upcomingEvents = await getEvents()

  return (
    // Replace hardcoded data with CMS data
    // Keep existing UI components
  )
}
```

**3. Create Dynamic Event Detail Pages**
```typescript
// app/events/[slug]/page.tsx
import { getEventBySlug } from '@/lib/outstatic'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export async function generateStaticParams() {
  const events = await getEvents()
  return events.map((event) => ({ slug: event.slug }))
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug)

  if (!event) notFound()

  return (
    // Event detail page with full description, images, booking
  )
}
```

**4. Update Homepage**
```typescript
// app/page.tsx - Update featured events section
const featuredEvents = await getFeaturedEvents()
// Replace static event cards with dynamic data
```

**5. Artist Pages**
```typescript
// lib/outstatic.ts
export async function getArtists() {
  return await getDocuments('artists', ['name', 'slug', 'bio', 'profileImage', 'gallery'])
}

// app/artist/[slug]/page.tsx
// Same pattern as events - dynamic routes with CMS data
```

### Phase 4: Image Optimization (15 minutes)

**1. Configure Outstatic Image Paths**
```typescript
// outstatic.config.ts (if needed)
{
  imagePath: '/public/images/cms',
  imageOptimization: true
}
```

**2. Use Next.js Image Component**
```typescript
<Image
  src={event.featuredImage}
  alt={event.title}
  width={1920}
  height={1080}
  className="..."
/>
```

### Phase 5: Deployment & Testing (15 minutes)

**1. Add Environment Variables to Vercel**
- Add all OST_* variables to Vercel project settings
- Redeploy

**2. Test Admin Access**
- Login at `https://www.grownandsexy.vip/outstatic`
- Create test event
- Verify it appears on frontend

**3. Train Client**
- Share admin URL
- Walkthrough of creating events
- Image upload demo

---

## Migration Strategy

### Moving Existing Content to CMS

**Current Hardcoded Events → Outstatic**
1. Copy event data from `app/events/page.tsx`
2. Create equivalent events in Outstatic dashboard
3. Upload existing event images from `/public/images/events/`
4. Test each event displays correctly
5. Remove hardcoded data after verification

**GODDE$$ Profile → Outstatic**
1. Extract bio text from `app/artist/goddess/page.tsx`
2. Create artist entry in Outstatic
3. Upload gallery images from `/public/images/goddess/`
4. Update artist page to fetch from CMS
5. Keep backup folder temporarily

---

## Client Benefits

### Before Outstatic
❌ Client emails developer to add event
❌ Developer manually updates code
❌ Developer creates/uploads images
❌ Developer commits to GitHub
❌ Developer deploys to Vercel
⏱️ **Timeline: 30-60 minutes per event**

### After Outstatic
✅ Client logs into `/outstatic`
✅ Clicks "New Event"
✅ Fills form (like Notion)
✅ Uploads images via drag-drop
✅ Clicks "Publish"
⏱️ **Timeline: 5 minutes, no developer needed**

---

## Advanced Features (Future Enhancements)

### Phase 2 Features (Optional)
1. **Event RSVP System**
   - Custom field: `rsvpLink` (Eventbrite/etc)
   - Or build custom RSVP with form submissions

2. **AI Content Generation** (Outstatic PRO)
   - Client types event idea
   - AI generates full description
   - Cost: $9.99/month

3. **Team Access** (Outstatic PRO)
   - Add event coordinators
   - Role-based permissions
   - Client reviews before publish

4. **Email Integration**
   - Auto-send event announcements
   - New blog post notifications
   - Newsletter integration

5. **Calendar Integration**
   - Export events to Google Calendar
   - iCal feed for members

---

## Risk Mitigation

### Potential Issues & Solutions

**Issue 1: Client deletes important content**
- **Solution**: Git stores all versions - can restore from commits
- **Mitigation**: Add "Archive" status instead of delete

**Issue 2: Large image uploads slow site**
- **Solution**: Next.js Image component auto-optimizes
- **Mitigation**: Add image size validation in Outstatic

**Issue 3: Client publishes broken markdown**
- **Solution**: Outstatic's visual editor prevents this
- **Mitigation**: Enable draft mode for preview

**Issue 4: Build failures from CMS data**
- **Solution**: Add schema validation
- **Mitigation**: Vercel shows build errors before deploying

---

## Success Metrics

### 30 Days Post-Launch
- [ ] Client has added 3+ events independently
- [ ] Zero developer intervention for content updates
- [ ] Event detail pages ranking in Google
- [ ] 50%+ reduction in content update requests

### 90 Days Post-Launch
- [ ] 10+ blog posts published
- [ ] 2nd artist profile added
- [ ] Email newsletter linked to blog
- [ ] Measurable organic traffic from content

---

## Cost Analysis

### Development Time Investment
- **Initial Setup**: 2-3 hours
- **Client Training**: 30 minutes
- **Ongoing Maintenance**: ~0 hours/month

### Monetary Costs
- **Outstatic Free Plan**: $0/month
  - Unlimited repos
  - All core features
  - GitHub login only

- **Outstatic PRO** (Optional): $9.99/month
  - Email/Google login for client
  - AI content generation
  - Team collaboration

### ROI Calculation
**Current Cost** (developer updates):
- 2 events/month × 30 min × $100/hr = $100/month
- 4 content updates/month × 15 min × $100/hr = $100/month
- **Total: $200/month**

**After Outstatic**:
- Client self-service: $0/month
- Outstatic PRO (optional): $9.99/month
- **Savings: $190/month = $2,280/year**

---

## Implementation Checklist

### Pre-Launch
- [ ] Install Outstatic package
- [ ] Create GitHub OAuth app
- [ ] Add environment variables locally
- [ ] Create `/outstatic/[[...ost]]/page.tsx` route
- [ ] Test admin login at `localhost:3000/outstatic`

### Schema Setup
- [ ] Create Events collection with custom fields
- [ ] Create Artists collection with custom fields
- [ ] Create Blog collection with custom fields
- [ ] Create Site Settings singleton
- [ ] Add 1 sample entry to each collection

### Frontend Integration
- [ ] Create `lib/outstatic.ts` helper functions
- [ ] Update `/app/events/page.tsx` to fetch from CMS
- [ ] Create `/app/events/[slug]/page.tsx` dynamic routes
- [ ] Update `/app/artist/[slug]/page.tsx` to fetch from CMS
- [ ] Update homepage featured events section
- [ ] Create `/app/blog/page.tsx` and `/app/blog/[slug]/page.tsx`

### Content Migration
- [ ] Migrate 5 existing events to Outstatic
- [ ] Migrate GODDE$$ profile to Outstatic
- [ ] Upload all event images to CMS
- [ ] Upload all artist images to CMS
- [ ] Verify all pages render correctly

### Deployment
- [ ] Add OST_* environment variables to Vercel
- [ ] Deploy to production
- [ ] Test admin access on live site
- [ ] Verify events display correctly
- [ ] Check image optimization working

### Client Handoff
- [ ] Create admin account for client
- [ ] Record video walkthrough (5 min)
- [ ] Share admin URL and credentials
- [ ] Schedule 30-min training call
- [ ] Provide written documentation

---

## Next Steps

### Immediate Action Items
1. **Install Outstatic**: `npm install outstatic`
2. **Setup GitHub OAuth**: 5 minutes on GitHub
3. **Create Admin Route**: Copy/paste boilerplate
4. **Test Locally**: Verify `/outstatic` loads
5. **Create First Collection**: Add "Events" schema

### Week 1 Goals
- Complete Phases 1-3 (setup, schema, integration)
- Migrate existing events to CMS
- Deploy to production
- Client training session

### Month 1 Goals
- Client independently adding events
- Launch blog section
- Add 2nd artist profile
- Gather client feedback for improvements

---

## Conclusion

Outstatic is the **perfect fit** for The Grown & Sexy Movement because:

1. ✅ **Zero Monthly Cost** - Free plan has everything needed
2. ✅ **5-Minute Updates** - Client manages content independently
3. ✅ **No Database** - Uses existing GitHub + Vercel stack
4. ✅ **SEO Benefits** - Dynamic routes for events/artists/blog
5. ✅ **Professional CMS** - Notion-like editor clients love
6. ✅ **Future-Proof** - Scales with business growth

**Recommendation**: Proceed with Outstatic integration immediately. The 2-3 hour time investment will save hundreds of hours of developer time annually.

---

**Questions? Let's discuss implementation details and timeline.**
