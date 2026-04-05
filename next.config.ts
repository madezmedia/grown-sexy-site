import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Include outstatic content files in the serverless bundle
  outputFileTracingIncludes: {
    "/*": ["./outstatic/content/**/*"],
  },
};

export default nextConfig;
