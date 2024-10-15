export async function ensureWebRTC() {
    if (typeof window === 'undefined' && typeof process !== 'undefined') {
        // Node.js environment
        const windowEmbed = await import('@roamhq/wrtc');
        Object.assign(globalThis.window = {}, windowEmbed);
    }
}
