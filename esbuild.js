const esbuild = require("esbuild");

const buildOptions = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  sourcemap: true,
  platform: "node",
  outdir: 'out',
  // banner: '#!/usr/bin/env node' ,
  external: []
};

esbuild.build(buildOptions).catch(() => process.exit(1));
