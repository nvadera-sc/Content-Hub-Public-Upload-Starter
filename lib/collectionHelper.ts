import { getEntityByIdentifierAsync } from "./entityHelper"

export const getCollectionAsync = async (collectionIdentifier: string) => {
  if (!collectionIdentifier)
    return;
  const collection = await getEntityByIdentifierAsync(collectionIdentifier);
  if (!collection || collection?.definitionName !== 'M.Collection') {
    console.warn(`Collection not found. Invalid identifier or no permissions'`);
    return null;
  }
  return collection;
}