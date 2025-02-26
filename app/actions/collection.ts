"use server"

import { getCollectionAsync } from "@/lib/collectionHelper";
import { collectionSchema } from "@/lib/constants/schemaConstants";

export const getCollection = async (entityIdentifier: string) => {
		try {
				if (entityIdentifier == null || entityIdentifier.length === 0)
					return null;

				const collection = await getCollectionAsync(entityIdentifier[0]);
				if (!collection)
					return null;

				return {
						id: collection.id,
						name: collection.getPropertyValue(collectionSchema.properties.name) as string
				};
		}
		catch (e) {
				console.warn("Exception occurred while getting collection", e);
				return null;
		}
}