import { build } from "esbuild";
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';

build({
	entryPoints: ["webapp.ts"],
	bundle: true,
	outfile: "bundle.js",
	plugins: [
		nodeModulesPolyfillPlugin({
			globals: {
				process: true,
				Buffer: true,  
			},
            modules: ['crypto', 'process', 'buffer']
		}),
	],
});