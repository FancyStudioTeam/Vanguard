import { platform } from 'node:process';
import type { CreateGatewayManagerOptions } from '@discordeno/bot';
import { DISCORD_GATEWAY_INTENTS, DISCORD_TOKEN } from '#lib/Constants.js';
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

export const BOT_GATEWAY_MANAGER_PROPERTIES: BotGatewayManagerProperties = {
	browser: 'Discord Android',
	device: 'Discordeno',
	os: platform,
};

export const BOT_GATEWAY_MANAGER: BotGatewayManager = {
	compress: true,
	properties: BOT_GATEWAY_MANAGER_PROPERTIES,
};

export const BOT_INTENTS = DISCORD_GATEWAY_INTENTS;
export const BOT_TOKEN = DISCORD_TOKEN;

type BotDesiredProperties = DesiredProperties;

type BotGatewayManager = Omit<CreateGatewayManagerOptions, 'token'>;
type BotGatewayManagerProperties = BotGatewayManager['properties'];
