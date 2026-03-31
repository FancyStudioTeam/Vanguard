import { platform } from 'node:process';
import type { CreateGatewayManagerOptions } from '@discordeno/bot';
import {
	DESIRED_GUILD_PROPERTIES,
	DESIRED_MESSAGE_PROPERTIES,
	DESIRED_USER_PROPERTIES,
	type DesiredProperties,
} from './ClientDesiredProperties.js';

export const CLIENT_DESIRED_PROPERTIES: ClientDesiredProperties = {
	guild: DESIRED_GUILD_PROPERTIES,
	message: DESIRED_MESSAGE_PROPERTIES,
	user: DESIRED_USER_PROPERTIES,
};

export const CLIENT_GATEWAY_MANAGER_PROPERTIES: ClientGatewayManagerProperties = {
	browser: 'Discord Android',
	device: 'Discordeno',
	os: platform,
};

type ClientGatewayManagerProperties = CreateGatewayManagerOptions['properties'];
type ClientDesiredProperties = DesiredProperties;
