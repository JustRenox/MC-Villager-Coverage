import {Universe, Entity} from "./interfaces";

export function checkEntityIntegrity(universe: Universe, entities: Entity[]): boolean {
    for (let entity of entities) {
        for (let item of entity.items) {
            if (!universe.includes(item)) {
                console.error(`Item \"${item}\" not in universe`);
                return false;
            }
        }
    }
    return true;
}

//Extra logging argument because the function is hijacked for testing if a set has full coverage of the remaining universe in "selectRemainingEntities.ts"
export function checkCoverage(universe: Universe, entities: Entity[], isPreCheck: boolean): boolean {
    for (let item of universe) {
        let covered: boolean = false;
        for (let entity of entities) {
            if (entity.items.includes(item)) {
                covered = true;
                break;
            }
        }
        if (!covered && isPreCheck) {
            console.error(`Item \"${item}\" not covered`);
            return false;
        }
    }
    return true;
}