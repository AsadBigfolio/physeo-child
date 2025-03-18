/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "superu.s3.us-east-2.amazonaws.com",
        pathname: "/files/**",
      },
    ],
  },
  experimental: {
    esmExternals: false,
  },
};

export default nextConfig;
