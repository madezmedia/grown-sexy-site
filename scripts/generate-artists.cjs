const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const artistsDirectory = path.join(process.cwd(), 'outstatic', 'content', 'artists');

function getArtistSlugs() {
  if (!fs.existsSync(artistsDirectory)) {
    console.log('Artists directory not found:', artistsDirectory);
    return [];
  }
  return fs.readdirSync(artistsDirectory).filter(file => file.endsWith('.md'));
}

function getArtistBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(artistsDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    console.log('Artist file not found:', fullPath);
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug: realSlug,
    content,
  };
}

function getAllArtists() {
  const slugs = getArtistSlugs();
  return slugs.map(slug => getArtistBySlug(slug)).filter(Boolean);
}

function main() {
  const artists = getAllArtists();
  const outputPath = path.join(process.cwd(), 'data', 'artists.json');
  
  // Ensure data directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
  fs.writeFileSync(outputPath, JSON.stringify(artists, null, 2));
  console.log(`Generated artist data for ${artists.length} artists:`, artists.map(a => a.slug).join(', '));
}

main();
