/*
 * biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: Biome
 * falsely reports unused private members when extracting them from 'this'.
 */

import { Controller, Get, Inject, Redirect, Req, Session } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { BASE_DASHBOARD_URL } from '#lib/Constants/Shared.js';
import { MISSING_QUERY_STRING_PARAM_RESPONSE, UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Cookie.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { EncryptionService } from '#modules/Encryption/Encryption.service.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';
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

		const { access_token, refresh_token } = await discordService.exchangeToken(code);
		const { avatar, global_name, id, username } = await discordService.getCurrentUser(access_token);

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
			...user,
			guilds,
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
