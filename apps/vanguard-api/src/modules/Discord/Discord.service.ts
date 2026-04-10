/*
 * biome-ignore-all lint/style/useNamingConvention: This convention comes from
 * an external API, which cannot be overwriten.
 */

import type {
	RESTGetAPICurrentUserGuildsResult,
	RESTGetAPICurrentUserResult,
	RESTPostOAuth2AccessTokenResult,
} from '@discordjs/core';
import { API } from '@discordjs/core/http-only';
import { REST } from '@discordjs/rest';
import { Injectable } from '@nestjs/common';
import { CLIENT_ID, CLIENT_SECRET } from '#lib/Constants/Client.js';
import { api } from '#lib/REST.js';
import {
	UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE,
	UNABLE_TO_GET_USER_INFORMATION_RESPONSE,
} from '#lib/Responses/Auth.js';
import { createCallbackUrl } from '#utils/URL/createCallbackUrl.js';

@Injectable()
export class DiscordService {
	private createManagerForBearer(accessToken: string): API {
		const rest = new REST({
			authPrefix: 'Bearer',
		});

		rest.setToken(accessToken);

		return new API(rest);
	}

	public async exchangeToken(code: string): Promise<RESTPostOAuth2AccessTokenResult> {
		try {
			return await api.oauth2.tokenExchange({
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code,
				grant_type: 'authorization_code',
				redirect_uri: createCallbackUrl(),
			});
		} catch {
			throw UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE();
		}
	}

	public async getCurrentUser(accessToken: string): Promise<RESTGetAPICurrentUserResult> {
		const api = this.createManagerForBearer(accessToken);

		try {
			return await api.users.getCurrent();
		} catch {
			throw UNABLE_TO_GET_USER_INFORMATION_RESPONSE();
		}
	}

	public async getCurrentUserGuilds(accessToken: string): Promise<RESTGetAPICurrentUserGuildsResult> {
		const api = this.createManagerForBearer(accessToken);

		try {
			return await api.users.getGuilds({
				with_counts: true,
			});
		} catch {
			return [];
		}
	}
}
