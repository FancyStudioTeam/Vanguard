import { Controller, Get, Inject, Session } from '@nestjs/common';

import { UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';

@Controller('users/@me')
export class UserController {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get()
	public async getCurrentUser(@Session() fastifySession: FastifySession) {
		const sessionId = fastifySession.get('sessionId');
		const sessionUserId = fastifySession.get('sessionUserId');

		if (!(sessionId && sessionUserId)) {
			throw UNAUTHORIZED_RESPONSE();
		}

		const currentUserAccessToken = await this.sessionsService.getAccessToken(sessionId);
		const currentUser = await this.discordService.getCurrentUser(currentUserAccessToken);

		return currentUser;
	}
}
