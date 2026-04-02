import { env } from 'node:process';
import { GatewayIntents } from '@discordeno/bot';
import { getEnvVariable } from '#utils/getEnvVariable.js';
import { getPackageVersion } from '#utils/getPackageVersion.js';

const { NODE_ENV } = env;

export const DISCORD_GATEWAY_INTENTS =
	GatewayIntents.GuildMembers | GatewayIntents.Guilds | GatewayIntents.MessageContent;
export const DISCORD_TOKEN = getEnvVariable('DISCORD_TOKEN');

export const IS_PRODUCTION_ENVIRONMENT = String(NODE_ENV).toLowerCase() === 'production';

export const VERSION = getPackageVersion();
