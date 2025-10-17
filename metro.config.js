const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// Add support for ES modules and import.meta
config.resolver.platforms = ['native', 'web', 'ios', 'android'];
config.transformer.minifierConfig = {
  mangle: {
    keep_fnames: true,
  },
  output: {
    ascii_only: true,
    quote_style: 3,
    wrap_iife: true,
  },
  sourceMap: {
    includeSources: false,
  },
  toplevel: false,
  compress: {
    reduce_funcs: false,
  },
};

module.exports = config;
