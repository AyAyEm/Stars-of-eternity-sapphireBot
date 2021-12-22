import { Ref } from '@typegoose/typegoose';
import { Item } from './Item';
export declare class InvasionTracker {
    items: Ref<Item>[];
    channel: string;
    enabled: boolean;
}
