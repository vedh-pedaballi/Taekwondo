const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Reduce file watching to avoid file limit issues
config.watchFolders = [__dirname];
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Disable file watching for node_modules to reduce file count
config.resolver.blockList = [
  /node_modules\/.*\/node_modules\/.*/,
];

module.exports = config; 