import TerserPlugin from 'terser-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const entry = {
  index: ['./src/index.js'],
};

const output = {
  filename: 'index.bundle.js',
  library: { type: 'module' },
  path: `${dirname(fileURLToPath(import.meta.url))}/dist`,
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
    path: false,
  },
};

const experiments = { outputModule: true };

export default {
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
