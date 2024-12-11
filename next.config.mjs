/** @type {import('next').NextConfig} */
const nextConfig = {
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
                hostname: "images.unsplash.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "lerub.com",
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
            },
        ];
    },
};

export default nextConfig;
