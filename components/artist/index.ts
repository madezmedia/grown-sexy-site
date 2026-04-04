import { getFeaturedArtists } from "@/lib/artists";
import { FeaturedArtistSection as FeaturedArtistSectionClient } from "./FeaturedArtistSection";

export async function FeaturedArtistSection() {
  const artists = getFeaturedArtists();
  
  return <FeaturedArtistSectionClient artists={artists} />;
}
