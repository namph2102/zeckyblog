/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },

      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  env: {
    DOMAIN_sever: process.env.DOMAIN_sever,
    DOMAIN_URL: process.env.DOMAIN_URL,
  },
};

module.exports = nextConfig;
