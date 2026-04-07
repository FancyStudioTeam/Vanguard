import { createRestManager } from '@discordeno/rest';
import { CLIENT_TOKEN } from './Constants/Client.ts';

export const rest = createRestManager({
	token: CLIENT_TOKEN,
});

rest.maxRetryCount = 0;
