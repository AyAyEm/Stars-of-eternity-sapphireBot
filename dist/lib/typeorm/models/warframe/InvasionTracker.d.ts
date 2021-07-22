import { Channel } from "../Channel";
import { EternityBaseEntity } from "../../../structures";
import { Item } from './Item';
export declare class InvasionTracker extends EternityBaseEntity {
    id: number;
    items: Item[];
    channel: Channel;
    enabled: boolean;
}
