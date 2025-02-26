import { getEntityByIdentifierAsync } from "./entityHelper"

export const getCollectionAsync = async (collectionIdentifier: string) => {
	if (!collectionIdentifier)
		return;
	let collection = await getEntityByIdentifierAsync(collectionIdentifier);
	if (!collection) {
		console.warn(`Collection not found. Invalid identifier or no permissions'`);
	}
	return collection;
}