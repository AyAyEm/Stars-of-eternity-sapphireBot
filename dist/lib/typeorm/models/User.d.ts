import { EternityBaseEntity } from "../../structures";
import type { Guild } from './Guild';
export declare class User extends EternityBaseEntity {
    id: string;
    name: string;
    guilds: Guild[];
}
