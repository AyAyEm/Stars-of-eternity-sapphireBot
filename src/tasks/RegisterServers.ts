import { Task, TaskOptions } from '@lib/structures';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<TaskOptions>({ time: 10000, once: true, enabled: false })
export default class extends Task {
  public async run() { }
}
