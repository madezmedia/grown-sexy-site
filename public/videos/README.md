# Video Assets

Place your video files in this directory to use them as backgrounds.

## File Structure

```
public/videos/
├── hero-background.mp4      # Main hero video (recommended)
├── hero-background.webm     # WebM format for better compression (optional)
└── hero-background-poster.jpg  # Poster image shown before video loads
```

## Video Recommendations

### Format & Codec
- **Primary**: MP4 (H.264 codec)
- **Alternative**: WebM (VP9 codec) for better compression
- **Poster**: JPG or PNG thumbnail

### Specifications
- **Resolution**: 1920x1080 (Full HD) or 2560x1440 (2K)
- **Aspect Ratio**: 16:9
- **Frame Rate**: 24-30 fps
- **Duration**: 10-30 seconds (will loop)
- **File Size**: Aim for under 5MB (10MB max)

### Content Suggestions
For "The Grown & Sexy Movement" aesthetic:
- Luxury lifestyle footage (champagne, elegant settings)
- Nightlife/club atmosphere with red lighting
- Fashion runway or editorial style
- Abstract motion graphics with red/gold colors
- Slow-motion elegant movements

## Where to Get Stock Videos

### Free Options
1. **Pexels Videos**: https://www.pexels.com/videos/
2. **Pixabay**: https://pixabay.com/videos/
3. **Videvo**: https://www.videvo.net/

Search terms:
- "luxury nightlife"
- "elegant party"
- "fashion runway"
- "red abstract"
- "champagne celebration"
- "luxury lifestyle"

### Premium Options
1. **Artgrid**: https://artgrid.io/
2. **Envato Elements**: https://elements.envato.com/
3. **Adobe Stock**: https://stock.adobe.com/

## How to Optimize Your Video

### Using FFmpeg (Recommended)
```bash
# Install FFmpeg first: brew install ffmpeg (Mac) or download from ffmpeg.org

# Compress and optimize MP4
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -vf scale=1920:1080 -movflags +faststart public/videos/hero-background.mp4

# Create WebM version
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -vf scale=1920:1080 public/videos/hero-background.webm

# Extract poster image (frame at 2 seconds)
ffmpeg -i input.mp4 -ss 00:00:02 -vframes 1 public/videos/hero-background-poster.jpg
```

### Using Online Tools
1. **CloudConvert**: https://cloudconvert.com/mp4-converter
2. **FreeConvert**: https://www.freeconvert.com/video-compressor

## Usage in Code

### Default Usage (hero-background.mp4)
```tsx
<HeroVideo />
```

### Custom Video
```tsx
<HeroVideo
  videoSrc="/videos/custom-video.mp4"
  posterSrc="/videos/custom-poster.jpg"
/>
```

## Fallback Behavior

If no video file is found, the component will automatically display an animated gradient background instead. This ensures the site always looks great even without video assets.

## Performance Tips

1. **Use a poster image** - Shows immediately while video loads
2. **Compress your video** - Smaller files = faster loading
3. **Test on mobile** - Some mobile devices don't autoplay video
4. **Consider loading states** - The component handles this automatically

## Current Status

⚠️ **No video currently uploaded** - Using gradient fallback
✅ To add video: Upload `hero-background.mp4` to this directory
