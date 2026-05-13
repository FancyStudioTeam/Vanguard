import { GatewayIntents } from '@discordeno/bot';

import { getEnvVariable } from '#utils/getEnvVariable.js';
import { getPackageVersion } from '#utils/getPackageVersion.js';

export const CLIENT_GATEWAY_INTENTS =
	GatewayIntents.GuildMembers | GatewayIntents.GuildMessages | GatewayIntents.Guilds | GatewayIntents.MessageContent;
export const CLIENT_TOKEN = getEnvVariable('CLIENT_TOKEN');

export const VERSION = getPackageVersion();
