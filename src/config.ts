import * as dotenv from 'dotenv';

export const timezone = 'America/Sao_Paulo';

const env = dotenv.config().parsed;
export const config = {
  ownersIds: ['163751711532515329'],
  token: env.DISCORD_TOKEN || '',
};
