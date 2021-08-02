const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withOffline = require('next-offline')
const withPreact = require('next-plugin-preact')

module.exports = withPlugins(
  [[withOffline], [withPreact], [withBundleAnalyzer]],
  {
    target: 'serverless',
    rewrites: async () => {
      return [
        {
          source: '/sitemap.xml',
          destination: '/src/services/seo/sitemap',
        },
        {
          source: '/robots.txt',
          destination: '/src/services/seo/robots',
        },
      ]
    },
    images: {
      domains: ['images.ctfassets.net'],
    },
    experimental: {
      optimizeFonts: true,
      scrollRestoration: true,
    },
  }
);
