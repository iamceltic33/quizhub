export interface ShakerData {
    props: {
        pageProps: {
            store: [string, unknown][]
        }
    }
}

interface Game {
    event_time: string
    name: string
    status: 'Publish' | 'Finish'
}

export function isGameArray(prop: unknown): prop is [string, Game[]] {
    if (!Array.isArray(prop)) return false;
    return prop.length > 1 && prop[0] === 'GET/games/search'
}