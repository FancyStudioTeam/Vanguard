import { createBot } from '@discordeno/bot';
import { CommandManager } from '#handlers/commands/CommandManager.js';
import { EventManager } from '#handlers/events/EventManager.js';
import { DISCORD_GATEWAY_INTENTS, DISCORD_TOKEN } from '#lib/Constants.js';
import { BOT_DESIRED_PROPERTIES, BOT_GATEWAY_MANAGER_PROPERTIES } from './BotOptions.js';
import type { Bot } from './BotTypes.js';

export const discordenoBot = createBot({
	desiredProperties: BOT_DESIRED_PROPERTIES,
	gateway: {
		compress: true,
		properties: BOT_GATEWAY_MANAGER_PROPERTIES,
	},
	intents: DISCORD_GATEWAY_INTENTS,
	token: DISCORD_TOKEN,
});
export const bot = discordenoBot as Bot;

Object.defineProperties(bot, {
	commandManager: {
		configurable: false,
		enumerable: false,
		value: new CommandManager(bot),
		writable: false,
	},
	eventManager: {
		configurable: false,
		enumerable: false,
		value: new EventManager(bot),
		writable: false,
	},
});

await Promise.allSettled([
	bot.commandManager.initialize(),
	bot.eventManager.initialize(),
]);

await bot.start();
