import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtistPage } from "@/components/artist/ArtistPage";
import artistsData from "@/data/artists.json";

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
  content: string;
}

// Get all artist slugs
export async function generateStaticParams() {
  return artistsData.map((artist: ArtistFrontmatter) => ({
    slug: artist.slug,
  }));
}

// Generate metadata for each artist
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artist = artistsData.find((a: ArtistFrontmatter) => a.slug === params.slug);
  
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
  const artist = artistsData.find((a: ArtistFrontmatter) => a.slug === params.slug);

  if (!artist) {
    notFound();
  }

  return (
    <ArtistPage
      artist={{
        name: artist.name,
        slug: artist.slug,
        stageName: artist.stageName,
        coverImage: artist.coverImage || '/images/events/wine.jpg',
        gallery: artist.gallery || [],
        genre: artist.genre || [],
        socialLinks: artist.socialLinks || {},
        tagline: artist.tagline,
        bio: artist.content,
      }}
    />
  );
}
