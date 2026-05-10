import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

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

export default withNextIntl(nextConfig);
