/*
 * biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: Biome
 * falsely reports unused private members when extracting them from 'this'.
 *
 * biome-ignore-all lint/style/useNamingConvention: This convention comes from
 * an external API, which cannot be overwriten.
 */

import { API } from '@discordjs/core/http-only';
import { REST } from '@discordjs/rest';
import { Inject, Injectable } from '@nestjs/common';
import { CLIENT_ID, CLIENT_SECRET } from '#lib/Constants/Client.js';
import { api } from '#lib/REST.js';
import {
	UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE,
	UNABLE_TO_GET_USER_INFORMATION_RESPONSE,
} from '#lib/Responses/Auth.js';
import type { User, UserAccessResult, UserGuild } from '#types/Discord.js';
import { createCallbackUrl } from '#utils/URL/createCallbackUrl.js';
import { DiscordParserService } from './Parser/DiscordParser.service.js';

@Injectable()
export class DiscordService {
	public constructor(@Inject(DiscordParserService) private readonly discordParserService: DiscordParserService) {}

	private createManagerForBearer(accessToken: string): API {
		const rest = new REST({
			authPrefix: 'Bearer',
		});

		rest.setToken(accessToken);

		return new API(rest);
	}

	public async exchangeToken(code: string): Promise<UserAccessResult> {
		const { discordParserService } = this;

		try {
			const response = await api.oauth2.tokenExchange({
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code,
				grant_type: 'authorization_code',
				redirect_uri: createCallbackUrl(),
			});

			return discordParserService.parseUserAccessResult(response);
		} catch {
			throw UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE();
		}
	}

	public async getCurrentUser(accessToken: string): Promise<User> {
		const { discordParserService } = this;

		const api = this.createManagerForBearer(accessToken);

		try {
			const response = await api.users.getCurrent();

			return discordParserService.parseUser(response);
		} catch {
			throw UNABLE_TO_GET_USER_INFORMATION_RESPONSE();
		}
	}

	public async getCurrentUserGuilds(accessToken: string): Promise<UserGuild[]> {
		const { discordParserService } = this;

		const api = this.createManagerForBearer(accessToken);

		try {
			const response = await api.users.getGuilds({
				with_counts: true,
			});

			return discordParserService.parseUserGuilds(response);
		} catch {
			return [];
		}
	}
}
