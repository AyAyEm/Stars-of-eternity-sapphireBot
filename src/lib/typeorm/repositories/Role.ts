import { EntityRepository, getConnection } from 'typeorm';

import type { Role as DiscordRole } from 'discord.js';

import { BaseRepository } from '#structures';
import { GuildRepository } from './Guild';
import { Role } from '#models';

import type { EternityGuild } from '#lib/extensions';

@EntityRepository(Role)
export class RoleRepository extends BaseRepository<Role> {
  public async findOrInsert(discordRole: DiscordRole, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const roleRepo = entityManager.getCustomRepository(RoleRepository);

      let role = await roleRepo.find(discordRole, onlyId);
      if (!role) {
        const guildRepo = entityManager.getCustomRepository(GuildRepository);
        const guild = await guildRepo.findOrInsert(discordRole.guild as EternityGuild, true);

        await roleRepo.createQueryBuilder('role')
          .insert()
          .values({ guild, id: discordRole.id, name: discordRole.name })
          .execute();

        role = await roleRepo.find(discordRole, onlyId);
      }

      return role;
    });
  }

  public async find(discordRole: DiscordRole, onlyId?: boolean) {
    if (onlyId) {
      return this.findQuery(discordRole)
        .select('role.id')
        .getOne();
    }

    return this.findQuery(discordRole).getOne();
  }

  public findQuery(discordRole: DiscordRole) {
    return this.createQueryBuilder('role')
      .where('role.id = :roleId', { roleId: discordRole.id });
  }
}
