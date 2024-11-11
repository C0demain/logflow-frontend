/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
        ignoreDuringBuilds: true
    },
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
      },
};

export default nextConfig;
