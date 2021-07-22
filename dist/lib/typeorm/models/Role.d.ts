import { EternityBaseEntity } from "../../structures";
import { Guild } from './Guild';
export declare class Role extends EternityBaseEntity {
    id: string;
    name: string;
    guild: Guild;
}
