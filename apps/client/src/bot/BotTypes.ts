import type { enhancedBot } from './Bot.js';

export type Bot = typeof enhancedBot;

export type BotInferredTypes = BotTransformers['$inferredTypes'];

export type BotTransformers = Bot['transformers'];
