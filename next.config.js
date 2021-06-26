const withImages = require('next-images');
const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
};

const nextImagesConfig = {
  esModule: true,
};

const nextPWAConfig = {
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
};

module.exports = withPWA(
  withImages({
    ...nextConfig,
    ...nextImagesConfig,
    ...nextPWAConfig,
  }),
);
