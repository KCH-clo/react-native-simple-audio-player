module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'prettier/prettier': ['error', {endOfLine: 'auto'}],
        'no-shadow': 'off',
        'no-undef': 'off',
        semi: 'off',
      },
    },
  ],
}
