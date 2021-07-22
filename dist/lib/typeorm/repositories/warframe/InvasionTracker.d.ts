import { BaseRepository } from "../../../structures";
import { InvasionTracker } from "../../models";
import type { EternityTextChannel } from "../../..";
import type { Item } from "../../models";
export declare class InvasionTrackerRepository extends BaseRepository<InvasionTracker> {
    findOrInsert(discordChannel: EternityTextChannel, onlyId?: boolean): Promise<InvasionTracker>;
    findByChannel(discordChannel: EternityTextChannel, onlyId?: boolean): Promise<InvasionTracker>;
    findByChannelQuery(discordChannel: EternityTextChannel): Promise<import("typeorm").SelectQueryBuilder<InvasionTracker>>;
    findItemsByChannel(discordChannel: EternityTextChannel): Promise<Item[]>;
}
