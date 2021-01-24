const withPlugins = require('next-compose-plugins');
const withPreact = require('next-plugin-preact')

module.exports = withPlugins(
  [[withPreact]],
  {
    target: 'serverless',
    async rewrites() {
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
    },
  }
);
