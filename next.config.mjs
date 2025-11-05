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

    // async headers() {
    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: [
    //                 { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'; object-src 'none'" },
    //                 { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    //                 { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    //                 { key: 'X-Frame-Options', value: 'DENY' },
    //             ],
    //         },
    //     ];
    // }

};

const withAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

export default withAnalyzer(nextConfig);
