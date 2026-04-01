import { Collection, createBot } from '@discordeno/bot';
import { CommandManager } from '#handlers/commands/CommandManager.js';
import { EventManager } from '#handlers/events/EventManager.js';
import { defineReadonlyProperty } from '#utils/defineReadonlyProperty.js';
import {
	BOT_DESIRED_PROPERTIES,
	BOT_GATEWAY_MANAGER,
	BOT_INTENTS,
	BOT_TOKEN,
} from './BotOptions.js';
import type { Bot } from './BotTypes.js';

export const discordenoBot = createBot({
	desiredProperties: BOT_DESIRED_PROPERTIES,
	gateway: BOT_GATEWAY_MANAGER,
	intents: BOT_INTENTS,
	token: BOT_TOKEN,
});
export const bot = discordenoBot as Bot;

defineReadonlyProperty(bot, 'commandManager', new CommandManager(bot));
defineReadonlyProperty(bot, 'eventManager', new EventManager(bot));

defineReadonlyProperty(bot, 'commands', {
	chatInput: new Collection(),
	messageContext: new Collection(),
	userContext: new Collection(),
});

const { commandManager, eventManager } = bot;

Promise.all([
	commandManager.initialize(),
	eventManager.initialize(),
]);

bot.start();
