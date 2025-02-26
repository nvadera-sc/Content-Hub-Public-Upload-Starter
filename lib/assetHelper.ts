import { assetSchema } from "./constants/schemaConstants";
import { standardContentRepositoryId } from "./constants/apiConstants";
import { getDefaultCultureAsync } from "./cultureHelper";
import { getEntityAsync, saveEntityAsync } from "./entityHelper"
import { EntityLoadConfiguration } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/entity-load-configuration";
import { CultureLoadOption } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/culture-load-option";
import { PropertyLoadOption } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/property-load-option";
import { RelationLoadOption } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/relation-load-option";

export const updateAssetAsync = async (assetId: number, description: string, collectionId?: number) => {
    const defaultCulture = await getDefaultCultureAsync();
    if(!defaultCulture)
        return;

    const elc = new EntityLoadConfiguration(new CultureLoadOption([defaultCulture]),
																						PropertyLoadOption.All,
																						new RelationLoadOption([
																							assetSchema.relations.contentRepositoryToAsset,
																							assetSchema.relations.collectionToAsset
																						]));

		const asset = await getEntityAsync(assetId, elc);
    if(!asset)
        return;

    asset.setPropertyValue(assetSchema.properties.description, description, defaultCulture);
		if (asset.properties.filter(p => p.name === assetSchema.properties.isPublicUpload).length > 0) {
			asset.setPropertyValue(assetSchema.properties.isPublicUpload, true);
		}

		let contentRepo = asset.getRelation(assetSchema.relations.contentRepositoryToAsset);
		contentRepo?.setIds([standardContentRepositoryId]);

		if (collectionId) {
			let collection = asset.getRelation(assetSchema.relations.collectionToAsset);
			collection?.setIds([collectionId]);
		}

    await saveEntityAsync(asset);
}