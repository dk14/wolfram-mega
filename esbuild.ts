import { build } from "esbuild";
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { wasmLoader } from 'esbuild-plugin-wasm'

const canBeBlank = ['module', 'node-fetch', 'path', 'http', 'util', 'net', 'url', 'fs', 'stream', 'zlib', 'https']
build({
	entryPoints: ["webapp.ts"],
	bundle: true,
	outfile: "mega-peers.min.js",
	format: "esm",
	sourcemap: true,
	plugins: [
		nodeModulesPolyfillPlugin({
			globals: {
				process: true,
				Buffer: true,  
			},
            modules: ['crypto', 'process', 'buffer'].concat(canBeBlank) 
			
		}),
		wasmLoader({
			mode: 'embedded'
		})
	],
});

build({
	entryPoints: ["src-web/util/dsl-runtime.ts"],
	bundle: true,
	outfile: "dist/discreet-eval.min.js",
	format: "esm",
	sourcemap: true,
	plugins: [
	],
});