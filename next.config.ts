/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    domains: [
      "egruppa-storage.s3.amazonaws.com",
      "picsum.photos",
      "opensource.org",
      "localhost",
    ],
  },
};

export default nextConfig;
