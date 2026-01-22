import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", pathname: "/**" },
      { protocol: "http", hostname: "13.60.7.255", pathname: "/**" },
      { protocol: "https", hostname: "ec2-13-60-7-255.eu-north-1.compute.amazonaws.com", pathname: "/**" },
      { protocol: "http", hostname: "176.118.167.92", pathname: "/**" },
      { protocol: "https", hostname: "multiplast.web-hub.online", pathname: "/**" },
      { protocol: "https", hostname: "multiplast-api.web-hub.online", pathname: "/**" },
      { protocol: "http", hostname: "localhost", pathname: "/**" },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
