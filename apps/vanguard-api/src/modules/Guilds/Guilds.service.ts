import type { APIUserGuild } from '@vanguard/api-contracts/interfaces';

import { Inject, Injectable } from '@nestjs/common';

import type { FastifySession } from '#lib/Types/Fastify.js';
import { AuthService } from '#modules/Auth/Auth.service.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { ParserService } from '#modules/Parser/Parser.service.js';

@Injectable()
export class GuildsService {
	public constructor(
		@Inject(AuthService) private readonly authService: AuthService,
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(ParserService) private readonly parserService: ParserService,
	) {}

	public async getCurrentUserGuilds(fastifySession: FastifySession): Promise<APIUserGuild[]> {
		const accessToken = this.authService.getAccessToken(fastifySession);
		const userId = fastifySession.get('userId') ?? '';

		const currentUserGuilds = await this.discordService.getCurrentUserGuilds(
			userId,
			accessToken,
		);
		const currentUserGuildsParsed =
			this.parserService.parseDiscordUserGuilds(currentUserGuilds);

		return currentUserGuildsParsed;
	}
}
