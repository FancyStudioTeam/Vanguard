import type { enhancedBot } from './Bot.js';

export type Bot = typeof enhancedBot;

export type BotEventNames = keyof BotEvents;
export type BotEvents = Bot['events'];

export type BotInferredTypes = BotTransformers['$inferredTypes'];

export type BotTransformers = Bot['transformers'];
