import {Entity, Universe} from "./interfaces";

export function getTrivialEntities(universe: Universe, entities: Entity[]): Entity[] {
    let trivialEntities: Entity[] = [];
    for (let item of universe) {
        let count: number = 0;
        let possibleEntity: Entity | null = null;
        for (let entity of entities) {
            if (entity.items.includes(item)) {
                count++;
                possibleEntity = entity;
            }
        }
        if (count === 1) {
            if (possibleEntity == null) continue;

            if (trivialEntities.some(entity => entity.name === possibleEntity.name)) {
                continue;
            }

            trivialEntities.push(possibleEntity);
        }
    }
    return trivialEntities;
}