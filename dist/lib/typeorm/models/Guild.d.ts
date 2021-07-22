import { EternityBaseEntity } from "../../structures";
import type { User } from './User';
import type { Channel } from './Channel';
export declare class Guild extends EternityBaseEntity {
    id: string;
    users: User[];
    channels: Channel[];
}
