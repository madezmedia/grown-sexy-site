import fs from 'fs';
import path from 'path';

export interface HomepageSettings {
  // Experience Cards
  card1Image: string;
  card1Title: string;
  card1Description: string;
  card2Image: string;
  card2Title: string;
  card2Description: string;
  card3Image: string;
  card3Title: string;
  card3Description: string;
  // Community Section
  communityImage: string;
  // Gallery
  galleryImage1: string;
  galleryCaption1: string;
  galleryImage2: string;
  galleryCaption2: string;
  galleryImage3: string;
  galleryCaption3: string;
  galleryImage4: string;
  galleryCaption4: string;
  galleryImage5: string;
  galleryCaption5: string;
}

const defaultSettings: HomepageSettings = {
  card1Image: '/images/events/wine.jpg',
  card1Title: 'Exclusive Events',
  card1Description: 'From intimate wine tastings to vibrant dance parties, our events are crafted for meaningful connections.',
  card2Image: '/images/events/dance-party.jpg',
  card2Title: 'Community',
  card2Description: 'Connect with like-minded individuals who value growth, authenticity, and living life fully.',
  card3Image: '/images/events/wellness.jpg',
  card3Title: 'Wellness',
  card3Description: 'Health and vitality resources tailored for our evolving needs as we age gracefully.',
  communityImage: '/images/events/wine.jpg',
  galleryImage1: '/images/gallery/gallery-1.jpg',
  galleryCaption1: 'Cocktail Party',
  galleryImage2: '/images/gallery/gallery-2.jpg',
  galleryCaption2: 'Dinner Party',
  galleryImage3: '/images/gallery/gallery-3.jpg',
  galleryCaption3: 'Garden Party',
  galleryImage4: '/images/gallery/gallery-4.jpg',
  galleryCaption4: 'Live Jazz',
  galleryImage5: '/images/gallery/gallery-5.jpg',
  galleryCaption5: 'Wine Tasting',
};

export function getHomepageSettings(): HomepageSettings {
  const possiblePaths = [
    path.join(process.cwd(), 'outstatic', 'content', 'homepage', 'settings.md'),
  ];

  const filePath = possiblePaths.find(p => fs.existsSync(p));

  if (!filePath) {
    return defaultSettings;
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const frontmatterMatch = fileContent.match(/^---\n([\s\S]+?)\n---/);

    if (!frontmatterMatch) {
      return defaultSettings;
    }

    const frontmatterStr = frontmatterMatch[1];
    const settings: Record<string, string> = {};

    frontmatterStr.split('\n').forEach(line => {
      const match = line.match(/^(\w+):\s*['"]?(.+?)['"]?$/);
      if (match) {
        const [, key, value] = match;
        settings[key] = value.replace(/['"]$/, '');
      }
    });

    return {
      card1Image: settings.card1Image || defaultSettings.card1Image,
      card1Title: settings.card1Title || defaultSettings.card1Title,
      card1Description: settings.card1Description || defaultSettings.card1Description,
      card2Image: settings.card2Image || defaultSettings.card2Image,
      card2Title: settings.card2Title || defaultSettings.card2Title,
      card2Description: settings.card2Description || defaultSettings.card2Description,
      card3Image: settings.card3Image || defaultSettings.card3Image,
      card3Title: settings.card3Title || defaultSettings.card3Title,
      card3Description: settings.card3Description || defaultSettings.card3Description,
      communityImage: settings.communityImage || defaultSettings.communityImage,
      galleryImage1: settings.galleryImage1 || defaultSettings.galleryImage1,
      galleryCaption1: settings.galleryCaption1 || defaultSettings.galleryCaption1,
      galleryImage2: settings.galleryImage2 || defaultSettings.galleryImage2,
      galleryCaption2: settings.galleryCaption2 || defaultSettings.galleryCaption2,
      galleryImage3: settings.galleryImage3 || defaultSettings.galleryImage3,
      galleryCaption3: settings.galleryCaption3 || defaultSettings.galleryCaption3,
      galleryImage4: settings.galleryImage4 || defaultSettings.galleryImage4,
      galleryCaption4: settings.galleryCaption4 || defaultSettings.galleryCaption4,
      galleryImage5: settings.galleryImage5 || defaultSettings.galleryImage5,
      galleryCaption5: settings.galleryCaption5 || defaultSettings.galleryCaption5,
    };
  } catch (error) {
    console.error('Error parsing homepage settings:', error);
    return defaultSettings;
  }
}
