import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/products/face", destination: "/products", permanent: true },
      { source: "/products/requirement", destination: "/", permanent: true },
      { source: "/showcase", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
