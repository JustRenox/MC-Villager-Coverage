import fs from "fs";
import {Entity, rawEntity, Universe} from "./interfaces";
import {normalizeEntities} from "./normalizeEntities";
import {checkCoverage, checkEntityIntegrity} from "./preChecks";
import {getTrivialEntities} from "./getTrivialEntities";
import {selectRemainingEntities} from "./selectRemainingEntities";

const universe: Universe = JSON.parse(fs.readFileSync("./data/universe.json", "utf8"));
const rawEntities: rawEntity[] = JSON.parse(fs.readFileSync("./data/villagers.json", "utf8"));

//Normalize data
const entities: Entity[] = normalizeEntities(rawEntities);

//Check entity integrity
if (!checkEntityIntegrity(universe, entities)) {
    process.exit(1);
}
console.info("1. Checked entity integrity");

//Check if the universe can be covered
if (!checkCoverage(universe, entities, true)) {
    process.exit(1);
}
console.info("2. Checked if universe can be covered");

//Get the trivial entities that exclusively contain an item
const trivialEntities = getTrivialEntities(universe, entities);
console.info("3. Trivial entities found");

//Get remaining entities and items
let remainingEntities = entities.filter(entity => !trivialEntities.includes(entity));
const remainingItems = universe.filter(item => !trivialEntities.some(entity => entity.items.includes(item)));
console.info("4. Remaining entities and items found");

//Discard unnecessary entities (all items already covered by trivialEntities)
remainingEntities = remainingEntities.filter(entity => remainingItems.some(item => entity.items.includes(item)));
console.info("5. Unnecessary entities discarded");

//Bruteforce remaining entities by order of:
// 1. Total entities (fewer = better);
// 2. Total items (more = better);
let totalEntities = [...trivialEntities, ...selectRemainingEntities(remainingItems, remainingEntities)]
console.info("6. Created smallest assortment of entities for full coverage");

//While sorting for item name is possible from here on out, there isn't a lot of sense to it,
//as entities could possibly be trivial for more than 1 item, invalidating any kind of sorted system
//If still wished for, execute `totalEntities = getTrivialEntities(universe, totalEntities)`
// console.log(totalEntities = getTrivialEntities(universe, totalEntities))

//Sort by entity name
console.log("Villagers to keep:")
console.log(totalEntities.sort((a, b) => a.name.localeCompare(b.name)));
console.log("---------------------------")
console.log("Villagers to discard:")
console.log(entities.filter(entity => !totalEntities.includes(entity)).sort((a, b) => a.name.localeCompare(b.name)));