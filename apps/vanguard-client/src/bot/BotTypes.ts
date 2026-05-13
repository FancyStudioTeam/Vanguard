import type { Bot as InferredBot } from '@vanguard/discord-desired-properties/inferred-types';

export type Bot = InferredBot;

export type BotEventNames = keyof BotEvents;
export type BotEvents = Bot['events'];

export type BotInferredTypes = BotTransformers['$inferredTypes'];

export type BotTransformers = Bot['transformers'];
