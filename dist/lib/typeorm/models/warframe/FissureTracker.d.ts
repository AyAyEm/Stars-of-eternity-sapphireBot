import { EternityBaseEntity } from "../../../structures";
import { Message } from "../Message";
import { Channel } from "../Channel";
export declare class FissureTracker extends EternityBaseEntity {
    id: number;
    message: Message;
    channel: Channel;
    enabled: boolean;
    tier: number;
}
