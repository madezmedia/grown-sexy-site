import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtistPage } from "@/components/artist/ArtistPage";
import { getArtistBySlug, getAllArtistSlugs, type Artist } from "@/lib/outstatic";

// Generate static params for all artists
export async function generateStaticParams() {
  const slugs = await getAllArtistSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each artist
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artist = await getArtistBySlug(params.slug);
  
  if (!artist) {
    return {
      title: "Artist Not Found",
    };
  }

  return {
    title: `${artist.stageName} | The Grown & Sexy Movement`,
    description: `Featured artist ${artist.stageName} of The Grown & Sexy Movement.`,
    openGraph: {
      title: artist.stageName,
      description: artist.tagline || `Featured artist of The Grown & Sexy Movement`,
      images: artist.coverImage ? [artist.coverImage] : [],
    },
  };
}

export default async function ArtistPageRoute({ params }: { params: { slug: string } }) {
  const artist = await getArtistBySlug(params.slug);

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
