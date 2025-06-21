import {Entity, Universe} from "./interfaces";
import {checkCoverage} from "./preChecks";

export function selectRemainingEntities(remainingItems: Universe, remainingEntities: Entity[]): Entity[] {
    let smallestSet: Entity[] | null = null;
    let biggestSetSize: number = -Infinity;

    for (let i = 0; i < remainingItems.length; i++) {
        const possibleSets: Entity[][] = getPossibleSets(remainingEntities, i + 1);

        for (let set of possibleSets) {
            let doesCover: boolean = checkCoverage(remainingItems, set, false);
            if (!doesCover) continue;

            let currentSetSize: number = set.reduce((sum: number, entity: Entity) => sum + entity.items.length, 0);

            if (currentSetSize > biggestSetSize) {
                biggestSetSize = currentSetSize;
                smallestSet = set;
            }
        }

        if (smallestSet !== null) break;
    }

    return smallestSet === null ? remainingEntities : smallestSet;
}

// src: ChatGPT
function getPossibleSets<T>(array: T[], size: number): T[][] {
    const set: T[][] = [];

    function backtrack(start: number, combo: T[]) {
        if (combo.length === size) {
            set.push([...combo]);
            return;
        }

        for (let i = start; i < array.length; i++) {
            combo.push(array[i]);
            backtrack(i + 1, combo);
            combo.pop();
        }
    }

    backtrack(0, []);
    return set;
}