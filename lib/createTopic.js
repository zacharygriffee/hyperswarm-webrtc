import { Krypto, b4a } from "./reexport.js";

export function createTopic(info) {
    return Krypto.hash(b4a.from(info))
}