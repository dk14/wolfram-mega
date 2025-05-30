"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const esbuild_1 = require("esbuild");
const esbuild_plugins_node_modules_polyfill_1 = require("esbuild-plugins-node-modules-polyfill");
(0, esbuild_1.build)({
    entryPoints: ["webapp.ts"],
    bundle: true,
    outfile: "bundle.js",
    plugins: [
        (0, esbuild_plugins_node_modules_polyfill_1.nodeModulesPolyfillPlugin)({
            globals: {
                process: true,
                Buffer: true,
            },
            modules: ['crypto', 'process', 'buffer']
        }),
    ],
});
//# sourceMappingURL=esbuild.js.map