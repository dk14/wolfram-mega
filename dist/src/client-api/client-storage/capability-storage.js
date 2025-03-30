"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.capabilityStorage = void 0;
const fs = __importStar(require("fs"));
//for demos; clients should build their own implementations (MySQL etc.)
const capabilityStorage = (path, pageSize, activeCpLimit) => {
    if (!fs.existsSync(path + "/")) {
        fs.mkdirSync(path, { recursive: true });
    }
    const getPage = async (pageNo) => {
        const pagepath = path + "/" + pageNo + ".json";
        if (fs.existsSync(pagepath)) {
            return JSON.parse(fs.readFileSync(pagepath).toString());
        }
        else {
            return {};
        }
    };
    const transformPage = async (pageNo, transformer) => {
        const page = await getPage(pageNo);
        fs.writeFileSync(path + "/" + pageNo + ".json", JSON.stringify(transformer(page)));
    };
    const cps = {
        addCapability: async function (cp) {
            transformPage(cp.capabilityPubKey.slice(0, -pageSize * 4), page => {
                page[cp.capabilityPubKey] = cp;
                return page;
            });
        },
        deactivateCapability: async function (capabilityPubKey) {
            transformPage(capabilityPubKey.slice(0, -pageSize * 4), page => {
                if (page[capabilityPubKey]) {
                    page[capabilityPubKey].off = true;
                }
                return page;
            });
        },
        activateCapability: async function (capabilityPubKey) {
            transformPage(capabilityPubKey.slice(0, -pageSize * 4), page => {
                if (page[capabilityPubKey]) {
                    page[capabilityPubKey].off = false;
                }
                return page;
            });
        },
        dropCapability: async function (capabilityPubKey) {
            transformPage(capabilityPubKey.slice(0, -pageSize * 4), page => {
                if (page[capabilityPubKey]) {
                    delete page[capabilityPubKey];
                }
                return page;
            });
        },
        getCapability: async function (capabilityPubKey) {
            const page = await getPage(capabilityPubKey.slice(0, -pageSize * 4));
            return page[capabilityPubKey];
        },
        listCapabilities: async function (query, paging) {
            return fs.readdirSync(path + "/").map(file => {
                const page = JSON.parse(fs.readFileSync(path + "/" + file).toString());
                return Object.values(page).filter(async (x) => await query.where(x));
            }).flat().slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize);
        },
        listActiveCapabilities: async function () {
            return fs.readdirSync(path + "/").map(file => {
                const page = JSON.parse(fs.readFileSync(path + "/" + file).toString());
                return Object.values(page).filter(x => x.off !== true);
            }).flat().slice(0, activeCpLimit);
        },
        updateCapabilityPow: async function (capabilityPubKey, pow) {
            transformPage(capabilityPubKey.slice(0, -pageSize * 4), page => {
                if (page[capabilityPubKey]) {
                    page[capabilityPubKey].pow = pow;
                }
                return page;
            });
        }
    };
    return cps;
};
exports.capabilityStorage = capabilityStorage;
//# sourceMappingURL=capability-storage.js.map