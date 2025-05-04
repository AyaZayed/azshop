/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
        ignoreDuringBuilds: true
    },
    eslint: {
        ignoreBuildErrors: true,
        ignoreDuringBuilds: true
    },
    swcMinify: true,
    // image source
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                port: "",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/products",
                destination: "/products/all",
                permanent: true,
            }
        ];
    },
};

export default nextConfig;
