// biome-ignore-all lint/style/useNamingConvention: (x)

import { HttpStatus } from '@nestjs/common';
import type { FastifyReply } from 'fastify';

export function INTERNAL_SERVER_ERROR_RESPONSE(
	reply: FastifyReply,
): FastifyReply {
	return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
		code: 'INTERNAL_SERVER_ERROR',
		message:
			'Something went wrong while processing your request. Please try again in a few seconds.',
	});
}

export function MISSING_QUERY_STRING_PARAM_RESPONSE(
	reply: FastifyReply,
	name: string,
): FastifyReply {
	return reply.status(HttpStatus.BAD_REQUEST).send({
		code: 'MISSING_QUERY_STRING_PARAM',
		details: {
			name,
		},
		message: `Missing query string param '${name}' from URL`,
	});
}
