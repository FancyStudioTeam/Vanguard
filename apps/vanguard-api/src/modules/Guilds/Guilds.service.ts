import type { APIUserGuild } from '@vanguard/api-types/interfaces';

import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { RESTAPIPartialCurrentUserGuild as DiscordApiUserGuild } from 'discord-api-types/v10';

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

	public async getCurrentUserGuilds(userId: string, accessToken: string): Promise<APIUserGuild[]> {
		const userGuildsCacheKey = GuildsService.USER_GUILDS_CACHE_KEY(userId);
		const userGuildsCacheTtl = GuildsService.USER_GUILDS_CACHE_TTL;

		const cachedUserGuilds = await this.cacheService.get<APIUserGuild[]>(userGuildsCacheKey);

		if (cachedUserGuilds) {
			return cachedUserGuilds;
		}

		const currentUserGuilds = await this.discordService.getCurrentUserGuilds(accessToken);
		const currentUserGuildsParsed = this.parseUserGuilds(currentUserGuilds);

		const currentUserGuildsCached = await this.cacheService.set<APIUserGuild[]>(
			userGuildsCacheKey,
			currentUserGuildsParsed,
			userGuildsCacheTtl,
		);

		return currentUserGuildsCached;
	}

	public parseUserGuild({ banner, icon, id, name, permissions }: DiscordApiUserGuild): APIUserGuild {
		return {
			banner,
			icon,
			id,
			name,
			permissions,
		};
	}

	public parseUserGuilds(apiUserGuilds: DiscordApiUserGuild[]): APIUserGuild[] {
		return apiUserGuilds.map(this.parseUserGuild);
	}
}
