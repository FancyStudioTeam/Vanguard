import type { BotEventNames, BotEvents } from '#bot/BotTypes.js';
import type { DefineEventConfigOptions } from './functions/defineEventConfig.js';

export type EventConfig<Name extends BotEventNames> = DefineEventConfigOptions<Name>;
export type EventHandler<Config extends EventConfig<BotEventNames>> = (
	// @ts-expect-error
	...data: Parameters<BotEvents[Config['name']]>
) => unknown;
