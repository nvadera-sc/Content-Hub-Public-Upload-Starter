import NodeCache from "node-cache";

const stdTTL = 900
const cache = new NodeCache({stdTTL: stdTTL});

export const getCachedValueAsync = async <T>(key: string, getValueAsyncFunc: () => Promise<T>, ttl?: number) => {
    const cachedValue = cache.get(key);
    if (cachedValue !== undefined && cachedValue !== null) {
        return cachedValue as T;
    }
    const fallbackValue = await getValueAsyncFunc();
    cache.set(key, fallbackValue, ttl ?? stdTTL);
    return fallbackValue;
}