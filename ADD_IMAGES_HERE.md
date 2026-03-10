# 📸 Add Your Images Here

## GODDE$$ Gallery Images Needed

Place these images in `public/images/goddess/`:

### Required Images (5 total)

1. **goddess-1.jpg** - Black elegant gown (featured image, shown large)
2. **goddess-2.jpg** - Tiger print fur coat
3. **goddess-3.jpg** - White fur
4. **goddess-4.jpg** - Gold dress
5. **goddess-5.jpg** - Prayer pose

### Preview Image (1 total)

6. **goddess-preview.jpg** - For homepage teaser (any striking shot)

---

## Quick Upload Guide

### Using Finder (Mac):
1. Open Finder
2. Navigate to this project folder
3. Go to `public/images/goddess/`
4. Drag and drop your 6 images into that folder
5. Rename them to match the names above

### Using Terminal:
```bash
# Copy images from your folder to the project
cp ~/path/to/your/images/* public/images/goddess/

# Or if images are on Desktop:
cp ~/Desktop/goddess-photos/* public/images/goddess/
```

---

## After Adding Images

Run these commands to deploy:

```bash
# Check what you added
ls -la public/images/goddess/

# Commit to git
git add public/images/goddess/
git commit -m "feat: add GODDE$$ gallery images"

# Push to GitHub
git push origin main

# Deploy to Vercel
vercel --prod
```

Your images will appear on:
- **Homepage:** https://grown-sexy-site.vercel.app (preview)
- **Gallery:** https://grown-sexy-site.vercel.app/artist/goddess (all 5 images)

---

## Image Tips

**Format:** JPG or PNG
**Size:** At least 1200px wide
**File Size:** Compress to under 500KB each for fast loading
**Quality:** High quality for professional look

**Free Compression Tools:**
- TinyPNG: https://tinypng.com
- ImageOptim (Mac): https://imageoptim.com
- Squoosh: https://squoosh.app

---

## Current Status

⚠️ Site is live but showing placeholder gradients
✅ Code is ready - just add images!
✅ No additional setup needed

The site will automatically use real images once you upload them!
