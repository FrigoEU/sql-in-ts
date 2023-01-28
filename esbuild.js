const esbuild = require("esbuild");

const buildOptions = {
  entryPoints: ["src/cli/cli_generator.ts"],
  bundle: true,
  sourcemap: false,
  platform: "node",
  outfile: "out/cli_generator.js",
  banner: "#!/usr/bin/env node",
  external: ["pg-native"],
};

const buildExampleOptions = {
  entryPoints: ["src/example.ts"],
  bundle: true,
  sourcemap: false,
  platform: "node",
  outfile: "out/example.js",
  external: ["pg-native"],
};

esbuild.build(buildOptions).catch(() => process.exit(1));
esbuild.build(buildExampleOptions).catch(() => process.exit(1));
