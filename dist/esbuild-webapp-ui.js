"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const esbuild_1 = require("esbuild");
(0, esbuild_1.build)({
    entryPoints: ["webapp/index.ts"],
    bundle: true,
    outfile: "dist/webapp/index.js",
    format: "cjs",
    sourcemap: true,
    plugins: [],
});
//# sourceMappingURL=esbuild-webapp-ui.js.map