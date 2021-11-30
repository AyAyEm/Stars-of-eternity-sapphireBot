import { EntityRepository, getConnection } from 'typeorm';

import type { Role as DiscordRole } from 'discord.js';

import { BaseRepository } from '#structures';
import { GuildRepo } from './Guild';
import { Role } from '#models';

@EntityRepository(Role)
export class RoleRepo extends BaseRepository<Role> {
  public async findOrInsert(discordRole: DiscordRole, onlyId?: boolean) {
    return getConnection().transaction(async (entityManager) => {
      const roleRepo = entityManager.getCustomRepository(RoleRepo);

      let role = await roleRepo.find(discordRole, onlyId);
      if (!role) {
        const guildRepo = entityManager.getCustomRepository(GuildRepo);
        const guild = await guildRepo.findOrInsert(discordRole.guild, true);

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
