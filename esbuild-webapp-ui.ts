import { build } from "esbuild";

build({
	entryPoints: ["webapp/index.ts"],
	bundle: true,
	outfile: "dist/webapp/index.js",
	format: "cjs",
	sourcemap: true,
	plugins: [
	],
});