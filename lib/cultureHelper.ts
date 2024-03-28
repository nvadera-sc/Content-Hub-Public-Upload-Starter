import { getCachedValueAsync } from "./cacheHelper";
import { getClient } from "./clientHelper";
import { culturesCacheKey, defaultCultureCacheKey } from "./constants/cacheConstants";

export const getCulturesAsync = async () => {
    return await getCachedValueAsync(culturesCacheKey, getCulturesDataAsync);
}

export const getDefaultCultureAsync = async () => {
    return await getCachedValueAsync(defaultCultureCacheKey, getDefaultCultureDataAsync);
}

const getCulturesDataAsync = async () => {
    const client = await getClient();
    return await client.cultures.getAllCulturesAsync();
}

const getDefaultCultureDataAsync = async () => {
    const client = await getClient();
    return await client.cultures.getDefaultCultureAsync();
}