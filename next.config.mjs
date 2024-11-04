/** @type {import('next').NextConfig} */
const nextConfig = {
    // image source
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                port: "",
            }
        ],
    },
};

export default nextConfig;
