import { GatewayIntents } from '@discordeno/bot';

import { getEnvVariable } from '#utils/getEnvVariable.js';
import { getPackageVersion } from '#utils/getPackageVersion.js';

export const BOT_INTENTS =
	GatewayIntents.GuildMembers |
	GatewayIntents.GuildMessages |
	GatewayIntents.GuildVoiceStates |
	GatewayIntents.Guilds |
	GatewayIntents.MessageContent;
export const BOT_TOKEN = getEnvVariable('BOT_TOKEN');

export const VERSION = getPackageVersion();
