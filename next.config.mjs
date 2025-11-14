/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // allow loading images from builder CDN used in the CallToAction background
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.builder.io",
      },
    ],
  },
};

export default nextConfig;
