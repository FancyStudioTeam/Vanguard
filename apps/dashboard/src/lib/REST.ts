import { createRestManager } from '@discordeno/rest';
import { CLIENT_TOKEN } from './Constants.ts';

export const rest = createRestManager({
	token: CLIENT_TOKEN,
});
