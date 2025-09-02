
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cjukxkxmubwpxuervosm.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
