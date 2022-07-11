/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };

    return config;
  },
  images: {
    domains: ['server835762.nazwa.pl', 'fbcdn.net']
  }
}

module.exports = nextConfig
