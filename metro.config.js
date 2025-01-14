const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add this to handle the clerk package
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];

module.exports = config; 