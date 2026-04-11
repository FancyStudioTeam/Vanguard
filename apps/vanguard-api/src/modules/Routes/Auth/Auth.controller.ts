/*
 * biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: Biome
 * falsely reports unused private members when extracting them from 'this'.
 */

import { Controller, Get, Inject, Redirect, Req, Session } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { BASE_DASHBOARD_URL } from '#lib/Constants/Shared.js';
import {
	UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE,
	UNABLE_TO_GET_USER_INFORMATION_RESPONSE,
} from '#lib/Responses/Auth.js';
import { MISSING_QUERY_STRING_PARAM_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Cookie.js';
import { DiscordService } from '#modules/Utils/Discord/Discord.service.js';
import { EncryptionService } from '#modules/Utils/Encryption/Encryption.service.js';
import { SessionsService } from '#modules/Utils/Sessions/Sessions.service.js';
import type { User, UserAccessResult } from '#types/Discord.js';

@Controller('auth')
export class AuthController {
	public constructor(
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

		let userAccessResult: UserAccessResult;

		try {
			userAccessResult = await discordService.exchangeToken(code);
		} catch {
			throw UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE();
		}

		const { accessToken, refreshToken } = userAccessResult;

		let user: User;

		try {
			user = await discordService.getCurrentUser(accessToken);
		} catch {
			throw UNABLE_TO_GET_USER_INFORMATION_RESPONSE();
		}

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
}

type FastifyCallbackRequest = FastifyRequest<{
	/*
	 * biome-ignore lint/style/useNamingConvention: This convention comes from an
	 * external API, which cannot be Overwritten.
	 */
	Querystring: {
		code?: string;
	};
}>;
