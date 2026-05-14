import type { Bot as InferredBot } from '@vanguard/discord-config/inferred-bot-types';

import type { CommandManager } from '#handlers/ComandManager.js';
import type { EventManager } from '#handlers/EventManager.js';

export interface Bot extends InferredBot {
	commandManager: CommandManager;
	eventManager: EventManager;
}
