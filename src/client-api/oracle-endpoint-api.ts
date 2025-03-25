import { FactRequest, Commitment, Fact, OracleCapability } from "../node";

export interface OracleEndpointApi {
    requestNewCapability (question: string): OracleCapability | undefined
    requestCommitment: (req: FactRequest) => Commitment | undefined
    requestFact: (req: Commitment | FactRequest) => Fact
}