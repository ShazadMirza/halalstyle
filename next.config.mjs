/** @type {import('next').NextConfig} */
/**
 * Sprint 4 — Remote images: `**` multi-subdomain wildcards for media + stock CDNs.
 * Apex hostnames listed where `**.domain` may not match bare domain.
 */
const nextConfig = {
  /** Critical CSS inlining (App Router); requires `critters` devDependency */
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      { source: "/vault", has: [{ type: "query", key: "cat", value: "Fashion" }], destination: "/vault/fashion", permanent: true },
      { source: "/vault", has: [{ type: "query", key: "cat", value: "Hijabs" }], destination: "/vault/hijabs", permanent: true },
      { source: "/vault", has: [{ type: "query", key: "cat", value: "Menswear" }], destination: "/vault/menswear", permanent: true },
      { source: "/vault", has: [{ type: "query", key: "cat", value: "Home" }], destination: "/vault/home", permanent: true },
      { source: "/vault", has: [{ type: "query", key: "cat", value: "Kids" }], destination: "/vault/kids", permanent: true },
      { source: "/vault", has: [{ type: "query", key: "cat", value: "Gifts" }], destination: "/vault/gifts", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "media.amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "**.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "**.ssl-images-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "**.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "**.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "pexels.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
