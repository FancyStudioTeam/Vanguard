import { GatewayIntents } from '@discordeno/bot';
import { getEnvVariable } from '#utils/getEnvVariable.js';
import { reduceGatewayIntents } from '#utils/reduceGatewayIntents.js';

export const DISCORD_GATEWAY_INTENTS = reduceGatewayIntents(
	GatewayIntents.GuildMembers,
	GatewayIntents.Guilds,
	GatewayIntents.MessageContent,
);
export const DISCORD_TOKEN = getEnvVariable('DISCORD_TOKEN');
