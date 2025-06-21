import {Entity, rawEntity} from "./interfaces";

export function normalizeEntities(entities: rawEntity[]): Entity[] {
    return entities.map((entity) => {
        return {
            name: entity.name,
            items: entity.enchantments
        };
    })
}