/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: "https://loop-ai-feedback-platform-v2.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
