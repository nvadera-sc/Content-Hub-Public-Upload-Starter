import { getClient } from "./clientHelper";
import { uploadAction, uploadConfiguration, uploadFinalizeUrl, uploadFormDataFileKey, uploadRequestResponseHeaderLocation, uploadRequestUrl } from "./constants/apiConstants";

export const uploadAsset = async (file: File) => 
{
    const uploadRequest = await getUploadUrl(file);
    if(!uploadRequest)
        return null;

    const uploadStatus = processUpload(uploadRequest.url, file);
    if(!uploadStatus)
        return null;

    const assetId = finalizeUpload(uploadRequest.content);
    if(!assetId)
        return null;

    return assetId;
}

const getUploadUrl = async (file: File) =>
{
    const uploadContent = {
        file_name: file.name,
        file_size: file.size,
        upload_configuration: {
            name: uploadConfiguration.AssetUpload
        },
        action: {
            name: uploadAction.NewAsset
        }
    };

    const client = await getClient();
    const response = await client.raw.postAsync(uploadRequestUrl, uploadContent);
    if(!response.isSuccessStatusCode)
        return null;
    return {
        url: response.responseHeaders[uploadRequestResponseHeaderLocation],
        content: response.content
    }
}

const processUpload = async (url: string, file: File) => {
    const formData = new FormData();
    formData.append(uploadFormDataFileKey, file, file.name);

    const requestOptions = {
        method: "POST",
        body: formData
    };

    const uploadResponse = await fetch(url, requestOptions);
    if(!uploadResponse.ok)
        return false;

    const responseJson = await uploadResponse.json();
    return responseJson.success;
}

const finalizeUpload = async (finalizeBody: any) => {
    const client = await getClient();
    const response = await client.raw.postAsync(uploadFinalizeUrl, finalizeBody);
    return response.isSuccessStatusCode ? (response.content as any).asset_id : false;
}