#!/bin/bash

# Download Sample Video Script
# This script helps you download a sample luxury video for testing

echo "🎥 Grown & Sexy Movement - Video Download Helper"
echo "================================================"
echo ""
echo "This script will help you download a sample video from Pexels."
echo ""

# Check if curl is available
if ! command -v curl &> /dev/null; then
    echo "❌ Error: curl is not installed"
    exit 1
fi

# Create videos directory if it doesn't exist
mkdir -p public/videos

echo "📥 Downloading sample luxury video..."
echo ""

# Sample video options from Pexels (free, no attribution required)
echo "Choose a sample video:"
echo ""
echo "1) Luxury champagne pour (dark/elegant)"
echo "2) Red abstract motion"
echo "3) Party/nightlife atmosphere"
echo "4) Gold particles animation"
echo "5) Custom URL (paste your own)"
echo ""

read -p "Enter choice (1-5): " choice

case $choice in
    1)
        VIDEO_URL="https://videos.pexels.com/video-files/3191727/3191727-uhd_2560_1440_25fps.mp4"
        echo "Selected: Champagne pour"
        ;;
    2)
        VIDEO_URL="https://videos.pexels.com/video-files/3126476/3126476-hd_1920_1080_30fps.mp4"
        echo "Selected: Red abstract"
        ;;
    3)
        VIDEO_URL="https://videos.pexels.com/video-files/2495283/2495283-hd_1920_1080_25fps.mp4"
        echo "Selected: Nightlife"
        ;;
    4)
        VIDEO_URL="https://videos.pexels.com/video-files/7533728/7533728-uhd_2560_1440_25fps.mp4"
        echo "Selected: Gold particles"
        ;;
    5)
        read -p "Paste video URL: " VIDEO_URL
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "⏳ Downloading video (this may take a minute)..."

# Download the video
curl -L "$VIDEO_URL" -o public/videos/hero-background.mp4 --progress-bar

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Video downloaded successfully!"
    echo "📁 Saved to: public/videos/hero-background.mp4"
    echo ""

    # Get file size
    FILE_SIZE=$(du -h public/videos/hero-background.mp4 | cut -f1)
    echo "📊 File size: $FILE_SIZE"
    echo ""

    echo "🎬 Next steps:"
    echo "1. Run 'npm run dev' to see the video in action"
    echo "2. If the file is too large (>10MB), consider compressing it"
    echo "3. See public/videos/README.md for optimization tips"
    echo ""
    echo "💡 To use your own video:"
    echo "   - Place it in public/videos/hero-background.mp4"
    echo "   - Or use custom path: <HeroVideo videoSrc=\"/videos/your-video.mp4\" />"
else
    echo ""
    echo "❌ Download failed. Please check your internet connection."
    echo ""
    echo "🔧 Manual option:"
    echo "1. Visit https://www.pexels.com/videos/"
    echo "2. Search for 'luxury' or 'nightlife' videos"
    echo "3. Download and save to public/videos/hero-background.mp4"
fi
