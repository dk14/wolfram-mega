"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataProvider = exports.webOracle = void 0;
const oracle_endpoint_1 = require("../src/client-api/utils/oracle-endpoint");
exports.webOracle = (0, oracle_endpoint_1.endpointAPi)(() => oracle_endpoint_1.webSigner, oracle_endpoint_1.webLookup);
exports.dataProvider = {
    getCommitment: async function (endpoint, req) {
        if (endpoint === "web-oracle:local") {
            return await exports.webOracle.requestCommitment(req);
        }
        else {
            const commitment = (await fetch(endpoint + '/requestCommitment', {
                method: 'post',
                body: JSON.stringify(req),
                headers: { 'Content-Type': 'application/json' }
            })).json();
            return await commitment;
        }
    },
    getFact: async function (endpoint, c) {
        if (endpoint === "web-oracle:local") {
            return await exports.webOracle.requestFact(c);
        }
        else {
            const fact = (await fetch(endpoint + '/requestFact', {
                method: 'post',
                body: JSON.stringify(c),
                headers: { 'Content-Type': 'application/json' }
            })).json();
            return await fact;
        }
    }
};
//# sourceMappingURL=oracle-data-provider.js.map