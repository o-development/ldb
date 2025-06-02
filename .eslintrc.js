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
    '@typescript-eslint/no-unused-vars': 1,
  },
};
