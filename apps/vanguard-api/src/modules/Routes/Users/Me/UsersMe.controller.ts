import { Controller, Get, Session } from '@nestjs/common';
import { UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Cookie.js';

@Controller('users/@me')
export class UsersMeController {
	@Get()
	public handleGet(@Session() fastifySession: FastifySession) {
		const user = fastifySession.get('user');

		if (!user) {
			throw UNAUTHORIZED_RESPONSE();
		}

		return user;
	}
}
