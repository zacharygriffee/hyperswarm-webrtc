import DHT from "@hyperswarm/dht-relay";
import {Krypto, b4a} from "./reexport.js";

export let current_key_pair;

export function useKeyPair(seedOrKeyPair, cb) {
    if (typeof seedOrKeyPair === "string") {
        Krypto.hash(b4a.from("hyperswarm-webrtc" + seedOrKeyPair));
    }
    current_key_pair = seedOrKeyPair?.secretKey ? seedOrKeyPair : DHT.keyPair(seedOrKeyPair);
    const response = cb();
    current_key_pair = null;
    return response;
}

