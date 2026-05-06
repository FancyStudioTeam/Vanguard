/*
 * biome-ignore-all lint/style/useNamingConvention: This convention comes from
 * an external API, which cannot be overwriten.
 */

import { API } from '@discordjs/core/http-only';
import { REST } from '@discordjs/rest';
import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Routes } from 'discord-api-types/v9';
import type { APIGuildMember } from 'discord-api-types/v10';
import { CLIENT_ID, CLIENT_SECRET } from '#lib/Constants/Client.js';
import { api } from '#lib/REST.js';
import { GUILD_NOT_FOUND_RESPONSE } from '#lib/Responses/Shared.js';
import type { Guild, User, UserAccessResult, UserGuild } from '#lib/Types/Discord.js';
import { createCallbackUrl } from '#utils/URL/createCallbackUrl.js';
import { DiscordParserService } from './Parser/DiscordParser.service.js';

@Injectable()
export class DiscordService {
	private static GUILD_CACHE_KEY = (guildId: string) => `guild:${guildId}` as const;
	private static GUILD_CACHE_TTL = 10_000 as const;

	private static GUILD_MEMBER_PERMISSIONS_CACHE_KEY = (guildId: string, userId: string) =>
		`guild:${guildId}:members:${userId}:permissions` as const;
	private static GUILD_MEMBER_PERMISSIONS_CACHE_TTL = 15_000 as const;

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
		const response = await api.users.getGuilds().catch(() => []);

		return discordParserService.parseUserGuilds(response);
	}

	public async getGuild(guildId: string): Promise<Guild> {
		const guildCacheKey = DiscordService.GUILD_CACHE_KEY(guildId);
		const guildCacheTtl = DiscordService.GUILD_CACHE_TTL;

		const cachedGuild = await this.cacheService.get<Guild | 'not_found'>(guildCacheKey);

		if (cachedGuild) {
			/*
			 * This means that a previous request was sent to retrieve this guild but
			 * Discord's API returned a 404 status code.
			 *
			 * This value is cached in order to prevent multiple requests when
			 * attempting to retrieve a guild that does not exist.
			 */
			if (cachedGuild === 'not_found') {
				throw GUILD_NOT_FOUND_RESPONSE();
			}

			return cachedGuild;
		}

		try {
			const guild = await api.guilds.get(guildId);
			const guildParsed = this.discordParserService.parseGuild(guild);

			return await this.cacheService.set<Guild>(guildCacheKey, guildParsed, guildCacheTtl);
		} catch {
			await this.cacheService.set<'not_found'>(guildCacheKey, 'not_found', guildCacheTtl);

			throw GUILD_NOT_FOUND_RESPONSE();
		}
	}

	public async getGuildMemberPermissions(accessToken: string, guildId: string, userId: string): Promise<string> {
		const guildMemberPermissionsCacheKey = DiscordService.GUILD_MEMBER_PERMISSIONS_CACHE_KEY(guildId, userId);
		const guildMemberPermissionsCacheTttl = DiscordService.GUILD_MEMBER_PERMISSIONS_CACHE_TTL;

		const cachedGuildMemberPermissions = await this.cacheService.get<string>(guildMemberPermissionsCacheKey);

		/*
		 * The cached value may be '0', a falsy value in JavaScript.
		 */
		if (cachedGuildMemberPermissions !== undefined) {
			return cachedGuildMemberPermissions;
		}

		try {
			const rest = new REST();

			rest.options.authPrefix = 'Bearer';
			rest.setToken(accessToken);

			const { permissions } = (await rest.get(Routes.userGuildMember(guildId))) as APIGuildMemberWithPermissions;

			return await this.cacheService.set<string>(guildMemberPermissionsCacheKey, permissions, guildMemberPermissionsCacheTttl);
		} catch {
			return await this.cacheService.set<'0'>(guildMemberPermissionsCacheKey, '0', guildMemberPermissionsCacheTttl);
		}
	}
}

interface APIGuildMemberWithPermissions extends APIGuildMember {
	permissions: string;
}
