module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          unstable_transformProfile: 'hermes-canary',
        },
      ],
    ],
    plugins: ['@babel/plugin-syntax-import-meta'],
  };
};
