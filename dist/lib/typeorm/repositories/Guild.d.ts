import { BaseRepository } from "../../structures";
import { Guild } from "../models";
import type { EternityGuild } from "../..";
export declare class GuildRepository extends BaseRepository<Guild> {
    findOrInsert(discordGuild: EternityGuild, onlyId: boolean): Promise<Guild>;
    find(discordGuild: EternityGuild, onlyId?: boolean): Promise<Guild>;
    findQuery(discordGuild: EternityGuild): import("typeorm").SelectQueryBuilder<Guild>;
}
