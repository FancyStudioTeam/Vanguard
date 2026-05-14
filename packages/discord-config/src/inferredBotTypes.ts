import type { CompleteDesiredProperties, Bot as DiscordenoBot } from '@discordeno/bot';

import type { DESIRED_PROPERTIES, DESIRED_PROPERTIES_BEHAVIOR } from './desiredProperties.js';

export type Bot = DiscordenoBot<CompleteDesiredProperties<typeof DESIRED_PROPERTIES>, typeof DESIRED_PROPERTIES_BEHAVIOR>;

export type BotEventNames = keyof BotEvents;
export type BotEvents = Bot['events'];

export type BotInferredTypes = BotTransformers['$inferredTypes'];

export type BotTransformers = Bot['transformers'];
