import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silencia la advertencia de Turbopack sobre raíz de workspace.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
