const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const entry = {
  index: ['./src/index.js'],
};

const output = {
  filename: 'index.bundle.js',
  library: { type: 'module' },
  path: `${__dirname}/dist`,
};

const aModule = {
  rules: [
    {
      exclude: [/node_modules/u],
      test: /\.js$/iu,
      use: {
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env'] },
      },
    },
  ],
};

const plugins = [];

const optimization = { minimizer: [new TerserPlugin()] };

const resolve = {
  fallback: {
    path: require.resolve('path-browserify'),
  },
};

const experiments = { outputModule: true };

module.exports = {
  entry,
  experiments,
  externals: [nodeExternals()],
  mode: 'production',
  module: aModule,
  optimization,
  output,
  plugins,
  resolve,
};
