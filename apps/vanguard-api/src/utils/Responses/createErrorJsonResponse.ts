import type { HttpStatus } from '@nestjs/common';
import type { FastifyReply } from 'fastify';

export function createErrorJsonResponse(
	reply: FastifyReply,
	options: CreateErrorJsonResponseOptions,
): FastifyReply {
	const { data, statusCode } = options;

	return reply.status(statusCode).send({
		...data,
	});
}

interface CreateErrorJsonResponseOptions {
	data: CreateErrorJsonResponseOptionsData;
	statusCode: HttpStatus;
}

interface CreateErrorJsonResponseOptionsData {
	code: string;
	details?: Record<string, unknown>;
	message: string;
}
