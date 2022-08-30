/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/Common",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
