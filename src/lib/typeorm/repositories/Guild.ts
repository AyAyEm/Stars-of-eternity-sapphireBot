import { EntityRepository, getConnection } from 'typeorm';

import { Guild as DiscordGuild } from 'discord.js';

import { BaseRepository } from '#structures';
import { Guild } from '#models';

@EntityRepository(Guild)
export class GuildRepo extends BaseRepository<Guild> {
  public async findOrInsert(discordGuild: DiscordGuild, onlyId: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const guildsRepo = entityManager.getCustomRepository(GuildRepo);
      let guild: Guild = await guildsRepo.find(discordGuild, onlyId);

      if (!guild) {
        await guildsRepo.createQueryBuilder()
          .insert()
          .into(Guild)
          .values([{ id: discordGuild.id }])
          .execute();

        guild = await guildsRepo.find(discordGuild, onlyId);
      }

      return guild;
    });
  }

  public async find(discordGuild: DiscordGuild, onlyId?: boolean) {
    if (onlyId) {
      return this.findQuery(discordGuild)
        .select('guild.id')
        .getOne();
    }

    return this.findQuery(discordGuild).getOne();
  }

  public findQuery(discordGuild: DiscordGuild) {
    return this.createQueryBuilder('guild')
      .where('guild.id = :guildId', { guildId: discordGuild.id });
  }
}
