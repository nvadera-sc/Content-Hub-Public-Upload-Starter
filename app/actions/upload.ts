"use server"

import { updateDescriptionAsync } from "@/lib/assetHelper";
import { UploadActionFormDataKeys } from "@/lib/constants/formDataConstants";
import { uploadAsset } from "@/lib/uploadHelper"

export const processUploadFile = async (formData: FormData) => {
    const file = formData.get(UploadActionFormDataKeys.file);
    try {
        const assetId = await uploadAsset(file as File);
        if(assetId) {
            const path = formData.get(UploadActionFormDataKeys.path);
            await updateDescriptionAsync(assetId, `Uploaded via Public Upload App in ${path}`);

            return true;
        }
        return false;
    }
    catch (e) {
        console.warn("Exception occurred", e);
        return false;
    }
}