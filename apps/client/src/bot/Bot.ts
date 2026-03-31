import { createBot } from '@discordeno/bot';
import { Collection } from '@discordjs/collection';
import { CommandManager } from '#handlers/commands/CommandManager.js';
import { EventManager } from '#handlers/events/EventManager.js';
import { DISCORD_GATEWAY_INTENTS, DISCORD_TOKEN } from '#lib/Constants.js';
import { defineReadonlyProperty } from '#utils/defineReadonlyProperty.js';
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

defineReadonlyProperty(bot, 'commandManager', new CommandManager(bot));
defineReadonlyProperty(bot, 'eventManager', new EventManager(bot));

defineReadonlyProperty(bot, 'commands', {
	chatInput: new Collection(),
});

await Promise.allSettled([
	bot.commandManager.initialize(),
	bot.eventManager.initialize(),
]);

await bot.start();
