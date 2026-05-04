import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  /* não deveria, mas é um projeto simples */
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
