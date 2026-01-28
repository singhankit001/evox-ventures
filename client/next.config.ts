import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Next infers the monorepo root from a parent package-lock.json and resolves modules there
// (where tailwindcss is not installed). Pin Turbopack to this app directory.
const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  turbopack: {
    root: appDir,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
