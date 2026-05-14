/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      /* Amazon — explicit + subdomain wildcards (media / ssl-images live on separate registrable domains) */
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.ca", pathname: "/**" },
      { protocol: "https", hostname: "**.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "*.ssl-images-amazon.com", pathname: "/**" },
      /* Unsplash / Pexels — any single-label subdomain (images., plus., etc.) */
      { protocol: "https", hostname: "*.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "*.pexels.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
