import type { Role as DiscordRole } from 'discord.js';
import { BaseRepository } from "../../structures";
import { Role } from "../models";
export declare class RoleRepository extends BaseRepository<Role> {
    findOrInsert(discordRole: DiscordRole, onlyId?: boolean): Promise<Role>;
    find(discordRole: DiscordRole, onlyId?: boolean): Promise<Role>;
    findQuery(discordRole: DiscordRole): import("typeorm").SelectQueryBuilder<Role>;
}
