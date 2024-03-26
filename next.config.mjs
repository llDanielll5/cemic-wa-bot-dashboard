/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    STRAPI_KEY_ACCESS: process.env.STRAPI_KEY_ACCESS,
  },
};

export default nextConfig;
