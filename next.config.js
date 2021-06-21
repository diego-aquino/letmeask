const withImages = require("next-images");

const nextConfig = {
  reactStrictMode: true,
};

const nextImagesConfig = {
  esModule: true,
};

module.exports = withImages({
  ...nextConfig,
  ...nextImagesConfig,
});
