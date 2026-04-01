import { GatewayIntents } from '@discordeno/bot';
import { getEnvVariable } from '#utils/getEnvVariable.js';

export const DISCORD_GATEWAY_INTENTS =
	GatewayIntents.GuildMembers | GatewayIntents.Guilds | GatewayIntents.MessageContent;
export const DISCORD_TOKEN = getEnvVariable('DISCORD_TOKEN');
