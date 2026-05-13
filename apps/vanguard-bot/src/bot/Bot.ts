import { createBot } from '@discordeno/bot';

import { BOT_DESIRED_PROPERTIES, BOT_DESIRED_PROPERTIES_BEHAVIOR, BOT_GATEWAY_MANAGER, BOT_INTENTS, BOT_TOKEN } from './BotOptions.js';
import type { Bot } from './BotTypes.js';

export const discordenoBot = createBot({
	desiredProperties: BOT_DESIRED_PROPERTIES,
	desiredPropertiesBehavior: BOT_DESIRED_PROPERTIES_BEHAVIOR,
	gateway: BOT_GATEWAY_MANAGER,
	intents: BOT_INTENTS,
	token: BOT_TOKEN,
});

export const bot = discordenoBot as Bot;

bot.start();
