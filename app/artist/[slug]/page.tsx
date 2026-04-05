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

  // Try multiple possible paths for the content directory
  const possiblePaths = [
    path.join(process.cwd(), "outstatic", "content", "artists"),
    path.join(process.cwd(), "content", "artists"),
    path.join(__dirname, "..", "..", "..", "outstatic", "content", "artists"),
  ];

  let artistsPath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      artistsPath = p;
      break;
    }
  }

  if (!artistsPath) {
    console.error("Could not find artists content directory");
    return (artistsCache = []);
  }

  try {
    const files = fs.readdirSync(artistsPath).filter((f) => f.endsWith(".md"));
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
    artistsCache = artists;
    return artists;
  } catch (error) {
    console.error("Error reading artists:", error);
    return (artistsCache = []);
  }
}

// ============================================
// PAGE COMPONENT
// ============================================

// Generate static params for all artists
export async function generateStaticParams() {
  const artists = getArtistsData();
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
