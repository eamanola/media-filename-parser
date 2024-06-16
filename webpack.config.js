import TerserPlugin from 'terser-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const entry = {
  index: ['./src/index.js'],
};

const output = {
  filename: 'index.bundle.js',
  path: `${dirname(fileURLToPath(import.meta.url))}/dist`,
  library: {
    type: 'module',
  },
};

const aModule = {
  rules: [
    {
      test: /\.js$/i,
      exclude: [/node_modules/],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
  ],
};

const plugins = [];

const optimization = {
  minimizer: [
    new TerserPlugin(),
  ],
};

const resolve = {
  fallback: {
    path: false,
  },
};

const experiments = {
  outputModule: true,
};

export default {
  mode: 'production',
  entry,
  output,
  module: aModule,
  plugins,
  optimization,
  resolve,
  experiments,
  // externalsPresets: { node: true },
  externals: [nodeExternals()],
};
