import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "13.60.7.255",
      },
      {
        protocol: "https",
        hostname: "ec2-13-60-7-255.eu-north-1.compute.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "multiplast.web-hub.online",
      },
      {
        protocol: "https",
        hostname: "multiplast-api.web-hub.online",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
