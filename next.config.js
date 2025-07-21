const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

module.exports = withVanillaExtract(nextConfig);
