/*
 * biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: Biome
 * falsely reports unused private members when extracting them from 'this'.
 */

import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { DiscordService } from '#modules/Utils/Discord/Discord.service.js';
import type { UserGuild } from '#types/Discord.js';

@Injectable()
export class AuthService {
	static USER_GUILDS_CACHE_TTL = 5_000 as const;

	public constructor(
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
		@Inject(DiscordService) private readonly discordService: DiscordService,
	) {}

	public async getGuilds(userId: string, accessToken: string): Promise<UserGuild[]> {
		const { USER_GUILDS_CACHE_TTL } = AuthService;
		const { cacheService, discordService } = this;

		const cachedUserGuilds = await cacheService.get<UserGuild[]>(`user:guilds:${userId}`);

		if (cachedUserGuilds) {
			return cachedUserGuilds;
		}

		const userGuilds = await discordService.getCurrentUserGuilds(accessToken);
		const userGuildsToCache = await cacheService.set<UserGuild[]>(
			`user:guilds:${userId}`,
			userGuilds,
			USER_GUILDS_CACHE_TTL,
		);

		return userGuildsToCache;
	}
}
