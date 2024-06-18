module.exports = {
  env: {
    jest: true,
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/extensions': [0],
  },
};
