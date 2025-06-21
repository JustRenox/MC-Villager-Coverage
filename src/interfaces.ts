interface Entity {
    name: string;
    items: string[];
}

export interface rawEntity {
    name: string;
    enchantments: string[];
}

type Universe = string[];

export {Entity, Universe};