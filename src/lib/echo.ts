import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Это сообщает TypeScript, что в объекте window появятся новые свойства
declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: Echo<'reverb'>;
    }
}

type BroadcasterType = 'reverb';

export const createEchoInstance = (token?: string) => {
    if (typeof window === 'undefined') return null;

    const appKey = process.env.NEXT_PUBLIC_WS_KEY;
    const host = process.env.NEXT_PUBLIC_WS_HOST;
    const port = process.env.NEXT_PUBLIC_WS_PORT;
    const scheme = process.env.NEXT_PUBLIC_WS_SCHEME;

    if (!appKey) return null;

    // Теперь ошибки "Property Pusher does not exist" не будет
    window.Pusher = Pusher;

    return new Echo<BroadcasterType>({
        broadcaster: 'reverb',
        key: appKey,
        wsHost: host,
        wsPort: Number(port),
        wssPort: Number(port),
        forceTLS: false,
        enabledTransports: ['ws', 'wss'],
        // authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/broadcasting/auth`,
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        },
    });
};