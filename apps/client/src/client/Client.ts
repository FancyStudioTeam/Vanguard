import { createBot as createClient } from '@discordeno/bot';
import { DISCORD_GATEWAY_INTENTS, DISCORD_TOKEN } from '#lib/Constants.js';
import { CLIENT_DESIRED_PROPERTIES, CLIENT_GATEWAY_MANAGER_PROPERTIES } from './ClientOptions.js';

export const client = createClient({
	desiredProperties: CLIENT_DESIRED_PROPERTIES,
	gateway: {
		compress: true,
		properties: CLIENT_GATEWAY_MANAGER_PROPERTIES,
	},
	intents: DISCORD_GATEWAY_INTENTS,
	token: DISCORD_TOKEN,
});

void (await client.start());
