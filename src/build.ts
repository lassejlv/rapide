import { $ } from "bun";

Bun.build({
  format: "esm",
  target: "bun",
  entrypoints: ["src/Server.ts", "src/Router.ts", "src/Context.ts", "src/types.ts"],
  outdir: "dist",
  minify: {
    whitespace: true,
  },
});

await $`bunx tsc`;
