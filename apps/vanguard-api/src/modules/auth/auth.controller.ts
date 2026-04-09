import { Controller, Get, Req, Res } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { MISSING_QUERY_STRING_PARAM_RESPONSE } from '#lib/Responses/Shared.js';

@Controller('auth')
export class AuthController {
	@Get('callback')
	handleCallback(
		@Req() fastifyRequest: CallbackRequest,
		@Res() fastifyReply: FastifyReply,
	) {
		const { query } = fastifyRequest;
		const { code } = query;

		if (!code) {
			return MISSING_QUERY_STRING_PARAM_RESPONSE(fastifyReply, 'code');
		}
	}
}

interface CallbackRequestQueryStringParams {
	code?: string;
}

type CallbackRequest = FastifyRequest<{
	// biome-ignore lint/style/useNamingConvention: (x)
	Querystring: CallbackRequestQueryStringParams;
}>;
