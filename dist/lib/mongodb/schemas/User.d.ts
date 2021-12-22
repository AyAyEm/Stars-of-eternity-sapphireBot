import { Ref } from '@typegoose/typegoose';
import type { Guild } from './Guild';
export declare class User {
    _id: string;
    guilds: Ref<Guild, string>[];
}
