const TerserPlugin = require('terser-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

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

const plugins = [
  new webpack.NormalModuleReplacementPlugin(/^node:/u, (resource) => {
    switch (resource.request) {
      case 'node:path':
        // eslint-disable-next-line no-param-reassign
        resource.request = resource.request.replace(/^node:/u, '');
        break;

      default:
        throw new Error(`${resource.request} not mapped in webpack.config`);
    }
  }),
  new NodePolyfillPlugin({ onlyAliases: ['path'] }),
];


const optimization = { minimizer: [new TerserPlugin()] };

const resolve = {};

const experiments = { outputModule: true };

module.exports = {
  entry,
  experiments,
  // externals: [nodeExternals()],
  mode: 'production',
  module: aModule,
  optimization,
  output,
  plugins,
  resolve,
};
