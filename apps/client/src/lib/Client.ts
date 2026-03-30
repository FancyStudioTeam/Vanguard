import { createBot, GatewayIntents } from '@discordeno/bot';
import { DISCORD_CLIENT } from './Constants.js';

export const bot = createBot({
	desiredProperties: {
		user: {
			id: true,
			username: true,
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
