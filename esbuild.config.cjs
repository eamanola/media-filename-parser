const esbuild = require('esbuild');

esbuild.build({
  bundle: true,
  entryPoints: ['src/index.js'],
  format: 'esm',
  // minify: true,
  outfile: 'dist/index.bundle.js',
  packages: 'bundle',
  platform: 'browser',
});
