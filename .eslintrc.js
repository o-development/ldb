module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/no-unstable-nested-components': 0,
    'react-native/no-inline-styles': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [
              'components/*',
              '~/components/*',
              'lib/*',
              '~/lib/*',
              'resourceViews/*',
              '~/resourceViews/*',
              '.ldo/*',
              '~/ldo/*',
            ],
            message:
              'Absolute imports are not allowed. Please use relative imports instead.',
          },
        ],
      },
    ],
  },
};
