import { assetSchema } from "./constants/schemaConstants";
import { getDefaultCultureAsync } from "./cultureHelper";
import { getEntityAsync, saveEntityAsync } from "./entityHelper"

export const updateDescriptionAsync = async (assetId: number, description: string) => {
    const asset = await getEntityAsync(assetId);
    if(!asset)
        return;

    const defaultCulture = await getDefaultCultureAsync();
    if(!defaultCulture)
        return;

    asset.setPropertyValue(assetSchema.properties.description, description, defaultCulture);
    asset.setPropertyValue(assetSchema.properties.isPublicUpload, true);
    
    await saveEntityAsync(asset);
}