import { platform } from 'node:process';
import type { CreateGatewayManagerOptions } from '@discordeno/bot';
import {
	DESIRED_GUILD_PROPERTIES,
	DESIRED_MESSAGE_PROPERTIES,
	DESIRED_USER_PROPERTIES,
	type DesiredProperties,
} from './BotDesiredProperties.js';

export const BOT_DESIRED_PROPERTIES: BotDesiredProperties = {
	guild: DESIRED_GUILD_PROPERTIES,
	message: DESIRED_MESSAGE_PROPERTIES,
	user: DESIRED_USER_PROPERTIES,
};

export const BOT_GATEWAY_MANAGER_PROPERTIES: BotGatewayManagerProperties = {
	browser: 'Discord Android',
	device: 'Discordeno',
	os: platform,
};

type BotGatewayManagerProperties = CreateGatewayManagerOptions['properties'];
type BotDesiredProperties = DesiredProperties;
