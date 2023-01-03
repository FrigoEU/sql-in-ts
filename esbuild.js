const esbuild = require("esbuild");

const buildOptions = {
  entryPoints: ["src/index.ts", "src/example.ts"],
  // entryPoints: ["src/index_kysely.ts"],
  bundle: true,
  sourcemap: true,
  platform: "node",
  outdir: "out",
  // banner: '#!/usr/bin/env node' ,
  external: ["pg-native"],
};

esbuild.build(buildOptions).catch(() => process.exit(1));
