import { platform } from 'node:process';
import type { CreateGatewayManagerOptions } from '@discordeno/bot';
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

export const BOT_GATEWAY_MANAGER_OPTIONS: BotGatewayManagerOptions = {
	compress: true,
	properties: BOT_GATEWAY_MANAGER_PROPERTIES,
};

type BotDesiredProperties = DesiredProperties;
type BotGatewayManagerOptions = Omit<CreateGatewayManagerOptions, 'token'>;
type BotGatewayManagerProperties = CreateGatewayManagerOptions['properties'];
