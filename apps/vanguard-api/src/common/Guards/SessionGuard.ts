import { type CanActivate, type ExecutionContext, Injectable } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

import { UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Fastify.js';

@Injectable()
export class SessionGuard implements CanActivate {
	public canActivate(context: ExecutionContext): boolean {
		const httpContext = context.switchToHttp();

		const fastifyRequest = httpContext.getRequest<FastifyRequest>();
		const fastifySession = fastifyRequest.session as FastifySession;

		const sessionId = fastifySession.get('sessionId');
		const sessionUserId = fastifySession.get('sessionUserId');

		if (!(sessionId && sessionUserId)) {
			throw UNAUTHORIZED_RESPONSE();
		}

		fastifyRequest.sessionId = sessionId;
		fastifyRequest.sessionUserId = sessionUserId;

		return true;
	}
}
