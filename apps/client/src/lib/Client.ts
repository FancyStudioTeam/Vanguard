import { createBot, GatewayIntents } from '@discordeno/bot';
import { getEnvVariable } from '#utils/getEnvVariable.js';

export const bot = createBot({
	intents:
		GatewayIntents.Guilds |
		GatewayIntents.GuildMembers |
		GatewayIntents.GuildMessages |
		GatewayIntents.GuildPresences |
		GatewayIntents.MessageContent,
	token: getEnvVariable('DISCORD_TOKEN'),
});
