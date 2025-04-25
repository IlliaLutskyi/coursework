import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },

  images: {
    domains: ["image.tmdb.org", "pink-genetic-monkey-993.mypinata.cloud"], // ✅ Allow TMDB images
  },
};

export default nextConfig;
