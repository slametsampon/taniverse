const esbuild = require('esbuild');
const path = require('path');

esbuild
  .context({
    absWorkingDir: path.resolve(__dirname), // <--- frontend/
    entryPoints: ['src/main.ts'],
    bundle: true,
    sourcemap: true,
    minify: false,
    outdir: path.resolve(__dirname, '../build/frontend'),
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    target: ['es2020'],
    format: 'esm',
    define: {
      'process.env.NODE_ENV': '"development"',
    },
    loader: {
      '.ts': 'ts',
      '.css': 'css',
    },
    logLevel: 'info',
  })
  .then(async (ctx) => {
    if (process.argv.includes('--watch')) {
      await ctx.watch();
      console.log('👀 Watching for changes...');
    } else {
      await ctx.rebuild();
      await ctx.dispose();
      console.log('✅ Build complete.');
    }
  })
  .catch(() => process.exit(1));
