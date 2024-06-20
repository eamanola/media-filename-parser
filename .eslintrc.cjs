module.exports = {
  env: {
    jest: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    // 'eslint:all',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/extensions': ['off'],
    'sort-keys': ['error'],
    'require-unicode-regexp': ['error'],
    'prefer-named-capture-group': ['error'],
  },
};
