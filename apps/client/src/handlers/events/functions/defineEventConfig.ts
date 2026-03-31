import type { BotEventNames } from '#bot/BotTypes.js';
import type { EventConfig } from '../EventTypes.js';

export function defineEventConfig<Name extends BotEventNames>(
	options: DefineEventConfigOptions<Name>,
): EventConfig<Name> {
	return options;
}

export interface DefineEventConfigOptions<Name extends BotEventNames> {
	name: Name;
}
