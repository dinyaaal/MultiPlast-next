import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["13.60.7.255"],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
