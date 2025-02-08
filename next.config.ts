import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    domains: ["image.tmdb.org"], // ✅ Allow TMDB images
  },
  /* config options here */
};

export default nextConfig;
