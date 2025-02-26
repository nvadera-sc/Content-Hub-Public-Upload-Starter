"use server"

import { getCollectionAsync } from "@/lib/collectionHelper";
import { updateAssetAsync } from "@/lib/assetHelper";
import { uploadActionFormDataKeys } from "@/lib/constants/formDataConstants";
import { uploadAsset } from "@/lib/uploadHelper"

export const processUploadFile = async (formData: FormData) => {
    const file = formData.get(uploadActionFormDataKeys.file);
    const path = formData.get(uploadActionFormDataKeys.path);
		const uploadToCollection = formData.get(uploadActionFormDataKeys.uploadToCollection) === "true";

    try {
				let collectionId;
				if (uploadToCollection) {
					let collection = await getCollectionAsync(path as string);
					if (collection == null) throw new Error("Collection not found");
					collectionId = collection.id;
				}
        const assetId = await uploadAsset(file as File);
        if(assetId) {
            const path = formData.get(uploadActionFormDataKeys.path);
            await updateAssetAsync(assetId, `Uploaded via Public Upload App in ${path}`, collectionId);

            return true;
        }
        return false;
    }
    catch (e) {
        console.warn("Exception occurred", e);
        return false;
    }
}