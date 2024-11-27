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
        ],
    },
};

export default nextConfig;
