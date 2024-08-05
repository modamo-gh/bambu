const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, 'svg'],
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg', 'json']
  }
};
