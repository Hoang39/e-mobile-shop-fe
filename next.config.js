/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.hoanghamobile.com",
      "cdn1.hoanghamobile.com",
      "hoanghamobile.com",
      "admin.hoanghamobile.com",
      "avatars.githubusercontent.com",
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: [
        "main--emobileshop.netlify.app",
        "emobileshop.netlify.app",
      ],
    },
  },
};

module.exports = nextConfig;
