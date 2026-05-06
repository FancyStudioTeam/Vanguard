import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import type { UserGuild } from '#lib/Types/Discord.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';

const userGuildsCacheKey = (userId: string): string => `user:${userId}/guilds`;

@Injectable()
export class GuildsService {
	private static USER_GUILDS_CACHE_KEY = userGuildsCacheKey;
	private static USER_GUILDS_CACHE_TTL = 10_000 as const;

	public constructor(
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
		@Inject(DiscordService) private readonly discordService: DiscordService,
	) {}

	public async getGuilds(userId: string, accessToken: string): Promise<UserGuild[]> {
		const userGuildsCacheKey = GuildsService.USER_GUILDS_CACHE_KEY(userId);
		const userGuildsCacheTtl = GuildsService.USER_GUILDS_CACHE_TTL;

		const cachedUserGuilds = await this.cacheService.get<UserGuild[]>(userGuildsCacheKey);

		if (cachedUserGuilds) {
			return cachedUserGuilds;
		}

		const currentUserGuilds = await this.discordService.getCurrentUserGuilds(accessToken);
		const currentUserGuildsCached = await this.cacheService.set<UserGuild[]>(userGuildsCacheKey, currentUserGuilds, userGuildsCacheTtl);

		return currentUserGuildsCached;
	}
}
