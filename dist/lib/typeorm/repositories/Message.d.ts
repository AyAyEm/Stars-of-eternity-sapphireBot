import type { EntityManager } from 'typeorm';
import { BaseRepository } from "../../structures";
import { Message } from "../models";
import type { EternityMessage } from "../..";
export declare class MessageRepository extends BaseRepository<Message> {
    findOrInsert(discordMessage: EternityMessage, onlyId?: boolean): Promise<Message>;
    insert(discordMessage: EternityMessage, manager?: EntityManager): Promise<import("typeorm").InsertResult>;
    find(discordMessage: EternityMessage, onlyId?: boolean): Promise<Message>;
    findQuery(discordMessage: EternityMessage): import("typeorm").SelectQueryBuilder<Message>;
}
