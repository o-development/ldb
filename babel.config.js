module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', {
        jsxImportSource: 'nativewind',
        unstable_transformProfile: 'hermes-canary'
      }],
      'nativewind/babel'
    ],
    plugins: [
      '@babel/plugin-syntax-import-meta'
    ]
  };
};
