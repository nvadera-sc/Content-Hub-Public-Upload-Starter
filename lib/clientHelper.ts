import OAuthPasswordGrant from "@sitecore/sc-contenthub-webclient-sdk/dist/authentication/oauth-password-grant.js";
import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client.js";
import { getCachedValueAsync } from "./cacheHelper";
import { clientCacheKey } from "./constants/cacheConstants";

const baseUrl = process.env.CH_BASE_URL ?? "";
const oauthClientId = process.env.CH_OAUTH_CLIENT_ID ?? "";
const oauthClientSecret = process.env.CH_OAUTH_CLIENT_SECRET ?? "";
const oauthUsername = process.env.CH_OAUTH_USERNAME ?? "";
const oauthPassword = process.env.CH_OAUTH_PASSWORD ?? "";
const clientTokenExpiry = parseInt(process.env.CH_TOKEN_EXPIRY ?? "2700");

export const getClient = async () : Promise<ContentHubClient> => {
    return await getCachedValueAsync(clientCacheKey, generateClient, clientTokenExpiry);
}

const generateClient = async () => {
    const oauth = new OAuthPasswordGrant(
        oauthClientId,
        oauthClientSecret,
        oauthUsername,
        oauthPassword
    );
    const _client = new ContentHubClient(baseUrl, oauth);

    await _client.internalClient.authenticateAsync();

    return _client;
}