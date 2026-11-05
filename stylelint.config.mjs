export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'alpha-value-notation': 'number',
    'color-function-alias-notation': null,
    'color-function-notation': 'legacy',
  },
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/build/**'],
};
