import { GatewayIntents } from '@discordeno/bot';

import { getEnvVariable } from '#utils/getEnvVariable.js';
import { getPackageVersion } from '#utils/getPackageVersion.js';

export const DISCORD_GATEWAY_INTENTS =
	GatewayIntents.GuildMembers | GatewayIntents.GuildMessages | GatewayIntents.Guilds | GatewayIntents.MessageContent;
export const DISCORD_TOKEN = getEnvVariable('DISCORD_TOKEN');

export const VERSION = getPackageVersion();
