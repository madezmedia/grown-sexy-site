#!/bin/bash

# Generate images for the Experiences section using DALL-E 3
# Each image will be 1024x1024 and themed for the Grown & Sexy Movement

API_KEY="${OPENAI_API_KEY}"
OUTPUT_DIR="/Users/mac/Documents/Projects/grown-sexy-site/public/images/events"

# Image prompts for each experience
declare -A PROMPTS
PROMPTS["spades-tournament"]="Sophisticated Black professionals in their 30s-50s playing spades card game at an elegant venue, warm ambient lighting, laughing and socializing, luxury atmosphere, deep purple and gold color scheme, cinematic photography, high-end lifestyle"
PROMPTS["wine"]="Elegant wine tasting event with stylish Black men and women in their 30s-50s, holding wine glasses, sophisticated venue with ambient lighting, warm and inviting atmosphere, purple and gold accents, professional event photography, upscale social gathering"
PROMPTS["dance-party"]="Classy dance party with elegant Black professionals in their 30s-50s, couples dancing, stylish attire, romantic lighting with purple and gold hues, upscale venue, joyful atmosphere, professional event photography, sophisticated nightlife"
PROMPTS["wellness"]="Serene wellness retreat with Black men and women in their 30s-50s, yoga and meditation, natural light, peaceful atmosphere, healthy lifestyle, spa-like environment, calming purple and earth tones, professional wellness photography"

echo "🎨 Generating experience images for Grown & Sexy Movement..."
echo ""

for name in "${!PROMPTS[@]}"; do
    echo "📸 Generating: $name"
    
    response=$(curl -s "https://api.openai.com/v1/images/generations" \
        -H "Authorization: Bearer $API_KEY" \
        -H "Content-Type: application/json" \
        -d '{
            "model": "dall-e-3",
            "prompt": "'"${PROMPTS[$name]}"'",
            "n": 1,
            "size": "1024x1024",
            "quality": "hd",
            "style": "natural"
        }')
    
    # Extract image URL
    image_url=$(echo "$response" | jq -r '.data[0].url')
    
    if [ "$image_url" != "null" ] && [ -n "$image_url" ]; then
        echo "   ✅ Image generated, downloading..."
        curl -s -o "${OUTPUT_DIR}/${name}-new.jpg" "$image_url"
        echo "   💾 Saved to: ${OUTPUT_DIR}/${name}-new.jpg"
    else
        echo "   ❌ Error: $(echo "$response" | jq -r '.error.message // "Unknown error"')"
    fi
    
    echo ""
    sleep 2  # Rate limiting
done

echo "🎉 Generation complete!"
echo ""
echo "New images saved with '-new' suffix. Review and rename to replace originals."
