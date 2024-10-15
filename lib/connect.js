import Hyperswarm from "hyperswarm";
import HyperRTC from "hyper-webrtc";
import DHT from "@hyperswarm/dht-relay"
import Stream from "@hyperswarm/dht-relay/ws";
import {current_key_pair} from "./useKeyPair.js";

export function connect(url, config = {}) {
    const {
        hyperswarmConfig = {},
        dhtConfig = {}
    } = config;

    if (current_key_pair) {
        hyperswarmConfig.keyPair = current_key_pair;
    }

    const ws = new WebSocket(url);
    const dht = new DHT(new Stream(true, ws), dhtConfig);
    if (typeof RTCPeerConnection === "undefined") {
        console.warn("Not connected via webrtc")
        return new Hyperswarm({...hyperswarmConfig, dht});
    }
    return new HyperswarmWebRTC({...hyperswarmConfig, dht});
}

class HyperswarmWebRTC extends Hyperswarm {
    on(event, cb) {
        if (event !== "connection") {
            return super.on(event, cb);
        }
        return super.on("connection", (socket, peerInfo) => {
            const peer = HyperRTC.from(socket);
            return cb(peer, peerInfo);
        });
    }
}