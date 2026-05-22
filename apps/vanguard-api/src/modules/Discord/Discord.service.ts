import { DiscordAPIError, REST, type RequestData } from '@discordjs/rest';
import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import {
	type APIGuild,
	type APIGuildMember,
	type APIRole,
	type APIUser,
	PermissionFlagsBits,
	type RESTAPIPartialCurrentUserGuild,
	type RESTGetAPICurrentUserGuildsResult,
	type RESTGetAPICurrentUserResult,
	type RESTGetAPIGuildMemberResult,
	type RESTGetAPIGuildResult,
	type RESTGetAPIUserResult,
	RESTJSONErrorCodes,
	type RESTPostOAuth2AccessTokenResult,
	Routes,
} from 'discord-api-types/v10';

import { CLIENT_ID, CLIENT_SECRET, CLIENT_TOKEN } from '#lib/Constants/Client.js';
import { logger } from '#lib/Logger.js';
import { UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE, UNABLE_TO_GET_USER_INFORMATION_RESPONSE } from '#lib/Responses/Auth.js';
import { INTERNAL_SERVER_ERROR_RESPONSE, NOT_FOUND_RESPONSE } from '#lib/Responses/Shared.js';
import { createCallbackUrl } from '#utils/URL/createCallbackUrl.js';

const guildCacheKey = (guildId: string): string => `guilds:${guildId}`;
const guildMemberCacheKey = (guildId: string, userId: string): string => `guilds:${guildId}/users:${userId}`;

const userCacheKey = (userId: string): string => `users:${userId}`;
const userGuildsCacheKey = (userId: string): string => `users:${userId}/guilds`;

@Injectable()
export class DiscordService {
	private static ALL_PERMISSIONS = Object.values(PermissionFlagsBits).reduce((accumulator, permission) => accumulator | permission, 0n);

	private static GUILD_CACHE_KEY = guildCacheKey;
	private static GUILD_CACHE_TTL = 10_000 as const;

	private static GUILD_MEMBER_CACHE_KEY = guildMemberCacheKey;
	private static GUILD_MEMBER_CACHE_TTL = 10_000;

	private static USER_CACHE_KEY = userCacheKey;
	private static USER_CACHE_TTL = 10_000 as const;

	private static USER_GUILDS_CACHE_KEY = userGuildsCacheKey;
	private static USER_GUILDS_CACHE_TTL = 10_000 as const;

	public readonly rest: REST;

	public constructor(@Inject(CACHE_MANAGER) private readonly cacheService: Cache) {
		this.rest = new REST();

		this.rest.setToken(CLIENT_TOKEN);
		this.rest.on('response', (request, response) => {
			const { method, path } = request;
			const { status } = response;

			logger.trace(`[${method}] '${path}' [${status}]`);
		});
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
		if (exception instanceof DiscordAPIError && exception.code === RESTJSONErrorCodes.UnknownGuild) {
			const guildCacheKey = DiscordService.GUILD_CACHE_KEY(guildId);
			const guildCacheTtl = DiscordService.GUILD_CACHE_TTL;

			await this.cacheService.set<GuildValueWithStatus>(guildCacheKey, 'not_found', guildCacheTtl);

			throw NOT_FOUND_RESPONSE();
		}

		throw INTERNAL_SERVER_ERROR_RESPONSE();
	}

	private async handleGuildMemberException(guildId: string, userId: string, exception: unknown): Promise<never> {
		if (exception instanceof DiscordAPIError && exception.code === RESTJSONErrorCodes.UnknownMember) {
			const guildMemberCacheKey = DiscordService.GUILD_MEMBER_CACHE_KEY(guildId, userId);
			const guildMemberCacheTtl = DiscordService.GUILD_MEMBER_CACHE_TTL;

			await this.cacheService.set<GuildMemberValueWithStatus>(guildMemberCacheKey, 'not_found', guildMemberCacheTtl);

			throw NOT_FOUND_RESPONSE();
		}

		throw INTERNAL_SERVER_ERROR_RESPONSE();
	}

	/**
	 * @see https://docs.discord.com/developers/resources/user#get-current-user
	 */
	public async getCurrentUser(accessToken: string): Promise<RESTGetAPICurrentUserResult> {
		const requestManager = this.createRestManagerForBearer(accessToken);
		const requestEndpoint = Routes.user();

		const currentUser = (await requestManager.get(requestEndpoint)) as RESTGetAPICurrentUserResult;

		return currentUser;
	}

	/**
	 * @see https://docs.discord.com/developers/resources/user#get-current-user-guilds
	 */
	public async getCurrentUserGuilds(userId: string, accessToken: string): Promise<RESTAPIPartialCurrentUserGuild[]> {
		const userGuildsCacheKey = DiscordService.USER_GUILDS_CACHE_KEY(userId);
		const userGuildsCacheTtl = DiscordService.USER_GUILDS_CACHE_TTL;

		const cachedUserGuilds = await this.cacheService.get<UserGuildsCachedValue>(userGuildsCacheKey);

		if (cachedUserGuilds) {
			return cachedUserGuilds;
		}

		const requestManager = this.createRestManagerForBearer(accessToken);
		const requestEndpoint = Routes.userGuilds();

		const currentUserGuilds = (await requestManager.get(requestEndpoint).catch(() => [])) as RESTGetAPICurrentUserGuildsResult;
		const currentUserGuildsCached = await this.cacheService.set<UserGuildsCachedValue>(
			userGuildsCacheKey,
			currentUserGuilds,
			userGuildsCacheTtl,
		);

		return currentUserGuildsCached;
	}

	/**
	 * @see https://docs.discord.com/developers/resources/guild#get-guild
	 */
	public async getGuild(guildId: string): Promise<APIGuild> {
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

		try {
			const requestEndpoint = Routes.guild(guildId);

			const guild = (await this.rest.get(requestEndpoint)) as RESTGetAPIGuildResult;
			const guildCached = await this.cacheService.set<GuildValueWithObject>(guildCacheKey, guild, guildCacheTtl);

			return guildCached;
		} catch (exception) {
			return await this.handleGuildException(guildId, exception);
		}
	}

	/**
	 * @see https://docs.discord.com/developers/resources/guild#get-guild-member
	 */
	public async getGuildMember(guildId: string, userId: string): Promise<APIGuildMember> {
		const guildMemberCacheKey = DiscordService.GUILD_MEMBER_CACHE_KEY(guildId, userId);
		const guildMemberCacheTtl = DiscordService.GUILD_MEMBER_CACHE_TTL;

		const cachedGuildMember = await this.cacheService.get<GuildMemberCachedValue>(guildMemberCacheKey);

		if (cachedGuildMember !== undefined) {
			/*
			 * This means that a previous request was sent to retrieve this member but
			 * Discord's API returned a 404 status code.
			 *
			 * This value is cached in order to prevent multiple requests when
			 * attempting to retrieve a member that does not exist in the guild.
			 */
			if (cachedGuildMember === 'not_found') {
				throw NOT_FOUND_RESPONSE();
			}

			return cachedGuildMember;
		}

		try {
			const requestEndpoint = Routes.guildMember(guildId, userId);

			const guildMember = (await this.rest.get(requestEndpoint)) as RESTGetAPIGuildMemberResult;
			const guildMemberCached = await this.cacheService.set<GuildMemberValueWithObject>(
				guildMemberCacheKey,
				guildMember,
				guildMemberCacheTtl,
			);

			return guildMemberCached;
		} catch (exception) {
			return await this.handleGuildMemberException(guildId, userId, exception);
		}
	}

	/**
	 * @see https://docs.discord.com/developers/resources/user#get-user
	 */
	public async getUser(userId: string): Promise<APIUser> {
		const userCacheKey = DiscordService.USER_CACHE_KEY(userId);
		const userCacheTtl = DiscordService.USER_CACHE_TTL;

		const cachedUser = await this.cacheService.get<UserCachedValue>(userCacheKey);

		if (cachedUser !== undefined) {
			return cachedUser;
		}

		try {
			const requestEndpoint = Routes.user(userId);

			const user = (await this.rest.get(requestEndpoint)) as RESTGetAPIUserResult;
			const userCached = await this.cacheService.set<UserCachedValue>(userCacheKey, user, userCacheTtl);

			return userCached;
		} catch {
			throw UNABLE_TO_GET_USER_INFORMATION_RESPONSE();
		}
	}

	/**
	 * @see https://docs.discord.com/developers/topics/oauth2#authorization-code-grant
	 */
	public async getUserAccess(code: string): Promise<RESTPostOAuth2AccessTokenResult> {
		try {
			const requestEndpoint = Routes.oauth2TokenExchange();

			const requestBody = this.createRequestBodyForTokenExchange(code);
			const requestOptions: RequestData = {
				body: requestBody,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				passThroughBody: true,
			};

			const userAccess = (await this.rest.post(requestEndpoint, requestOptions)) as RESTPostOAuth2AccessTokenResult;

			return userAccess;
		} catch {
			throw UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE();
		}
	}

	/**
	 * @see https://docs.discord.com/developers/topics/permissions#permission-overwrites
	 */
	public permissionsOf(guild: APIGuild, guildMember: APIGuildMember): bigint {
		const { roles: guildMemberRoles, user: guildMemberUser } = guildMember;
		const { id: guildMemberUserId } = guildMemberUser;

		const { id: guildId, owner_id: guildOwnerId, roles: guildRoles } = guild;

		if (guildMemberUserId === guildOwnerId) {
			return DiscordService.ALL_PERMISSIONS;
		}

		const guildRolesMapIterator = guildRoles.map<
			readonly [
				Key: string,
				Value: APIRole,
			]
		>((role) => [
			role.id,
			role,
		]);
		const guildRolesMap = new Map<string, APIRole>(guildRolesMapIterator);

		/*
		 * The '@everyone' role always exists and shares the same ID as the guild.
		 */
		const everyoneRole = guildRolesMap.get(guildId) as APIRole;
		const everyoneRolePermissions = everyoneRole.permissions;

		let permissions: bigint = BigInt(everyoneRolePermissions);

		for (const guildMemberRoleId of guildMemberRoles) {
			const memberRole = guildRolesMap.get(guildMemberRoleId);
			const memberRolePermissions = BigInt(memberRole?.permissions ?? 0);

			/*
			 * The 'Administrator' permission implicitly grants every permission,
			 * so we can stop iterating once it is found.
			 */
			if (memberRolePermissions & PermissionFlagsBits.Administrator) {
				permissions = DiscordService.ALL_PERMISSIONS;

				break;
			} else {
				permissions |= memberRolePermissions;
			}
		}

		return permissions;
	}
}

type GuildCachedValue = GuildValueWithObject | GuildValueWithStatus;

type GuildMemberCachedValue = GuildMemberValueWithObject | GuildMemberValueWithStatus;

type GuildMemberValueWithObject = APIGuildMember;
type GuildMemberValueWithStatus = 'not_found';

type GuildValueWithObject = APIGuild;
type GuildValueWithStatus = 'not_found';

type UserCachedValue = APIUser;

type UserGuildsCachedValue = RESTAPIPartialCurrentUserGuild[];
