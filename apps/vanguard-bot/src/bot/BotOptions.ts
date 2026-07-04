import { platform } from 'node:process';

import {
	DESIRED_PROPERTIES,
	DESIRED_PROPERTIES_BEHAVIOR,
} from '@vanguard/discord-config/desired-properties';

import type { CreateGatewayManagerOptions } from '@discordeno/bot';

import { BOT_INTENTS, BOT_TOKEN } from '#lib/Constants/Bot.js';

export const BOT_DESIRED_PROPERTIES = DESIRED_PROPERTIES;
export const BOT_DESIRED_PROPERTIES_BEHAVIOR = DESIRED_PROPERTIES_BEHAVIOR;

export const BOT_GATEWAY_MANAGER_PROPERTIES = {
	browser: 'Discord VR',
	device: 'Discordeno',
	os: platform,
} satisfies BotGatewayManagerProperties;

export const BOT_GATEWAY_MANAGER = {
	compress: true,
	properties: BOT_GATEWAY_MANAGER_PROPERTIES,
} satisfies BotGatewayManager;

export { BOT_INTENTS, BOT_TOKEN };

type BotGatewayManager = Omit<CreateGatewayManagerOptions, 'token'>;
type BotGatewayManagerProperties = BotGatewayManager['properties'];
