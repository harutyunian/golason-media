import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "a.espncdn.com" },
      { protocol: "https", hostname: "images.fotmob.com" },
      { protocol: "https", hostname: "s.espncdn.com" }
    ]
  }
};

export default nextConfig;
