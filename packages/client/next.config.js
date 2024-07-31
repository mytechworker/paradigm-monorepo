/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';
const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL: isProduction ? 'https://paradigmresear.ch' : 'http://localhost:3000',
        API_URL: isProduction ? 'https://paradigmresear.ch:7000' : 'http://localhost:7000',
        IFRAME_URL: process.env.IFRAME_URL,
        IframelyKey: process.env.IframelyKey,
        FB_APP_ID: process.env.FB_APP_ID,
        DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
        DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
        DISCORD_REDIRECT_URI: isProduction
            ? process.env.DISCORD_REDIRECT_URI
            : 'http://localhost:3000/auth/discord/callback',
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_REDIRECT_URI: isProduction ? process.env.GOOGLE_REDIRECT_URI : 'http://localhost:3000/auth/google/callback',
        TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
        TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
        TWITTER_REDIRECT_URI: isProduction
            ? process.env.TWITTER_REDIRECT_URI
            : 'http://localhost:3000/auth/twitter/callback',
    },
    onDemandEntries: {
        maxInactiveAge: 1000 * 60 * 60,
        pagesBufferLength: 5,
    },
    webpack: (config) => {
        config.resolve.fallback = {fs: false};

        return config;
    },
    images: {
        domains: ['localhost', `paradigmresear.ch`],
        disableStaticImages: true,
        dangerouslyAllowSVG: true
    },
    swcMinify: true,
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: true,
});

// module.exports = nextConfig
module.exports = withBundleAnalyzer(nextConfig);
