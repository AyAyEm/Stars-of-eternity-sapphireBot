import type { EntityManager } from 'typeorm';
import { BaseRepository } from "../../structures";
import { RoleReaction } from "../models";
import type { EternityMessage } from "../../extensions";
export declare class RoleReactionRepository extends BaseRepository<RoleReaction> {
    findOrInsert(insertOptions: RoleReactionRepository.InsertOptions, onlyId?: boolean): Promise<RoleReaction[]>;
    insert(options: RoleReactionRepository.InsertOptions, manager?: EntityManager): Promise<import("typeorm").InsertResult>;
    findByMessage(discordMessage: EternityMessage, onlyId?: boolean): Promise<RoleReaction[]>;
    findByMessageQuery(discordMessage: EternityMessage): import("typeorm").SelectQueryBuilder<RoleReaction>;
}
export declare namespace RoleReactionRepository {
    interface InsertOptions {
        discordMessage: EternityMessage;
        roleReaction: Map<string, string>;
    }
}
