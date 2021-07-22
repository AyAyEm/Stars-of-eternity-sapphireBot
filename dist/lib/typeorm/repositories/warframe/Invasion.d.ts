import { BaseRepository } from "../../../structures";
import { Invasion } from "../../models";
import type { InvasionData } from "../../../types/Warframe";
export declare class InvasionRepository extends BaseRepository<Invasion> {
    findLatest(): Promise<Invasion>;
    insert(invasions: InvasionData[]): Promise<import("typeorm").InsertResult>;
}
