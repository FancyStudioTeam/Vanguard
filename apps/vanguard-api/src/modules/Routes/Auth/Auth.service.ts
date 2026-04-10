/*
 * biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: Biome
 * falsely reports unused private members when extracting them from 'this'.
 */

import type { RESTAPIPartialCurrentUserGuild } from '@discordjs/core';
import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { DiscordService } from '#modules/Discord/Discord.service.js';

@Injectable()
export class AuthService {
	static USER_GUILDS_CACHE_TTL = 5 as const;

	public constructor(
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
		@Inject(DiscordService) private readonly discordService: DiscordService,
	) {}

	public async getGuilds(userId: string, accessToken: string): Promise<RESTAPIPartialCurrentUserGuild[]> {
		const { USER_GUILDS_CACHE_TTL } = AuthService;
		const { cacheService, discordService } = this;

		const cachedGuilds = await cacheService.get<RESTAPIPartialCurrentUserGuild[]>(`user:guilds:${userId}`);

		if (cachedGuilds) {
			return cachedGuilds;
		} else {
			const guilds = await discordService.getCurrentUserGuilds(accessToken);
			const cachedGuilds = await cacheService.set<RESTAPIPartialCurrentUserGuild[]>(
				`user:guilds:${userId}`,
				guilds,
				USER_GUILDS_CACHE_TTL,
			);

			return cachedGuilds;
		}
	}
}
