import { API } from '@discordjs/core/http-only';
import { REST } from '@discordjs/rest';
import { CLIENT_TOKEN } from './Constants/Client.js';

const rest = new REST({
	retries: 0,
}).setToken(CLIENT_TOKEN);

export const api = new API(rest);
