import { Controller, Get, Session } from '@nestjs/common';
import { UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Fastify.js';

@Controller('users/@me')
export class MeController {
	@Get()
	public handleIndex(@Session() fastifySession: FastifySession) {
		const sessionId = fastifySession.get('sessionId');
		const sessionUser = fastifySession.get('sessionUser');
		const sessionUserId = fastifySession.get('sessionUserId');

		if (!(sessionId && sessionUser && sessionUserId)) {
			throw UNAUTHORIZED_RESPONSE();
		}

		return sessionUser;
	}
}
