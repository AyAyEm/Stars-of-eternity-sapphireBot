import { ApplyOptions } from '@sapphire/decorators';

import { Task, TaskOptions } from '#lib/structures';

@ApplyOptions<TaskOptions>({ time: 10000, once: true })
export default class extends Task {
  public async run() {  
    this.container.client.emit('initialTasksCompleted');
  }
}
