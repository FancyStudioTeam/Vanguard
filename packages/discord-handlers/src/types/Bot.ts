import type { DESIRED_PROPERTIES, DESIRED_PROPERTIES_BEHAVIOR } from '@vanguard/discord-desired-properties';

import type { CompleteDesiredProperties, Bot as DiscordenoBot } from '@discordeno/bot';

export type Bot = DiscordenoBot<CompleteDesiredProperties<typeof DESIRED_PROPERTIES>, typeof DESIRED_PROPERTIES_BEHAVIOR>;

export type BotEventNames = keyof BotEvents;
export type BotEvents = Bot['events'];
