import { Injectable, type NestMiddleware } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { logger } from '#lib/Logger.js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	public use(
		fastifyRequest: FastifyRequest,
		fastifyReply: FastifyReply,
		fastifyNext: FastifyNextFunction,
	): void {
		const { ip, method, originalUrl } = fastifyRequest;
		const { statusCode } = fastifyReply;

		logger.info(`[${method}] '${originalUrl}' (${ip}) [${statusCode}]`);

		fastifyNext();
	}
}

type FastifyNextFunction = () => unknown;
