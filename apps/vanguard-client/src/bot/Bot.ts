import { createBot } from '@discordeno/bot';
import { createEnhancedBot, type ParseDesiredProperties, type ParseDesiredPropertiesBehavior } from 'ddenox';
import { isProductionEnvironment } from '#utils/isProductionEnvironment.js';
import { BOT_DESIRED_PROPERTIES, BOT_GATEWAY_MANAGER, BOT_INTENTS, BOT_TOKEN } from './BotOptions.js';
import type { Bot } from './BotTypes.js';

export const discordenoBot = createBot({
	desiredProperties: BOT_DESIRED_PROPERTIES,
	gateway: BOT_GATEWAY_MANAGER,
	intents: BOT_INTENTS,
	token: BOT_TOKEN,
});
export const enhancedBot = createEnhancedBot(discordenoBot, {
	locations: {
		commands: 'commands',
		events: 'events',
		root: isProductionEnvironment() ? 'dist' : 'src',
	},
});

export const bot = enhancedBot as Bot;

bot.commandManager.register();
bot.eventManager.register();

bot.start();

declare module 'ddenox' {
	interface BotConfiguration {
		desiredProperties: ParseDesiredProperties<Bot>;
		desiredPropertiesBehavior: ParseDesiredPropertiesBehavior<Bot>;
	}
}
