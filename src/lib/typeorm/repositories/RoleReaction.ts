/* eslint-disable import/export */
import { EntityRepository, getCustomRepository, getConnection } from 'typeorm';

import type { EntityManager } from 'typeorm';

import { BaseRepository } from '#structures';
import { RoleReaction } from '#models';
import { RoleRepository } from './Role';
import { MessageRepository } from './Message';

import type { EternityMessage } from '#lib/extensions';

@EntityRepository(RoleReaction)
export class RoleReactionRepository extends BaseRepository<RoleReaction> {
  public async findOrInsert(insertOptions: RoleReactionRepository.InsertOptions, onlyId?: boolean) {
    return getConnection().transaction(async (manager) => {
      const roleReactionRepo = manager.getCustomRepository(RoleReactionRepository);

      let roleReaction = await roleReactionRepo.findByMessage(insertOptions.discordMessage, onlyId);
      if (!roleReaction) {
        await roleReactionRepo.insert(insertOptions, manager);

        roleReaction = await roleReactionRepo.findByMessage(insertOptions.discordMessage, onlyId);
      }

      return roleReaction;
    });
  }

  public async insert(options: RoleReactionRepository.InsertOptions, manager?: EntityManager) {
    const { discordMessage, roleReaction } = options;
    const getRepo = manager ? manager.getCustomRepository : getCustomRepository;

    const roleReactions = [...roleReaction.entries()];
    const toInsert = await Promise.all(roleReactions.map(async ([discordRoleId, reaction]) => {
      const roleRepo = getRepo(RoleRepository);
      const discordRole = await discordMessage.guild.roles.fetch(discordRoleId);
      const role = await roleRepo.findOrInsert(discordRole, true);

      const messageRepo = getRepo(MessageRepository);
      const message = await messageRepo.findOrInsert(discordMessage, true);

      return { role, message, emoji: reaction };
    }));

    return this.createQueryBuilder('roleReaction')
      .insert()
      .values(toInsert)
      .execute();
  }

  public async findByMessage(discordMessage: EternityMessage, onlyId?: boolean) {
    if (onlyId) {
      return this.findByMessageQuery(discordMessage)
        .select('roleReaction.id')
        .getMany();
    }

    return this.findByMessageQuery(discordMessage).getMany();
  }

  public findByMessageQuery(discordMessage: EternityMessage) {
    return this.createQueryBuilder('roleReaction')
      .leftJoinAndSelect('roleReaction.role', 'role')
      .leftJoinAndSelect('roleReaction.emoji', 'emoji')
      .leftJoinAndSelect('roleReaction.message', 'message')
      .where('message.id = :messageId', { messageId: discordMessage.id });
  }
}

export namespace RoleReactionRepository {
  export interface InsertOptions {
    discordMessage: EternityMessage;
    roleReaction: Map<string, string>;
  }
}
