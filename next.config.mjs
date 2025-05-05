/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "superu.s3.us-east-2.amazonaws.com",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    esmExternals: false,
  },
};

export default nextConfig;
