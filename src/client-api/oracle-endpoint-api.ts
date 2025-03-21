import { FactRequest, Commitment, Fact } from "../node";

export interface OracleEndpointApi {
    requestCommitment: (req: FactRequest) => Commitment | undefined
    requestFact: (req: Commitment | FactRequest) => Fact
}