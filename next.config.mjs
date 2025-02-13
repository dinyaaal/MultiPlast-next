import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "127.0.0.1", // Добавил локальный хост
      "13.60.7.255",
      "ec2-13-60-7-255.eu-north-1.compute.amazonaws.com",
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
