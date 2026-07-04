import { GatewayIntents } from '@discordeno/bot';

import { getEnvVariable } from '#utils/getEnvVariable.js';

export const BOT_INTENTS =
	GatewayIntents.GuildMembers |
	GatewayIntents.GuildMessages |
	GatewayIntents.GuildVoiceStates |
	GatewayIntents.Guilds |
	GatewayIntents.MessageContent;
export const BOT_TOKEN = getEnvVariable('BOT_TOKEN');
