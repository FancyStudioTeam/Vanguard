// biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: (x)

import { Controller, Get, Req, Res } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { COOKIE_SESSION_ID_NAME } from '#lib/Constants/Cookies.js';
import { MISSING_QUERY_STRING_PARAM_RESPONSE } from '#lib/Responses/Shared.js';
// biome-ignore lint/style/useImportType: (x)
import { AuthDiscordService, AuthService } from './Auth.service.js';

@Controller('auth')
export class AuthController {
	public constructor(
		private readonly authService: AuthService,
		private readonly authDiscordService: AuthDiscordService,
	) {}

	@Get('callback')
	public async handleCallback(
		@Req() fastifyRequest: FastifyCallbackRequest,
		@Res({
			passthrough: true,
		})
		fastifyReply: FastifyReply,
	) {
		const { authDiscordService } = this;

		const { query } = fastifyRequest;
		const { code } = query;

		if (!code) {
			throw MISSING_QUERY_STRING_PARAM_RESPONSE('code');
		}

		const accessTokenResult = await authDiscordService.exchangeToken(code);
		const _userResult = await authDiscordService.getCurrentUser(accessTokenResult);

		fastifyReply.setCookie(COOKIE_SESSION_ID_NAME, 'a');
	}
}

interface FastifyCallbackRequestQueryStringParams {
	code?: string;
}

type FastifyCallbackRequest = FastifyRequest<{
	// biome-ignore lint/style/useNamingConvention: (x)
	Querystring: FastifyCallbackRequestQueryStringParams;
}>;
