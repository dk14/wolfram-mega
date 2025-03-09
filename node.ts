import {createHash, createVerify, generateKeyPairSync, createSign} from 'crypto'
import * as request from 'request'
import * as fs from 'fs'


const curve = 'secp521r1';

interface KeyPair {
    pub: string, 
    pk: string
}

export const testOnlyGenerateKeyPair = (): KeyPair => {
    const regex = /.{64}/g;
    
    const { publicKey, privateKey } = generateKeyPairSync('ec', { namedCurve: curve });
    const privateKeyDer = privateKey.export({ type: 'sec1', format: 'der' }).toString('base64');
    const formattedPrivateKey = privateKeyDer.replace(regex, '$&\n');


    const publicKeyDer = publicKey.export({ type: 'spki', format: 'der' }).toString('base64');
    const formattedPublicKey = publicKeyDer.replace(regex, '$&\n');

    return {
        pub: Buffer.from('-----BEGIN EC PRIVATE KEY-----\n' + formattedPrivateKey + '\n-----END EC PRIVATE KEY-----\n').toString('base64'),
        pk: Buffer.from('-----BEGIN PUBLIC KEY-----\n'+ formattedPublicKey + '\n-----END PUBLIC KEY-----\n').toString('base64')
    }
}

export const testOnlySign = (msg: string, pk: string) => {
    return createSign('SHA256').update(msg).sign(pk, 'base64')
}

export interface Param {
    name: string
    values: string[]
}

interface OracleCapability {
    oraclePubKey: string
    capabilityPubKey: string
    question: string // oracle is responsible for unambiguity of question - this field can be use to match capabilities of different oracles

    seqNo: number //used for broadcast
    cTTL: number //used for broadcast

    oracleSignature: string //sign this OracleCapability JSON record (with empty string signature field)
    oracleSignatureType: string
    pow: HashCashPow
    
    params?: Param[] //possible params
    answers?: string[] //possible answers
    endpoint?: string //how to query oracle

}


type PreimageType = string

interface HashCashPow {
    preimageType: PreimageType
    difficulty: number
    algorithm: string
    hash: string
}

interface Bid {
    paymentType?: string
    amount: number
    proof: string
}

interface OracleId {
    pubkey: string // sign every request/response
    seqNo: number //used for broadcast
    cTTL: number //used for broadcast

    pow: HashCashPow
    manifestUri?: string

    bid: Bid

    previousId?: OracleId //in case oracle has to change pubkey
    previousIdSignatureToNewPubkey?: string
}

//we keep data in memory (HDD is only used as a backup storage), some data (malleability reports) can be sharded between peers
// facilitators can start multiple fact sharing nodes in order to keep more data available
// our secret sauce here is that reports are prioritized by PoW, so even sharding would be eventually consistent
interface Oracle { 
    id: OracleId
    capabilies: OracleCapability[]
    reports: MaleabilityReport[]
}

interface Mempool {
    oracles: { [id: string] : Oracle; }
}

interface FactRequest {
    capabilityPubKey: string
    arguments: { [id: string] : string; }
}

interface ProofOfPayment {
    request: FactRequest
    proofOfPayment: string
}


interface Fact {
    factWithArguments: string
    signatureType: string
    signature: string
}

interface FactDisagreesWithPublic { //this report is for manual review, it requires pow to submit in order to avoid spamming. Strongest pows will be prioritized
    type: 'fact-disagreees-with-public'
    request: FactRequest
    comment?: string
    pow: HashCashPow
    seqNo: number //used for broadcast
}

interface FactConflict {
    type: 'fact-conflict'
    request: FactRequest
    facts: Fact[] //must be of the same capability; TODO validator
    pow: HashCashPow
    seqNo: number //used for broadcast
}

interface FactMissing {
    type: 'fact-missing'
    request: FactRequest
    payment?: ProofOfPayment
    dispute?: Fact
    pow: HashCashPow
    seqNo: number //used for broadcast
}

type MaleabilityReport = FactDisagreesWithPublic | FactConflict | FactMissing

interface Dispute {
    seqNo: number //used for broadcast
    cTTL: number //used for broadcast
    claim: FactMissing
    oraclePubKey: string
    fact: Fact
}

interface Report {
    cTTL: number //used for broadcast
    oraclePubKey: string
    content: MaleabilityReport
}

interface FacilitatorId {
    websiteManifestUri?: string
    rewardAddress?: string
    facilitatorRewardIdPow?: HashCashPow // preimage is concat of reward addresses
}

export interface PagingDescriptor {
    page: number
    chunkSize: number
}


type Registered = string
type NotRegistered = string

type DisputeAccepted = string
type DisputeRejected = string

type ReportAccepted = string
type ReportRejected = string


interface Api {
    mempool: Mempool

    //----exposed as P2P and REST POST----
    announceOracle: (cfg: MempoolConfig<any>, id: OracleId) => Promise<Registered | NotRegistered>
    announceCapability: (cfg: MempoolConfig<any>, cp: OracleCapability) => Promise<Registered | NotRegistered>
    reportMalleability: (cfg: MempoolConfig<any>, report: Report) => Promise<ReportAccepted | ReportRejected>
    disputeMissingfactClaim: (dispute: Dispute) => Promise<DisputeAccepted | DisputeRejected> 
    //note: it does not dispute time delay/SLA, but it is less crushial for most option contracts

    //----exposed only as REST GET----- oracles should be sorted by proofs of payment
    lookupOracles: (paging: PagingDescriptor, questions: string[]) => Promise<OracleId[]>
    lookupCapabilities: (paging: PagingDescriptor, oraclePub: string) => Promise<OracleCapability[]>
    lookupReports: (paging: PagingDescriptor, oraclePub: string) => Promise<MaleabilityReport[]>

    proxify: (req: FactRequest, uri: string) => Promise<string>

}


export interface FacilitatorNode<PeerT> { //TODO implement
    peers: PeerT[]
    discovered: (peer: PeerT) => void
    broadcastPeer: (peer: PeerT) => void

    processApiRequest: (command: string, content: string) => Promise<void>
    broadcastMessage: (command: string, content: string) => void

}

export interface MempoolConfig<PeerAddrT> {
    maxOracles: number
    maxCapabilities: number
    maxReports: number
    maxConnections: number
    httpPort: number
    p2pPort: number
    p2pseed: PeerAddrT[]
    hostSeqNo?: number
    hostname?: string
    facilitatorId?: FacilitatorId
    lnRestHost?: string
    lnMacaroonPath?: string
}

const hash = (msg: string, algo: string): string => {
    return createHash(algo).update(msg).digest('hex')
}

const checkPow = (pow: HashCashPow, preimage: string): boolean => {
    if (!pow.hash.endsWith("0".repeat(pow.difficulty))) {
        return false
    }
    return hash(preimage, pow.algorithm) === pow.hash
}

const checkCapabilitySignature = (cp: OracleCapability): boolean => {
    const signature = cp.oracleSignature
    cp.oracleSignature = ""
    
    return createVerify(cp.oracleSignatureType).update(JSON.stringify(cp)).verify(Buffer.from(cp.oraclePubKey, 'base64'), Buffer.from(cp.oracleSignature, 'base64'))
}

const checkOracleRank = (cfg: MempoolConfig<any>, oracle: OracleId, mempool: Mempool): boolean => { 
    if (Object.keys(mempool.oracles).length > cfg.maxOracles) {
        const evict = Object.values(mempool.oracles).find(o => o.id.bid.amount <= oracle.bid.amount && o.id.pow.difficulty <= oracle.pow.difficulty)
        if (evict !== undefined ) {
            delete mempool.oracles[evict.id.pubkey]
            return true
        }
        return false
    }
    return true
}

const checkCapabilityRank = (cfg: MempoolConfig<any>, cp: OracleCapability, o: Oracle): boolean => {
    if (o.capabilies.length > cfg.maxCapabilities) {
        const index = o.capabilies.findIndex(c => c.pow.difficulty <= cp.pow.difficulty)
        if (index > -1) {
            o.capabilies.splice(index, 1)
            return true
        }
        return false
    }
    return true
}

const checkReportRank = (cfg: MempoolConfig<any>, report: Report, o: Oracle): boolean => {
    if (o.reports.length > cfg.maxReports) {
        const index = o.reports.findIndex(r => r.pow.difficulty <= report.content.pow.difficulty)
        if (index > -1) {
            o.reports.splice(index, 1)
            return true
        }
        return false
    }
    return true
}

const validateBid = async (cfg: MempoolConfig<any>, bid: Bid): Promise<boolean> => {
    if (cfg.lnRestHost === undefined || cfg.lnMacaroonPath === undefined || cfg.facilitatorId === undefined || cfg.facilitatorId.rewardAddress === undefined){
        return false
    }
    if (bid.paymentType === undefined || bid.paymentType === "lightning") {
        let options = {
            url: 'https://' + cfg.lnRestHost + '/v1/invoice/' + bid.proof,
            rejectUnauthorized: false,
            json: true,
            headers: {
              'Grpc-Metadata-macaroon': fs.readFileSync(cfg.lnMacaroonPath).toString('hex'),
            },
          }

        return new Promise<boolean>(function (resolve, reject) {
            request.get(options, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    if (body.payment_addr === cfg.facilitatorId?.rewardAddress && body.amt_paid_msat === bid.amount && body.state === "SETTLED") {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                } else {
                    reject(error);
                }
            })
        })
    }
    return false
}

const validateFact = (fact: Fact, req: FactRequest): boolean => {
    return createVerify(fact.signatureType).update(fact.factWithArguments).verify(req.capabilityPubKey, fact.signature)
}

export const api: Api = {
    mempool: {
        oracles: {}
    },
    announceOracle: async (cfg: MempoolConfig<any>, id: OracleId): Promise<Registered | NotRegistered> => {
        if (checkPow(id.pow, id.pubkey) || id.pow.difficulty == 0) {
            if (checkOracleRank(cfg, id, api.mempool)) {
                if (api.mempool.oracles[id.pubkey] === undefined) {
                    if (id.bid.amount == 0 || await validateBid(cfg, id.bid)) {
                        api.mempool.oracles[id.pubkey] = {
                            id,
                            capabilies: [],
                            reports: []
                        }
                        return "success"
                    } else {
                        return "low bid and/or pow difficulty"
                    }

                } else {
                    if (api.mempool.oracles[id.pubkey].id.seqNo < id.seqNo) {
                        api.mempool.oracles[id.pubkey].id.seqNo = id.seqNo
                        return "success"
                    } else {
                        return "duplicate"
                    }
                }
            } else {
                return "rank is too low"
            }
        } else {
            return "wrong pow"
        }

    },
    announceCapability: async (cfg: MempoolConfig<any>, cp: OracleCapability): Promise<Registered | NotRegistered> => {
        if (api.mempool.oracles[cp.oraclePubKey] === undefined) {
            return "no oracle found:" + cp.oraclePubKey
        }
        if (cp.pow.difficulty == 0 || checkCapabilitySignature(cp)) {
            if (cp.pow.difficulty == 0 || checkPow(cp.pow, cp.oracleSignature)) {
                if (checkCapabilityRank(cfg, cp, api.mempool.oracles[cp.oraclePubKey])) {
                    const found = api.mempool.oracles[cp.oraclePubKey].capabilies.find(x => x.question == cp.question)
                    if (found !== undefined) {
                        if (found.seqNo < cp.seqNo) {
                            found.seqNo = cp.seqNo
                            return "success"
                        } else {
                            return "duplicate"
                        }
                    }
                    api.mempool.oracles[cp.oraclePubKey].capabilies.push(cp)
                    return "success"
                } else {
                    return "low pow difficulty"
                }
            } else {
                return "wrong pow"
            }

        } else {
            return "wrong signature"
        }
    },
    reportMalleability: async (cfg: MempoolConfig<any>, report: Report): Promise<ReportAccepted | ReportRejected> => {
        if (api.mempool.oracles[report.oraclePubKey] === undefined) {
            return "no oracle found:" + report.oraclePubKey
        }
        if (!checkPow(report.content.pow, "TODO") && !(report.content.pow.difficulty == 0)) {
            return "wrong pow"
        }

        if (!checkReportRank(cfg, report, api.mempool.oracles[report.oraclePubKey])) {
            return "low pow difficulty"
        }
        const found = api.mempool.oracles[report.oraclePubKey].reports.find(x => x.pow.hash == report.content.pow.hash)
        if (found !== undefined) {
            if (found.seqNo < report.content.seqNo) {
                found.seqNo = report.content.seqNo
                return "success"
            } else {
                return "duplicate"
            }
        }
        api.mempool.oracles[report.oraclePubKey].reports.push(report.content)
        return "success"
    },
    disputeMissingfactClaim: async (dispute: Dispute): Promise<DisputeAccepted | DisputeRejected> => { //TODO add pow
        if (api.mempool.oracles[dispute.oraclePubKey] === undefined) {
            return "no oracle found:" + dispute.oraclePubKey
        }
        const oracle = api.mempool.oracles[dispute.oraclePubKey]
        if (!validateFact(dispute.fact, dispute.claim.request)) {
            return "invalid fact"
        }
        if (oracle !== undefined) {
            const found = api.mempool.oracles[oracle.id.pubkey].reports.find(x => x.type == "fact-missing" && x.pow.hash == dispute.claim.pow.hash)
            if (found !== undefined && found.type == 'fact-missing') {
                found.dispute = dispute.fact
                return "success"
            } else {
                return "not found"
            }
        } else {
            return "unknown oracle"
        }
    },
    lookupOracles: async (paging: PagingDescriptor, questions: string[]): Promise<OracleId[]> => {
        return Object.values(api.mempool.oracles)
            .sort((a, b) => a.id.bid.amount - b.id.bid.amount)
            .map(x => x.id)
            .slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
    },
    lookupCapabilities: async (paging: PagingDescriptor, oraclePub: string): Promise<OracleCapability[]> => {
        if (api.mempool.oracles[oraclePub] === undefined) {
            console.log("oracle not found " + oraclePub)
            return []
        }
        return api.mempool.oracles[oraclePub].capabilies.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)

    },
    lookupReports: async (paging: PagingDescriptor, oraclePub: string): Promise<MaleabilityReport[]> => {
        if (api.mempool.oracles[oraclePub] === undefined) {
            console.log("oracle not found " + oraclePub)
            return []
        }
        return api.mempool.oracles[oraclePub].reports.slice(paging.page * paging.chunkSize, (paging.page + 1) * paging.chunkSize)
    },

    proxify: async (req: FactRequest, uri: string): Promise<string> => {
        return ""
    }
}