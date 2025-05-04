import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
        ignoreDuringBuilds: true,
    },
    eslint: {
        ignoreBuildErrors: true,
        ignoreDuringBuilds: true,
    },
    swcMinify: true,
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
            },
        ];
    },
};

const withAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

export default withAnalyzer(nextConfig);
