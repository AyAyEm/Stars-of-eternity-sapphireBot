import { BaseStore } from '@sapphire/framework';
import type { EternityClient } from '@lib';
import { Task } from './Task';
export declare class TaskStore extends BaseStore<Task> {
    constructor(client: EternityClient);
}
