import { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { ArtistPage } from "@/components/artist/ArtistPage";

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

interface ArtistDoc {
  frontmatter: ArtistFrontmatter;
  content: string;
}

// Get all artist slugs
async function getArtistSlugs(): Promise<string[]> {
  const artistsPath = path.join(process.cwd(), "outstatic", "content", "artists");
  const files = fs.readdirSync(artistsPath);
  return files.filter((file) => file.endsWith(".md")).map((file) => file.replace(".md", ""));
}

// Parse markdown file
function parseMarkdownFile(slug: string): ArtistDoc | null {
  const filePath = path.join(process.cwd(), "outstatic", "content", "artists", `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const frontmatterMatch = fileContent.match(/^---\n([\s\S]+?)\n---\n([\s\S]+)$/);
  
  if (!frontmatterMatch) {
    return null;
  }

  const frontmatterStr = frontmatterMatch[1];
  const content = frontmatterMatch[2];

  // Parse YAML frontmatter
  const frontmatter: any = {};
  frontmatterStr.split("\n").forEach((line) => {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      // Handle different value types
      if (value.startsWith("'") && value.endsWith("'")) {
        frontmatter[key] = value.slice(1, -1);
      } else if (value === "true") {
        frontmatter[key] = true;
      } else if (value === "false") {
        frontmatter[key] = false;
      } else {
        frontmatter[key] = value;
      }
    }
  });

  // Handle array fields
  if (frontmatter.genre) {
    frontmatter.genre = frontmatter.genre.replace(/[\[\]]/g, "").split(", ").map((g: string) => g.replace(/'/g, ""));
  }
  
  if (frontmatter.gallery) {
    frontmatter.gallery = frontmatter.gallery.replace(/[\[\]]/g, "").split(", ").map((g: string) => g.replace(/'/g, ""));
  }

  return {
    frontmatter: {
      ...frontmatter,
      slug,
      gallery: frontmatter.gallery || [],
      genre: frontmatter.genre || [],
      socialLinks: frontmatter.socialLinks || {},
    } as ArtistFrontmatter,
    content,
  };
}

// Generate static params for all artists
export async function generateStaticParams() {
  const slugs = await getArtistSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each artist
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artist = parseMarkdownFile(params.slug);
  
  if (!artist) {
    return {
      title: "Artist Not Found",
    };
  }

  return {
    title: `${artist.frontmatter.stageName} | The Grown & Sexy Movement`,
    description: `Featured artist ${artist.frontmatter.stageName} of The Grown & Sexy Movement.`,
    openGraph: {
      title: artist.frontmatter.stageName,
      description: artist.frontmatter.tagline || `Featured artist of The Grown & Sexy Movement`,
      images: [artist.frontmatter.coverImage],
    },
  };
}

export default async function ArtistPageRoute({ params }: { params: { slug: string } }) {
  const artist = parseMarkdownFile(params.slug);

  if (!artist) {
    notFound();
  }

  return (
    <ArtistPage
      artist={{
        ...artist.frontmatter,
        bio: artist.content,
      }}
    />
  );
}
