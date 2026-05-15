/** @type {import('next').NextConfig} */
/**
 * Sprint 4 — Image remote allowlist (Next/Image + Amazon + stock CDNs).
 * Wildcards: `*` = one DNS label, `**` = many subdomains (Next.js rules).
 */
const nextConfig = {
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
      /* Amazon — explicit media host + single-label and multi-subdomain wildcards */
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "*.amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "*.amazon.ca", pathname: "/**" },
      { protocol: "https", hostname: "*.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.ca", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.co.uk", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.de", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.fr", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.it", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.es", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.co.jp", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.com.au", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.in", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.com.mx", pathname: "/**" },
      { protocol: "https", hostname: "**.amazon.com.br", pathname: "/**" },
      { protocol: "https", hostname: "**.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "*.ssl-images-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "**.ssl-images-amazon.com", pathname: "/**" },
      /* Unsplash — explicit + wildcard (images., plus., etc.) */
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "plus.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "*.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "**.unsplash.com", pathname: "/**" },
      /* Pexels */
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "*.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "**.pexels.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
