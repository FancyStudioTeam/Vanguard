import type { Camelize, DiscordAccessTokenResponse } from '@discordeno/types';
import { Injectable } from '@nestjs/common';
import { CLIENT_ID, CLIENT_SECRET } from '#lib/Constants/Client.js';
import { rest } from '#lib/REST.js';
import { createCallbackUrl } from '#utils/URL/createCallbackUrl.js';

@Injectable()
export class AuthService {
	async exchangeToken(code: string): Promise<Camelize<DiscordAccessTokenResponse>> {
		return await rest.exchangeToken(CLIENT_ID, CLIENT_SECRET, {
			code,
			grantType: 'authorization_code',
			redirectUri: createCallbackUrl(),
		});
	}
}
