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
import { GUILD_NOT_FOUND_RESPONSE } from '#lib/Responses/Shared.js';
import type { Guild, User, UserAccessResult, UserGuild } from '#lib/Types/Discord.js';
import { createCallbackUrl } from '#utils/URL/createCallbackUrl.js';
import { DiscordParserService } from './Parser/DiscordParser.service.js';

/*
 * TODO: Some of these Discord responses should be cached.
 */

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

		const response = await api.oauth2.tokenExchange({
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			code,
			grant_type: 'authorization_code',
			redirect_uri: createCallbackUrl(),
		});

		return discordParserService.parseUserAccessResult(response);
	}

	public async getCurrentUser(accessToken: string): Promise<User> {
		const { discordParserService } = this;

		const api = this.createManagerForBearer(accessToken);

		const currentUser = await api.users.getCurrent();
		const currentUserParsed = discordParserService.parseUser(currentUser);

		return currentUserParsed;
	}

	public async getCurrentUserGuilds(accessToken: string): Promise<UserGuild[]> {
		const { discordParserService } = this;

		const api = this.createManagerForBearer(accessToken);
		const response = await api.users
			.getGuilds({
				with_counts: true,
			})
			.catch(() => []);

		return discordParserService.parseUserGuilds(response);
	}

	public async getGuild(guildId: string): Promise<Guild> {
		const { discordParserService } = this;
		const { parseGuild } = discordParserService;

		try {
			return await api.guilds.get(guildId).then(parseGuild);
		} catch {
			throw GUILD_NOT_FOUND_RESPONSE(guildId);
		}
	}
}
