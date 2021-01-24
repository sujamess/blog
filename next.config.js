const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa');
const withOffline = require('next-offline');
const withPreact = require('next-plugin-preact')

module.exports = withPlugins(
  [
    [withOffline],
    [withPWA,
      {
        pwa: {
          dest: 'public',
        },
      }
    ],
    [withPreact]
  ],
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
