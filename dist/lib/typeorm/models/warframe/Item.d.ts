import { EternityBaseEntity } from "../../../structures";
import { Guild } from "../Guild";
import { User } from "../User";
export declare class Item extends EternityBaseEntity {
    id: number;
    name: string;
    guilds: Guild[];
    users: User[];
}
