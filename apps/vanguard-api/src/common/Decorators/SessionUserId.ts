import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

export const SessionUserId = createParamDecorator((_: unknown, context: ExecutionContext) => {
	const httpContext = context.switchToHttp();

	const fastifyRequest = httpContext.getRequest<FastifyRequest>();
	const { sessionUserId } = fastifyRequest;

	return sessionUserId;
});
