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

export const POSTGRES_DATABASE_HOST = getEnvVariable('POSTGRES_DATABASE_HOST');
export const POSTGRES_DATABASE_NAME = getEnvVariable('POSTGRES_DATABASE_NAME');
export const POSTGRES_DATABASE_PORT = Number(getEnvVariable('POSTGRES_DATABASE_PORT'));

export const POSTGRES_DATABASE_USER_NAME = getEnvVariable('POSTGRES_DATABASE_USER_NAME');
export const POSTGRES_DATABASE_USER_PASS = getEnvVariable('POSTGRES_DATABASE_USER_PASS');

export const VERSION = getPackageVersion();
