import { EternityBaseEntity } from "../../structures";
import type { Channel } from './Channel';
export declare class Message extends EternityBaseEntity {
    id: string;
    channel: Channel;
}
