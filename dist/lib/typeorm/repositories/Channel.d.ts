import { BaseRepository } from "../../structures";
import { Channel } from "../models";
import type { EternityTextChannel } from "../..";
export declare class ChannelRepository extends BaseRepository<Channel> {
    findOrInsert(discordChannel: EternityTextChannel, onlyId?: boolean): Promise<Channel>;
    find(discordChannel: EternityTextChannel, onlyId?: boolean): Promise<Channel>;
    findQuery(discordChannel: EternityTextChannel): import("typeorm").SelectQueryBuilder<Channel>;
}
