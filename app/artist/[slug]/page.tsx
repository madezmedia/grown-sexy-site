import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtistPage } from "@/components/artist/ArtistPage";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// ============================================
// ARTIST DATA - Generated at build time
// ============================================

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

// Cache for artist data
let artistsCache: (ArtistFrontmatter & { content: string })[] | null = null;

function getArtistsData(): (ArtistFrontmatter & { content: string })[] {
  if (artistsCache) return artistsCache;

  // Use process.cwd() which works in both local and Vercel environments
  const cwd = process.cwd();
  
  // Try multiple possible paths for the content directory
  const possiblePaths = [
    path.join(cwd, "outstatic", "content", "artists"),
    // Vercel may trace files to .next directory
    path.join(cwd, ".next", "server", "outstatic", "content", "artists"),
    // Try relative to current file location
    path.join(__dirname, "..", "..", "..", "outstatic", "content", "artists"),
    path.join(__dirname, "..", "..", "..", "..", "..", "outstatic", "content", "artists"),
  ];

  console.log("Looking for artists in paths:", possiblePaths);

  let artistsPath: string | null = null;
  for (const p of possiblePaths) {
    console.log(`Checking path: ${p} - exists: ${fs.existsSync(p)}`);
      artistsPath = p;
      break;
    }
  }

  if (!artistsPath) {
    console.error("Could not find artists content directory. Tried:", possiblePaths);
    return (artistsCache = []);
  }

  console.log(`Found artists directory at: ${artistsPath}`);

  try {
    const files = fs.readdirSync(artistsPath).filter((f) => f.endsWith(".md"));
    console.log(`Found ${files.length} artist files:`, files);
    
    const artists = files.map((file) => {
      const filePath = path.join(artistsPath!, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        ...(data as ArtistFrontmatter),
        slug: file.replace(/\.md$/, ""),
        content,
      };
    });
    console.log(`Loaded ${artists.length} artists`);
    artistsCache = artists;
    return artists;
  } catch (error) {
    console.error("Error reading artists:", error);
    return (artistsCache = []);
  }
}

// ============================================
// PAGE component
// ============================================

// Generate static params for all artists
export async function generateStaticParams() {
  const artists = getArtistsData();
  console.log("generateStaticParams - artists:", artists.map(a => a.slug));
  return artists.map((artist) => ({ slug: artist.slug }));
}

// Generate metadata for each artist
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artists = getArtistsData();
  const artist = artists.find((a) => a.slug === params.slug);

  if (!artist) {
    return {
      title: "Artist Not Found",
    };
  }

  return {
    title: `${artist.stageName} | The Grown & Sexy Movement`,
    description: artist.tagline || `Featured artist ${artist.stageName} of The Grown & Sexy Movement.`,
    openGraph: {
      title: artist.stageName,
      description: artist.tagline || `Featured artist of The Grown & Sexy Movement`,
      images: artist.coverImage ? [artist.coverImage] : [],
    },
  };
}

export default function ArtistPageRoute({ params }: { params: { slug: string } }) {
  const artists = getArtistsData();
  const artist = artists.find((a) => a.slug === params.slug);

  console.log(`ArtistPageRoute - slug: ${params.slug}, found: ${!!artist}`);

  if (!artist) {
    notFound();
  }

  return (
    <ArtistPage
      artist={{
        name: artist.name,
        slug: artist.slug,
        stageName: artist.stageName,
        coverImage: artist.coverImage || "/images/events/wine.jpg",
        gallery: artist.gallery || [],
        genre: artist.genre || [],
        socialLinks: artist.socialLinks || {},
        tagline: artist.tagline,
        bio: artist.content,
      }}
    />
  );
}