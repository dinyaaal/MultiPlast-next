import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["13.60.7.255"],
    domains: ["ec2-13-60-7-255.eu-north-1.compute.amazonaws.com"],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
