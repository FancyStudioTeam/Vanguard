import type { Bot as InferredBot } from '@vanguard/discord-config/inferred-types-bot';

import { createBot } from '@discordeno/bot';

import { CommandManager } from '#handlers/ComandManager.js';
import { EventManager } from '#handlers/EventManager.js';
import { logger } from '#lib/Logger.js';
import {
	BOT_DESIRED_PROPERTIES,
	BOT_DESIRED_PROPERTIES_BEHAVIOR,
	BOT_GATEWAY_MANAGER,
	BOT_INTENTS,
	BOT_TOKEN,
} from './BotOptions.js';

export const discordenoBot = createBot({
	desiredProperties: BOT_DESIRED_PROPERTIES,
	desiredPropertiesBehavior: BOT_DESIRED_PROPERTIES_BEHAVIOR,
	gateway: BOT_GATEWAY_MANAGER,
	intents: BOT_INTENTS,
	token: BOT_TOKEN,
});

export const bot = discordenoBot as Bot;

bot.commandManager = new CommandManager(bot);
bot.eventManager = new EventManager(bot);

await bot.commandManager.register();
await bot.eventManager.register();

bot.start().catch(logger.error);

export interface Bot extends InferredBot {
	commandManager: CommandManager;
	eventManager: EventManager;
}
