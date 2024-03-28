import { IEntityLoadConfiguration } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/querying/entity-load-configuration.js";
import { IEntity } from "@sitecore/sc-contenthub-webclient-sdk/dist/contracts/base/entity.js";
import { getClient } from "./clientHelper";

export const getEntityAsync = async (entityId: number, loadConfiguration?: IEntityLoadConfiguration) => 
{
    const client = await getClient();
    return await client.entities.getAsync(entityId, loadConfiguration);
}

export const saveEntityAsync = async (entity: IEntity) =>
{
    const client = await getClient();
    await client.entities.saveAsync(entity);
}