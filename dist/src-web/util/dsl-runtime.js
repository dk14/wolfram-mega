"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalDiscreet = void 0;
const sandboxjs_1 = __importDefault(require("@nyariv/sandboxjs"));
const dsl_1 = require("../dsl");
const evalDiscreet = async (expression, parties, bounds) => {
    const model = await (new dsl_1.Dsl(async (dsl) => {
        const prototypeWhitelist = sandboxjs_1.default.SAFE_PROTOTYPES;
        const globals = { ...sandboxjs_1.default.SAFE_GLOBALS, alert };
        prototypeWhitelist.set(dsl_1.Dsl, new Set());
        const sandbox = new sandboxjs_1.default({ globals, prototypeWhitelist });
        const exec = sandbox.compile(expression);
        exec({ dsl, Dsl: dsl_1.Dsl }).run();
    }).multiple(...parties).enumerateWithBoundMulti(bounds));
    return model;
};
exports.evalDiscreet = evalDiscreet;
window.evalDiscreet = exports.evalDiscreet;
//# sourceMappingURL=dsl-runtime.js.map