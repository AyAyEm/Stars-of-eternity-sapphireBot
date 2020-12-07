import { Event } from '@sapphire/framework';
import { EternityClient } from './EternityClient';
export declare abstract class EternityEvent<E extends string | number | symbol = ''> extends Event<E> {
    get client(): EternityClient;
}
