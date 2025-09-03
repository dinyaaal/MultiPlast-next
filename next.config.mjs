import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "127.0.0.1",
      "13.60.7.255",
      "ec2-13-60-7-255.eu-north-1.compute.amazonaws.com",
      "multiplast.web-hub.online",
      "multiplast-api.web-hub.online",
      "localhost",
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
