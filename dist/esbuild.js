"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const esbuild_1 = require("esbuild");
const esbuild_plugins_node_modules_polyfill_1 = require("esbuild-plugins-node-modules-polyfill");
const esbuild_plugin_wasm_1 = require("esbuild-plugin-wasm");
const canBeBlank = ['module', 'node-fetch', 'path', 'http', 'util', 'net', 'url', 'fs', 'stream', 'zlib', 'https'];
(0, esbuild_1.build)({
    entryPoints: ["webapp.ts"],
    bundle: true,
    outfile: "mega-peers.min.js",
    format: "esm",
    sourcemap: true,
    plugins: [
        (0, esbuild_plugins_node_modules_polyfill_1.nodeModulesPolyfillPlugin)({
            globals: {
                process: true,
                Buffer: true,
            },
            modules: ['crypto', 'process', 'buffer'].concat(canBeBlank)
        }),
        (0, esbuild_plugin_wasm_1.wasmLoader)({
            mode: 'embedded'
        })
    ],
});
//# sourceMappingURL=esbuild.js.map