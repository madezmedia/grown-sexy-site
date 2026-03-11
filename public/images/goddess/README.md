# GODDE$$ Gallery Images

Place GODDE$$ images in this directory to populate the artist gallery.

## Required Images

Add these 5 images to this folder:

### 1. goddess-1.jpg
**Description:** Black elegant gown
**Suggested:** Full-length formal wear, elegant setting
**Used:** First image in gallery grid (featured, large 2-column span)

### 2. goddess-2.jpg
**Description:** Tiger print fur coat
**Suggested:** Bold fashion statement, luxurious outerwear
**Used:** Gallery grid

### 3. goddess-3.jpg
**Description:** White fur
**Suggested:** Winter elegance, soft luxury
**Used:** Gallery grid

### 4. goddess-4.jpg
**Description:** Gold dress
**Suggested:** Evening wear, glamorous setting
**Used:** Gallery grid

### 5. goddess-5.jpg
**Description:** Prayer pose
**Suggested:** Contemplative, artistic shot
**Used:** Gallery grid

## Preview Image

### goddess-preview.jpg
**Description:** Teaser image for homepage
**Suggested:** Eye-catching shot that represents her brand
**Used:** Homepage "Featured Artist" section

## Image Specifications

**Recommended:**
- Format: JPG or PNG
- Minimum size: 1200px width
- Aspect ratio: Various (grid handles different ratios)
- File size: Optimized for web (under 500KB each)

## Current Status

✅ **Code Updated** - Site now uses `next/image` to render images automatically
⚠️ **Images not yet added** - Gallery currently shows placeholder gradients as fallback
✅ Once you add images, they will automatically appear on the site
✅ No further code changes needed - just drop the files here!

## Where Images Appear

**Artist Gallery Page** (`/artist/goddess`)
- All 5 images in masonry grid layout
- First image (goddess-1.jpg) gets featured spot (2x2 grid)
- Hover effects reveal image descriptions
- Responsive layout adjusts for mobile

**Homepage** (`/`)
- Preview image in "Featured Artist" section
- Links to full gallery page

## After Adding Images

```bash
# Commit and deploy
git add public/images/goddess/
git commit -m "feat: add GODDE$$ gallery images"
git push origin main
vercel --prod
```

The images will appear immediately after deployment!
