import { Controller, Get, Session } from '@nestjs/common';
import { UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Fastify.js';

@Controller('users/@me')
export class UsersMeController {
	@Get()
	public handleGet(@Session() fastifySession: FastifySession) {
		const sessionUser = fastifySession.get('sessionUser');

		if (!sessionUser) {
			throw UNAUTHORIZED_RESPONSE();
		}

		return sessionUser;
	}
}
