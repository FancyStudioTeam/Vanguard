/*
 * biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: Biome
 * falsely reports unused private members when extracting them from 'this'.
 *
 * biome-ignore-all lint/style/useNamingConvention: This convention comes from
 * an external API, which cannot be overwriten.
 */

import { API } from '@discordjs/core/http-only';
import { REST } from '@discordjs/rest';
import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { match, P } from 'ts-pattern';
import { CLIENT_ID, CLIENT_SECRET } from '#lib/Constants/Client.js';
import { api } from '#lib/REST.js';
import { GUILD_NOT_FOUND_RESPONSE } from '#lib/Responses/Shared.js';
import type { Guild, User, UserAccessResult, UserGuild } from '#lib/Types/Discord.js';
import { createCallbackUrl } from '#utils/URL/createCallbackUrl.js';
import { DiscordParserService } from './Parser/DiscordParser.service.js';

@Injectable()
export class DiscordService {
	static GUILD_CACHE_KEY = (guildId: string) => `guild:${guildId}`;
	static GUILD_CACHE_TTL = 10_000 as const;

	public constructor(
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
		@Inject(DiscordParserService) private readonly discordParserService: DiscordParserService,
	) {}

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
		const { GUILD_CACHE_KEY } = DiscordService;
		const { cacheService, discordParserService } = this;

		const cachedGuild = await cacheService.get<Guild | 'not_found'>(GUILD_CACHE_KEY(guildId));

		return await match(cachedGuild)
			.returnType<Promise<Guild>>()
			/*
			 * This means that a previous request was sent to retrieve this guild but
			 * Discord returned a 404 status code.
			 *
			 * This value is cached in order to prevent multiple requests when
			 * attempting to retrieve a guild that does not exist.
			 */
			.with('not_found', () => {
				throw GUILD_NOT_FOUND_RESPONSE();
			})
			.with(P.nonNullable, async (cachedGuild) => cachedGuild)
			.otherwise(async () => {
				try {
					const { parseGuild } = discordParserService;

					const guild = await api.guilds.get(guildId);
					const guildParsed = parseGuild(guild);

					await cacheService.set<Guild>(GUILD_CACHE_KEY(guildId), guildParsed);

					return guildParsed;
				} catch {
					await cacheService.set<'not_found'>(GUILD_CACHE_KEY(guildId), 'not_found');

					throw GUILD_NOT_FOUND_RESPONSE();
				}
			});
	}
}
