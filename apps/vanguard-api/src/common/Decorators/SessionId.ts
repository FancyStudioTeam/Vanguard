import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

export const SessionId = createParamDecorator((_: unknown, context: ExecutionContext) => {
	const httpContext = context.switchToHttp();

	const fastifyRequest = httpContext.getRequest<FastifyRequest>();
	const { sessionId } = fastifyRequest;

	return sessionId;
});
