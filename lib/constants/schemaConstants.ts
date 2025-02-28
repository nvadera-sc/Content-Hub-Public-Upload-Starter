export const assetSchema = {
  properties:
  {
      description: "Description",
      isPublicUpload: "IsPublicUpload"
  },
  relations:
  {
      contentRepositoryToAsset: "ContentRepositoryToAsset",
      collectionToAsset: "CollectionToAsset",
  }
}

export const collectionSchema = {
  properties:
  {
      name: "ToolkitName",
  }
}