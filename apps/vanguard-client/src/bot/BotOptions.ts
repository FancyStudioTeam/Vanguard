import { platform } from 'node:process';

import { DESIRED_PROPERTIES, DESIRED_PROPERTIES_BEHAVIOR } from '@vanguard/discord-desired-properties';

import { ActivityTypes, type CreateGatewayManagerOptions } from '@discordeno/bot';

import { CLIENT_GATEWAY_INTENTS, CLIENT_TOKEN } from '#lib/Constants.js';

export const BOT_DESIRED_PROPERTIES = DESIRED_PROPERTIES;
export const BOT_DESIRED_PROPERTIES_BEHAVIOR = DESIRED_PROPERTIES_BEHAVIOR;

export const BOT_GATEWAY_MANAGER_PROPERTIES = {
	browser: 'Discord Android',
	device: 'Discordeno',
	os: platform,
} satisfies BotGatewayManagerProperties;

export const BOT_GATEWAY_MANAGER = {
	compress: true,
	makePresence: async () => ({
		activities: [
			{
				name: '-',
				state: '🌹 vanguard.fancystudio.xyz',
				type: ActivityTypes.Custom,
			},
		],
		afk: false,
		since: null,
		status: 'online',
	}),
	properties: BOT_GATEWAY_MANAGER_PROPERTIES,
} satisfies BotGatewayManager;

export const BOT_INTENTS = CLIENT_GATEWAY_INTENTS;
export const BOT_TOKEN = CLIENT_TOKEN;

type BotGatewayManager = Omit<CreateGatewayManagerOptions, 'token'>;
type BotGatewayManagerProperties = BotGatewayManager['properties'];
