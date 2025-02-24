# Content Hub Public Upload Starter

This is a starter project intended to help in the development of a publicly accessible upload capability for Sitecore Content Hub.

**⚠️⚠️⚠️ This proof of concept application does not contain any security and should not be used outside of a closed environment without modification.⚠️⚠️⚠️**

## Getting Started

First, you must create an OAuth client in your Content Hub instance for this app to use. This can be done by going to `/en-us/admin/oauthclients`.

Next, create a user that will be used for the actual uploading of the assets. It is best to have a dedicated user for this, so that assets uploaded via this app can be differentiated from others. It is recommended to give this user the minimum permissions required to upload assets by creating a new user group with the following permissions:

| Definition            | Conditions                                                 | Permissions  |
| ----------------------|------------------------------------------------------------|--------------|
| M.UploadConfiguration |                                                            | Read         |
| M.Asset               | M.Final.Lifecycle.Status = Created Created by current user | Update       |
| M.Asset, M.File       | Created by current user                                    | Read, Create |

Then configure the environment variables for this app via your preferred method (E.G. `.env`, `.env.local`).

| Variable                | Example Value                             | Description                                                        |
|-------------------------|-------------------------------------------|--------------------------------------------------------------------|
| CH_BASE_URL             | https://my-instance.sitecoresandbox.cloud | The base url of your Content Hub instance                          |
| CH_OAUTH_CLIENT_ID      | PublicUploadApp                           | The ClientId of the OAuth client you configured in Content Hub     |
| CH_OAUTH_CLIENT_SECRET  | MySup3rS3cr3tK3y!                         | The ClientSecret of the OAuth client you configured in Content Hub |
| CH_OAUTH_USERNAME       | PublicUploadUser                          | The Username of the user you created in Content Hub                |
| CH_OAUTH_PASSWORD       | MySup3rS3cr3tP455w0rd!                    | The Password of the user you created in Content Hub                |

Finally you can run the app using either `npm run start`, `npm run dev`, or using one of the pre-configured tasks in VSCode.

## Using the App

When opening the app, the users is presented with an upload screen to upload one, or multiple assets. These will be processed and uploaded to Content Hub. The description of the asset will be set to "Uploaded via Public Upload App in *path*", where *path* is the relative url of the page where the asset was uploaded, or "default". For example, if the user uploaded from `http://localhost:3000/my-campaign-folder`, the asset's description would be "Uploaded via Public Upload App in my-campaign-folder" and a new property 'IsPublicUpload' is set to true.

## 🚨 Important Considerations 🚨

Let me re-iterate this:

**⚠️⚠️⚠️ This proof of concept application does not contain any security and should not be used outside of a closed environment without modification.⚠️⚠️⚠️**

In practice allowing truly public access to your Content Hub instance is dangerous and should not be done. At the very least some form of authentication mechanism of must be added before use in the real world. You have been warned 🙂.

Additionally, the folder mechanism is purposely simple. In reality this should probably be either removed or extended such that the upload folders are linked to an entity in Content Hub, perhaps collections. If anyone feels like developing this, feel free to send a PR!

Blog reference: https://nickyvadera.com/blog/public-upload-in-content-hub
