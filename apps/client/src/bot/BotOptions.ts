import { platform } from 'node:process';
import { ActivityTypes, type CreateGatewayManagerOptions } from '@discordeno/bot';
import { DISCORD_GATEWAY_INTENTS, DISCORD_TOKEN, VERSION } from '#lib/Constants.js';
import {
	DESIRED_GUILD_PROPERTIES,
	DESIRED_INTERACTION_PROPERTIES,
	DESIRED_MESSAGE_PROPERTIES,
	DESIRED_USER_PROPERTIES,
	type DesiredProperties,
} from './BotDesiredProperties.js';

export const BOT_DESIRED_PROPERTIES = {
	guild: DESIRED_GUILD_PROPERTIES,
	interaction: DESIRED_INTERACTION_PROPERTIES,
	message: DESIRED_MESSAGE_PROPERTIES,
	user: DESIRED_USER_PROPERTIES,
} satisfies BotDesiredProperties;

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
				state: `🟢 v${VERSION} | 🌹 vanguard.fancystudio.xyz`,
				type: ActivityTypes.Custom,
			},
		],
		afk: false,
		since: null,
		status: 'online',
	}),
	properties: BOT_GATEWAY_MANAGER_PROPERTIES,
} satisfies BotGatewayManager;

export const BOT_INTENTS = DISCORD_GATEWAY_INTENTS;
export const BOT_TOKEN = DISCORD_TOKEN;

type BotDesiredProperties = DesiredProperties;

type BotGatewayManager = Omit<CreateGatewayManagerOptions, 'token'>;
type BotGatewayManagerProperties = BotGatewayManager['properties'];
