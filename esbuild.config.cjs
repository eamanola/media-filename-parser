const esbuild = require('esbuild');
const { nodeModulesPolyfillPlugin } = require('esbuild-plugins-node-modules-polyfill');

esbuild.build({
  bundle: true,
  entryPoints: ['src/index.js'],
  format: 'esm',
  // minify: true,
  outfile: 'dist/index.bundle.mjs',
  packages: 'bundle',
  platform: 'browser',
  plugins: [
    nodeModulesPolyfillPlugin({
      modules: ['path'],
    }),
  ],
});

esbuild.build({
  bundle: true,
  entryPoints: ['src/index.js'],
  format: 'cjs',
  // minify: true,
  outfile: 'dist/index.bundle.cjs',
  packages: 'external',
  platform: 'node',
});
