import Sandbox from "@nyariv/sandboxjs";
import { Dsl } from "../dsl";

declare global {
    interface Window {
        evalDiscreet: (expression: string, parties: string[], bounds: [number, number][]) => Promise<any>
    }
}

export const evalDiscreet = async (expression: string, parties: string[], bounds: [number, number][]): Promise<any> => {
    
    const model = await (new Dsl(async dsl => {
        const prototypeWhitelist = Sandbox.SAFE_PROTOTYPES;
        const globals = {...Sandbox.SAFE_GLOBALS, alert};
        prototypeWhitelist.set(Dsl, new Set());

        const sandbox = new Sandbox({globals, prototypeWhitelist})
        const exec = sandbox.compile(expression)
    
        exec({dsl, Dsl}).run()
    }).multiple(...parties).enumerateWithBoundMulti(bounds))
    return model
}

window.evalDiscreet = evalDiscreet