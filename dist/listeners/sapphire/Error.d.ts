import { Listener } from '@sapphire/framework';
export default class extends Listener {
    run(err: Error): Promise<void>;
}
