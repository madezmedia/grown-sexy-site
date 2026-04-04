import fs from "fs";
import path from "path";

export interface Artist {
  slug: string;
  name: string;
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
  bio: string;
}

export function getArtists(): Artist[] {
  const artistsPath = path.join(process.cwd(), "outstatic", "content", "artists");
  
  if (!fs.existsSync(artistsPath)) {
    return [];
  }

  const files = fs.readdirSync(artistsPath).filter((file) => file.endsWith(".md"));

  return files.map((file) => {
    const filePath = path.join(artistsPath, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const frontmatterMatch = fileContent.match(/^---\n([\s\S]+?)\n---\n([\s\S]+)$/);

    if (!frontmatterMatch) {
      return null;
    }

    const frontmatterStr = frontmatterMatch[1];
    const content = frontmatterMatch[2];
    const slug = file.replace(".md", "");

    // Parse YAML frontmatter
    const frontmatter: any = {};
    let currentKey = "";
    let isArray = false;
    let arrayValues: string[] = [];
    let inSocialLinks = false;
    let socialLinks: any = {};

    frontmatterStr.split("\n").forEach((line) => {
      // Check for socialLinks block
      if (line.trim().startsWith("socialLinks:")) {
        inSocialLinks = true;
        currentKey = "socialLinks";
        return;
      }

      if (inSocialLinks) {
        const socialMatch = line.match(/^\s+(\w+):\s*(.+)$/);
        if (socialMatch) {
          const [, key, value] = socialMatch;
          socialLinks[key] = value.replace(/'/g, "");
        } else if (!line.match(/^\s+\w+:/)) {
          inSocialLinks = false;
        } else {
          return;
        }
      }

      if (line.startsWith("  ") && isArray) {
        const arrayMatch = line.match(/^\s+-\s+'?(.+?)'?\s*$/);
        if (arrayMatch) {
          arrayValues.push(arrayMatch[1].replace(/'/g, ""));
        }
        return;
      }

      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        // Save previous array if exists
        if (isArray && arrayValues.length > 0) {
          frontmatter[currentKey] = arrayValues;
          arrayValues = [];
          isArray = false;
        }

        const [, key, value] = match;
        currentKey = key;

        // Check if this is an array
        if (value.startsWith("[")) {
          // Inline array
          const values = value
            .replace(/[\[\]]/g, "")
            .split(", ")
            .map((v: string) => v.replace(/'/g, ""));
          frontmatter[key] = values;
          isArray = false;
        } else if (value === "") {
          isArray = true;
          arrayValues = [];
        } else if (value.startsWith("'") && value.endsWith("'")) {
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

    // Save last array if exists
    if (isArray && arrayValues.length > 0) {
      frontmatter[currentKey] = arrayValues;
    }

    frontmatter.socialLinks = socialLinks;

    return {
      slug,
      name: frontmatter.name || slug,
      stageName: frontmatter.stageName || frontmatter.name || slug,
      coverImage: frontmatter.coverImage || `/images/artists/${slug}.jpg`,
      gallery: frontmatter.gallery || [],
      genre: frontmatter.genre || [],
      socialLinks: frontmatter.socialLinks || {},
      tagline: frontmatter.tagline,
      featuredOnHomepage: frontmatter.featuredOnHomepage ?? false,
      bio: content,
    } as Artist;
  }).filter(Boolean) as Artist[];
}

export function getFeaturedArtists(): Artist[] {
  return getArtists().filter((artist) => artist.featuredOnHomepage);
}

export function getArtistBySlug(slug: string): Artist | null {
  const artists = getArtists();
  return artists.find((artist) => artist.slug === slug) || null;
}
