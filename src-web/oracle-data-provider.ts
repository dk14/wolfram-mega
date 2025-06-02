import { endpointAPi, webLookup, webSigner } from "../src/client-api/utils/oracle-endpoint"
import { Commitment, Fact, FactRequest } from "../src/protocol"

export interface OracleDataProvider {
    getCommitment: (endpoint: string, req: FactRequest) => Promise<Commitment>
    getFact: (endpoint: string, c: Commitment) => Promise<Fact>
}

export const webOracle = endpointAPi(() => webSigner, webLookup)

export const dataProvider: OracleDataProvider = {
    getCommitment: async function (endpoint: string, req: FactRequest): Promise<Commitment> {
        if (endpoint === "weboracle:local") {
           return await webOracle.requestCommitment(req)
        } else {
            const commitment = (await fetch(endpoint + '/requestCommitment', {
	            method: 'post',
	            body: JSON.stringify(req),
	            headers: {'Content-Type': 'application/json'}
            })).json()
            return await commitment
        }
    },
    getFact: async function (endpoint: string, c: Commitment): Promise<Fact> {
        if (endpoint === "weboracle:local") {
            return await webOracle.requestFact(c)
        } else {
            const fact = (await fetch(endpoint + '/requestFact', {
                method: 'post',
                body: JSON.stringify(c),
                headers: {'Content-Type': 'application/json'}
            })).json()
            return await fact
        }
    }
}