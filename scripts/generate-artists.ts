import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface ArtistFrontmatter {
  name: string;
  slug: string;
  stageName: string;
  coverImage: string;
  gallery: string[];
  genre: string[];
  socialLinks: {
    instagram?: string;
    twitter?: string;
    spotify?: string;
    youtube?: string;
  };
  tagline?: string;
  featuredOnHomepage?: boolean;
}

const artistsDirectory = path.join(process.cwd(), 'outstatic', 'content', 'artists');

function getArtistSlugs() {
  return fs.readdirSync(artistsDirectory).filter(file => file.endsWith('.md'));
}

function getArtistBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(artistsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug: realSlug,
    content,
  } as ArtistFrontmatter & { content: string };
}

function getAllArtists() {
  const slugs = getArtistSlugs();
  return slugs.map(slug => getArtistBySlug(slug));
}

function main() {
  const artists = getAllArtists();
  const outputPath = path.join(process.cwd(), 'data', 'artists.json');
  
  // Ensure data directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
  fs.writeFileSync(outputPath, JSON.stringify(artists, null, 2));
  console.log(`Generated artist data for ${artists.length} artists`);
}

main();
