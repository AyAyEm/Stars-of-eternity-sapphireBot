import { BaseRepository } from "../../../structures";
import { FissureTracker } from "../../models";
import type { EternityTextChannel } from "../../..";
export declare class FissureTrackerRepository extends BaseRepository<FissureTracker> {
    private tiers;
    findOrInsertAll(discordChannel: EternityTextChannel, onlyId?: boolean): Promise<FissureTracker[]>;
    findOrInsert(discordChannel: EternityTextChannel, tier: number, onlyId?: boolean): Promise<FissureTracker>;
    findAll(discordChannel: EternityTextChannel, onlyId?: boolean): Promise<FissureTracker[]>;
    find(discordChannel: EternityTextChannel, tier: number, onlyId?: boolean): Promise<FissureTracker>;
    findQuery(discordChannel: EternityTextChannel, tier: number): import("typeorm").SelectQueryBuilder<FissureTracker>;
    delete(fissureTrackers: FissureTracker[]): Promise<import("typeorm").DeleteResult>;
}
