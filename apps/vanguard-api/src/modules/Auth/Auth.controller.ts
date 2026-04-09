// biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: (x)

import { Controller, Get, Redirect, Req, Res } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { COOKIE_SESSION_ID_NAME } from '#lib/Constants/Cookies.js';
import { MISSING_QUERY_STRING_PARAM_RESPONSE } from '#lib/Responses/Shared.js';
import type { EncryptionService } from '#services/EncryptionService.js';
// biome-ignore lint/style/useImportType: (x)
import { AuthDiscordService, AuthService } from './Auth.service.js';

@Controller('auth')
export class AuthController {
	public constructor(
		private readonly authService: AuthService,
		private readonly authDiscordService: AuthDiscordService,

		private readonly encryptionService: EncryptionService,
	) {}

	@Get('callback')
	@Redirect('http://localhost:3000')
	public async handleCallback(
		@Req() fastifyRequest: FastifyCallbackRequest,
		@Res({
			passthrough: true,
		})
		fastifyReply: FastifyReply,
	) {
		const { authDiscordService, authService, encryptionService } = this;

		const { query } = fastifyRequest;
		const { code } = query;

		if (!code) {
			throw MISSING_QUERY_STRING_PARAM_RESPONSE('code');
		}

		const accessTokenResult = await authDiscordService.exchangeToken(code);
		const userResult = await authDiscordService.getCurrentUser(accessTokenResult);

		const { access_token, refresh_token } = accessTokenResult;
		const { id } = userResult;

		const sessionId = authService.generateSessionId();

		const encryptedAccessToken = encryptionService.encrypt(access_token);
		const encryptedRefreshToken = encryptionService.encrypt(refresh_token);

		fastifyReply.setCookie(COOKIE_SESSION_ID_NAME, sessionId, {
			sameSite: 'lax',
			secure: true,
		});

		await authService.createSession({
			_id: sessionId,
			accessToken: encryptedAccessToken,
			refreshToken: encryptedRefreshToken,
			userId: id,
		});
	}
}

interface FastifyCallbackRequestQueryStringParams {
	code?: string;
}

type FastifyCallbackRequest = FastifyRequest<{
	// biome-ignore lint/style/useNamingConvention: (x)
	Querystring: FastifyCallbackRequestQueryStringParams;
}>;
