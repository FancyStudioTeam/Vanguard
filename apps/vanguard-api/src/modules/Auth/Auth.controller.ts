/*
 * biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: Biome
 * falsely reports unused private members when extracting them from 'this'.
 */

import { Controller, Get, Inject, Redirect, Req, Session } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { BASE_DASHBOARD_URL } from '#lib/Constants/Shared.js';
import { MISSING_QUERY_STRING_PARAM_RESPONSE, UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Cookie.js';
import { EncryptionService } from '#modules/Encryption/Encryption.service.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';
import { AuthDiscordService } from './Auth.service.js';

@Controller('auth')
export class AuthController {
	public constructor(
		@Inject(AuthDiscordService) private readonly authDiscordService: AuthDiscordService,
		@Inject(EncryptionService) private readonly encryptionService: EncryptionService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get('callback')
	@Redirect(BASE_DASHBOARD_URL)
	public async handleCallback(
		@Req() fastifyRequest: FastifyCallbackRequest,
		@Session() fastifySession: FastifySession,
	) {
		const { authDiscordService, encryptionService, sessionsService } = this;

		const { query } = fastifyRequest;
		const { code } = query;

		if (!code) {
			throw MISSING_QUERY_STRING_PARAM_RESPONSE('code');
		}

		const accessTokenResult = await authDiscordService.exchangeToken(code);
		const userResult = await authDiscordService.getCurrentUser(accessTokenResult);

		const { access_token, refresh_token } = accessTokenResult;
		const { avatar, global_name, id, username } = userResult;

		const sessionId = sessionsService.generateSessionId();

		const encryptedAccessToken = encryptionService.encrypt(access_token);
		const encryptedRefreshToken = encryptionService.encrypt(refresh_token);

		fastifySession.set('sessionId', sessionId);
		fastifySession.set('user', {
			avatar,
			globalName: global_name,
			id,
			username,
		});

		await sessionsService.createDatabaseSession({
			accessToken: encryptedAccessToken,
			refreshToken: encryptedRefreshToken,
			sessionId,
			userId: id,
		});
	}

	@Get('session')
	public handleSession(@Session() fastifySession: FastifySession) {
		const user = fastifySession.get('user') ?? '';

		if (!user) {
			throw UNAUTHORIZED_RESPONSE();
		}

		return user;
	}
}

interface FastifyCallbackRequestQueryStringParams {
	code?: string;
}

type FastifyCallbackRequest = FastifyRequest<{
	/*
	 * biome-ignore lint/style/useNamingConvention: This convention comes from an
	 * external API, which cannot be overwriten.
	 */
	Querystring: FastifyCallbackRequestQueryStringParams;
}>;
