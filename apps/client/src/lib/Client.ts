import { platform } from 'node:process';
import { createBot, GatewayIntents } from '@discordeno/bot';
import { DISCORD_CLIENT } from './Constants.js';
import { logger } from './Logger.js';

export const bot = createBot({
	desiredProperties: {
		user: {
			id: true,
			username: true,
		},
	},
	events: {
		debug: (info) => logger.debug(info),
		ready: ({ user: { username } }) => logger.info(`Client '${username}' has been connected`),
	},
	gateway: {
		properties: {
			browser: 'Discord Android',
			device: 'Discordeno',
			os: platform,
		},
	},
	intents:
		GatewayIntents.Guilds |
		GatewayIntents.GuildMembers |
		GatewayIntents.GuildMessages |
		GatewayIntents.GuildPresences |
		GatewayIntents.MessageContent,
	token: DISCORD_CLIENT,
});
