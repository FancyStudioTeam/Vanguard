import { CACHE_MANAGER, type Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { UserGuild } from '#lib/Types/Discord.js';
import { DiscordService } from '#modules/Utils/Discord/Discord.service.js';

@Injectable()
export class GuildsService {
	static USER_GUILDS_CACHE_TTL = 10_000 as const;

	public constructor(
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
		@Inject(DiscordService) private readonly discordService: DiscordService,
	) {}

	public async getGuilds(userId: string, accessToken: string): Promise<UserGuild[]> {
		const cachedUserGuilds = await this.cacheService.get<UserGuild[]>(`user:guilds:${userId}`);

		if (cachedUserGuilds) {
			return cachedUserGuilds;
		}

		const userGuilds = await this.discordService.getCurrentUserGuilds(accessToken);

		await this.cacheService.set<UserGuild[]>(
			`user:guilds:${userId}`,
			userGuilds,
			GuildsService.USER_GUILDS_CACHE_TTL,
		);

		return userGuilds;
	}
}
