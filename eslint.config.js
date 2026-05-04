import airbnb from 'eslint-config-xaxa/airbnb';
import globals from 'globals';

export default airbnb(
  {
  // airbnb options
  },
  {
    ignores: ['dist/*'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    rules: {
      'import/extensions': ['off'],
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
      'prefer-named-capture-group': ['error'],
      'require-unicode-regexp': ['error'],
      'sort-keys': ['error'],
    },
  },
  {
    files: ['*.cjs'],
    rules: {
      'import/no-commonjs': ['off'],
    },
  },
  {
    files: ['webpack.config.cjs'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  },
);
