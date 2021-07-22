import { BaseRepository } from "../../../structures";
import { Fissure } from "../../models";
import type { Fissure as WarframeFissure } from "../../../types/Warframe";
export declare class FissureRepository extends BaseRepository<Fissure> {
    findLatest(): Promise<Fissure>;
    insert(fissures: WarframeFissure[]): Promise<import("typeorm").InsertResult>;
}
