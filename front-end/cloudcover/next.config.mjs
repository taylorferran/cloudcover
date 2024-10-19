/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "assets.aceternity.com" },
    ],
  },
};

export default nextConfig;
