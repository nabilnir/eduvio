/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'www.google.com' },
            { hostname: 'www.microsoft.com' },
            { hostname: 'lh3.googleusercontent.com' }, // For Google Profile Pics
        ],
    },
    async rewrites() {
        return [
          {
            source: '/backend-api/:path*',
            destination: 'http://127.0.0.1:8888/api/:path*',
          },
        ];
      },
};

export default nextConfig;
