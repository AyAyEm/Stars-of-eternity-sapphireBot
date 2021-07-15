import { EntityRepository, getConnection } from 'typeorm';

import { BaseRepository } from '#structures';
import { Guild } from '#models';

import type { EternityGuild } from '#lib';

@EntityRepository(Guild)
export class GuildRepository extends BaseRepository<Guild> {
  public async findOrInsert(discordGuild: EternityGuild, onlyId: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const guildsRepo = entityManager.getCustomRepository(GuildRepository);
      let guild: Guild = await guildsRepo.find(discordGuild, onlyId);

      if (!guild) {
        await guildsRepo.createQueryBuilder()
          .insert()
          .into(Guild)
          .values([{ snowflakeId: discordGuild.id }])
          .execute();

        guild = await guildsRepo.find(discordGuild, onlyId);
      }

      return guild;
    });
  }

  public async find(discordGuild: EternityGuild, onlyId?: boolean) {
    if (onlyId) {
      return this.findQuery(discordGuild)
        .select('guild.id')
        .getOne();
    }

    return this.findQuery(discordGuild).getOne();
  }

  public findQuery(discordGuild: EternityGuild) {
    return this.createQueryBuilder('guild')
      .where('guild.snowflakeId = :guildId', { guildId: discordGuild.id });
  }
}
