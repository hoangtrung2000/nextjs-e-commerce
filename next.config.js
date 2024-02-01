/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // remotePatterns: [
    //   {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
    // protocol: "https",
    // hostname: "firebasestorage.googleapis.com",
    //   },
    // ],
  },
};

module.exports = nextConfig;
