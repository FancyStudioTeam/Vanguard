/*
 * biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: Biome
 * falsely reports unused private members when extracting them from 'this'.
 */

import { Controller, Get, Inject, Session } from '@nestjs/common';
import { UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { SessionsService } from '#modules/Utils/Sessions/Sessions.service.js';
import { GuildsService } from './Guilds.service.js';

@Controller('guilds')
export class GuildsController {
	public constructor(
		@Inject(GuildsService) private readonly guildsService: GuildsService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get()
	public async handleGuilds(@Session() fastifySession: FastifySession) {
		const { guildsService, sessionsService } = this;

		const sessionId = fastifySession.get('sessionId');
		const sessionUserId = fastifySession.get('sessionUserId');

		if (!(sessionId && sessionUserId)) {
			throw UNAUTHORIZED_RESPONSE();
		}

		const userAccessToken = await sessionsService.getAccessToken(sessionId);
		const userGuilds = await guildsService.getGuilds(sessionUserId, userAccessToken);

		return userGuilds;
	}
}
