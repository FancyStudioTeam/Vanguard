import { DiscordAPIError, REST } from '@discordjs/rest';
import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
	type RESTGetAPICurrentUserGuildsResult,
	type RESTGetAPICurrentUserResult,
	type RESTGetAPIGuildResult,
	type RESTGetCurrentUserGuildMemberResult,
	type RESTPostOAuth2AccessTokenResult,
	Routes,
} from 'discord-api-types/v10';

import { CLIENT_ID, CLIENT_SECRET, CLIENT_TOKEN } from '#lib/Constants/Client.js';
import { UNABLE_TO_GET_USER_INFORMATION_RESPONSE } from '#lib/Responses/Auth.js';
import { INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE } from '#lib/Responses/Shared.js';
import type { Guild, User, UserAccessResult, UserGuild } from '#lib/Types/Discord.js';
import { DiscordUtilsService } from '#modules/DiscordUtils/DiscordUtils.service.js';
import { createCallbackUrl } from '#utils/URL/createCallbackUrl.js';

const guildCacheKey = (guildId: string): string => `guilds:${guildId}`;
const guildMemberPermissionsCacheKey = (guildId: string, userId: string): string => `guilds:${guildId}/members:${userId}/permissions`;

@Injectable()
export class DiscordService {
	private static GUILD_CACHE_KEY = guildCacheKey;
	private static GUILD_CACHE_TTL = 10_000 as const;

	private static GUILD_MEMBER_PERMISSIONS_CACHE_KEY = guildMemberPermissionsCacheKey;
	private static GUILD_MEMBER_PERMISSIONS_CACHE_TTL = 15_000 as const;

	public constructor(
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
		@Inject(DiscordUtilsService) private readonly discordUtilsService: DiscordUtilsService,
	) {}

	private createRestManager(): REST {
		return new REST().setToken(CLIENT_TOKEN);
	}

	private createRestManagerForBearer(accessToken: string): REST {
		return new REST({
			authPrefix: 'Bearer',
		}).setToken(accessToken);
	}

	/**
	 * @see https://docs.discord.com/developers/topics/oauth2#authorization-code-grant
	 */
	private createRequestBodyForTokenExchange(code: string): string {
		const urlSearchParams = new URLSearchParams();

		urlSearchParams.set('client_id', CLIENT_ID);
		urlSearchParams.set('client_secret', CLIENT_SECRET);

		urlSearchParams.set('code', code);

		urlSearchParams.set('grant_type', 'authorization_code');
		urlSearchParams.set('redirect_uri', createCallbackUrl());

		return urlSearchParams.toString();
	}

	private async handleGuildException(guildId: string, exception: unknown): Promise<never> {
		if (exception instanceof DiscordAPIError && exception.status === HttpStatus.NOT_FOUND) {
			const guildCacheKey = DiscordService.GUILD_CACHE_KEY(guildId);
			const guildCacheTtl = DiscordService.GUILD_CACHE_TTL;

			await this.cacheService.set<GuildValueWithStatus>(guildCacheKey, 'not_found', guildCacheTtl);

			throw NOT_FOUND_RESPONSE();
		}

		throw INTERNAL_SERVER_ERROR_RESPONSE();
	}

	private async setEmptyGuildMemberPermissions(cacheKey: string, cacheTtl: number): Promise<string> {
		return await this.cacheService.set<string>(cacheKey, '0', cacheTtl);
	}

	/**
	 * @see https://docs.discord.com/developers/resources/user#get-current-user
	 */
	public async getCurrentUser(accessToken: string): Promise<User> {
		const requestManager = this.createRestManagerForBearer(accessToken);
		const requestEndpoint = Routes.user('@me');

		try {
			const currentUser = (await requestManager.get(requestEndpoint)) as RESTGetAPICurrentUserResult;
			const currentUserParsed = this.discordUtilsService.parseUser(currentUser);

			return currentUserParsed;
		} catch {
			throw UNABLE_TO_GET_USER_INFORMATION_RESPONSE();
		}
	}

	/**
	 * @see https://docs.discord.com/developers/resources/user#get-current-user-guilds
	 */
	public async getCurrentUserGuilds(accessToken: string): Promise<UserGuild[]> {
		const requestManager = this.createRestManagerForBearer(accessToken);
		const requestEndpoint = Routes.userGuilds();

		const currentUserGuilds = (await requestManager.get(requestEndpoint).catch(() => [])) as RESTGetAPICurrentUserGuildsResult;
		const currentUserGuildsParsed = this.discordUtilsService.parseUserGuilds(currentUserGuilds);

		return currentUserGuildsParsed;
	}

	/**
	 * @see https://docs.discord.com/developers/resources/guild#get-guild
	 */
	public async getGuild(guildId: string): Promise<Guild> {
		const guildCacheKey = DiscordService.GUILD_CACHE_KEY(guildId);
		const guildCacheTtl = DiscordService.GUILD_CACHE_TTL;

		const cachedGuild = await this.cacheService.get<GuildCachedValue>(guildCacheKey);

		if (cachedGuild !== undefined) {
			/*
			 * This means that a previous request was sent to retrieve this guild but
			 * Discord's API returned a 404 status code.
			 *
			 * This value is cached in order to prevent multiple requests when
			 * attempting to retrieve a guild that does not exist for the bot.
			 */
			if (cachedGuild === 'not_found') {
				throw NOT_FOUND_RESPONSE();
			}

			return cachedGuild;
		}

		const requestManager = this.createRestManager();
		const requestEndpoint = Routes.guild(guildId);

		try {
			const guild = (await requestManager.get(requestEndpoint)) as RESTGetAPIGuildResult;

			const guildParsed = this.discordUtilsService.parseGuild(guild);
			const guildCached = await this.cacheService.set<GuildValueWithObject>(guildCacheKey, guildParsed, guildCacheTtl);

			return guildCached;
		} catch (exception) {
			return await this.handleGuildException(guildId, exception);
		}
	}

	/**
	 * @see https://docs.discord.com/developers/resources/user#get-current-user-guild-member
	 */
	public async getGuildMemberPermissions(guildId: string, userId: string, accessToken: string): Promise<string> {
		const guildMemberPermissionsCacheKey = DiscordService.GUILD_MEMBER_PERMISSIONS_CACHE_KEY(guildId, userId);
		const guildMemberPermissionsCacheTtl = DiscordService.GUILD_MEMBER_PERMISSIONS_CACHE_TTL;

		const cachedGuildMemberPermissions = await this.cacheService.get<string>(guildMemberPermissionsCacheKey);

		if (cachedGuildMemberPermissions !== undefined) {
			return cachedGuildMemberPermissions;
		}

		const requestManager = this.createRestManagerForBearer(accessToken);
		const requestEndpoint = Routes.userGuildMember(guildId);

		try {
			const guildMember = (await requestManager.get(requestEndpoint)) as RESTGetCurrentUserGuildMemberResult;
			const guildMemberPermissions: string | undefined = Reflect.get(guildMember, 'permissions');

			if (guildMemberPermissions === undefined) {
				return await this.setEmptyGuildMemberPermissions(guildMemberPermissionsCacheKey, guildMemberPermissionsCacheTtl);
			}

			return await this.cacheService.set<string>(
				guildMemberPermissionsCacheKey,
				guildMemberPermissions,
				guildMemberPermissionsCacheTtl,
			);
		} catch {
			return await this.setEmptyGuildMemberPermissions(guildMemberPermissionsCacheKey, guildMemberPermissionsCacheTtl);
		}
	}

	/**
	 * @see https://docs.discord.com/developers/topics/oauth2#authorization-code-grant
	 */
	public async getUserAccess(code: string): Promise<UserAccessResult> {
		const requestManager = this.createRestManager();
		const requestEndpoint = Routes.oauth2TokenExchange();

		const requestBody = this.createRequestBodyForTokenExchange(code);

		const accessResult = (await requestManager.post(requestEndpoint, {
			body: requestBody,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			passThroughBody: true,
		})) as RESTPostOAuth2AccessTokenResult;

		return this.discordUtilsService.parseUserAccessResult(accessResult);
	}
}

type GuildCachedValue = GuildValueWithObject | GuildValueWithStatus;

type GuildValueWithObject = Guild;
type GuildValueWithStatus = 'not_found';
