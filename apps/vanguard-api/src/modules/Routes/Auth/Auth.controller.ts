/*
 * biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: Biome
 * falsely reports unused private members when extracting them from 'this'.
 */

import { Controller, Get, Inject, Redirect, Req, Session } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { BASE_DASHBOARD_URL } from '#lib/Constants/Shared.js';
import { MISSING_QUERY_STRING_PARAM_RESPONSE, UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Cookie.js';
import { DiscordService } from '#modules/Utils/Discord/Discord.service.js';
import { EncryptionService } from '#modules/Utils/Encryption/Encryption.service.js';
import { SessionsService } from '#modules/Utils/Sessions/Sessions.service.js';
import { AuthService } from './Auth.service.js';

@Controller('auth')
export class AuthController {
	public constructor(
		@Inject(AuthService) private readonly authService: AuthService,
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(EncryptionService) private readonly encryptionService: EncryptionService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get('callback')
	@Redirect(BASE_DASHBOARD_URL)
	public async handleCallback(
		@Req() fastifyRequest: FastifyCallbackRequest,
		@Session() fastifySession: FastifySession,
	) {
		const { discordService, encryptionService, sessionsService } = this;

		const { query } = fastifyRequest;
		const { code } = query;

		if (!code) {
			throw MISSING_QUERY_STRING_PARAM_RESPONSE('code');
		}

		const { accessToken, refreshToken } = await discordService.exchangeToken(code);
		const user = await discordService.getCurrentUser(accessToken);

		const sessionId = sessionsService.generateSessionId();

		const encryptedAccessToken = encryptionService.encrypt(accessToken);
		const encryptedRefreshToken = encryptionService.encrypt(refreshToken);

		fastifySession.set('sessionId', sessionId);
		fastifySession.set('user', user);

		const { id } = user;

		await sessionsService.createDatabaseSession({
			accessToken: encryptedAccessToken,
			refreshToken: encryptedRefreshToken,
			sessionId,
			userId: id,
		});
	}

	@Get('session')
	public async handleSession(@Session() fastifySession: FastifySession) {
		const { authService, sessionsService } = this;

		const sessionId = fastifySession.get('sessionId');
		const user = fastifySession.get('user');

		if (!(sessionId && user)) {
			throw UNAUTHORIZED_RESPONSE();
		}

		const { id } = user;

		const accessToken = await sessionsService.getAccessToken(sessionId);
		const guilds = await authService.getGuilds(id, accessToken);

		return {
			guilds,
			user,
		};
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
