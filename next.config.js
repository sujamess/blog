const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa');
const withOffline = require('next-offline');
const withPreact = require('next-plugin-preact');

module.exports = withPlugins(
  [[withOffline], [withPWA], [withPreact]],
  {
    pwa: {
      dest: 'public',
    },
  },
);
