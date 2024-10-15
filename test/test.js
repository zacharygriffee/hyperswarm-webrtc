import {ensureWebRTC} from "./ensureWebRTC.js";

import {test} from "brittle";
import b4a from "b4a";
import Krypto from "hypercore-crypto";
import ws from "ws";

ensureWebRTC().then(async () => {
    try {
        await doTest(import("../dist/index.min.js"));
        await doTest(import("../index.js"));
    } catch (e) {
        console.error(e);
    }
})

const wsurl = process.env.WS_URL || "wss://ahgg-dht.us-3.evennode.com";
const topic = b4a.alloc(32, b4a.from("s"));
globalThis.WebSocket = ws;
const kp1 = Krypto.hash(b4a.from(wsurl + "##1!"));
const kp2 = Krypto.hash(b4a.from(wsurl + "##2!"));

async function doTest(entry) {
    const {connect, useKeyPair} = await entry;
    test("connect", {timeout: 600000}, t => {
        t.plan(1);
        const socket1 = useKeyPair(kp1,
            () => connect(wsurl, {
                hyperswarmConfig: {ephemeral: false}
            })
        );
        const socket2 = useKeyPair(kp2,
            () => connect(wsurl, {
                hyperswarmConfig: {ephemeral: false}
            })
        );

        socket1.on("connection", peer => {
            t.ok(b4a.equals(peer.remotePublicKey, socket2.keyPair.publicKey));
        });

        socket1.join(topic, {server: true, client: false});
        socket2.join(topic, {client: true, server: false});

        t.teardown(() => {
            socket1.destroy();
            socket2.destroy();
        });
    });
}

