import type { APIUser } from '@vanguard/api-contracts/interfaces';

import { Inject, Injectable } from '@nestjs/common';

import type { FastifySession } from '#lib/Types/Fastify.js';
import { AuthService } from '#modules/Auth/Auth.service.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { ParserService } from '#modules/Parser/Parser.service.js';

@Injectable()
export class UserService {
	public constructor(
		@Inject(AuthService) private readonly authService: AuthService,
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(ParserService) private readonly parserService: ParserService,
	) {}

	public async getCurrentUser(fastifySession: FastifySession): Promise<APIUser> {
		const accessToken = this.authService.getAccessToken(fastifySession);

		const currentUser = await this.discordService.getCurrentUser(accessToken);
		const currentUserParsed = this.parserService.parseDiscordUser(currentUser);

		return currentUserParsed;
	}
}
