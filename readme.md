# HyperswarmRTC (Experimental)

This repository provides a custom implementation combining `Hyperswarm`, `hyper-webrtc`, and `@hyperswarm/dht-relay` to create a peer-to-peer networking interface over a DHT and WebRTC. This setup allows for decentralized communication, peer discovery, and WebRTC connectivity using DHT relays.

## Experimental Disclaimer

This project is currently experimental and not intended for production use.

## Features
- Peer-to-peer networking using `Hyperswarm`.
- WebRTC connectivity for establishing direct communication between peers.
- DHT relay for enhanced peer discovery.
- Reexports hypercore-crypto and b4a for dependency management.

## Getting Started

### Install

```bash
npm install hyperswarm-webrtc
```

## Usage

### Connecting to a Peer

The `connect` function establishes a connection to a peer using `hyperswarm` and the DHT relay:

- **Parameters**:
    - `url`: The WebSocket URL to connect to.
    - `config` (optional): An object that includes configuration for `hyperswarm`, `DHT`, and WebSocket.
- **Functionality**:
    - Initializes a WebSocket with the provided URL and configuration.
    - Creates a new `DHT` instance using the WebSocket stream.
    - Returns a `Hyperswarm` instance using the DHT and hyperswarm configuration.

### Example Usage

Here is an example of how you can use the provided functions:

```javascript
import { useKeyPair, connect } from "hyperswarm-webrtc";

// Using a key pair and connecting to a peer
const webRtcSwarm = useKeyPair(mySeedOrKeyPair, () => {
    return connect("wss://my-dht-server.com", {
        hyperswarmConfig: {},
        dhtConfig: {},
        wsConfig: {}
    });
});

webRtcSwarm.on("connection", (peer, peerInfo) => {
    console.log("Connected to peer:", peerInfo);
    peer.write("Hello, peer!");
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

