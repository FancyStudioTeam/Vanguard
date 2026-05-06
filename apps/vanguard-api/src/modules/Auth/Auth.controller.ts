import { Controller, Get, HttpStatus, Inject, Query, Redirect, Session } from '@nestjs/common';

import { BASE_DASHBOARD_URL } from '#lib/Constants/Shared.js';
import { MISSING_QUERY_STRING_PARAM_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { EncryptionService } from '#modules/Encryption/Encryption.service.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';
import { createRedirectUrl } from '#utils/URL/createRedirectUrl.js';

@Controller('auth')
export class AuthController {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(EncryptionService) private readonly encryptionService: EncryptionService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get('callback')
	@Redirect(BASE_DASHBOARD_URL, HttpStatus.TEMPORARY_REDIRECT)
	public async exchangeAuthorizationCode(@Query('code') code: string | undefined, @Session() fastifySession: FastifySession) {
		if (!code) {
			throw MISSING_QUERY_STRING_PARAM_RESPONSE('code');
		}

		const { accessToken: userAccessToken, refreshToken: userRefreshToken } = await this.discordService.getUserAccess(code);
		const { id: userId } = await this.discordService.getCurrentUser(userAccessToken);

		const sessionId = this.sessionsService.generateSessionId();

		const encryptedAccessToken = this.encryptionService.encrypt(userAccessToken);
		const encryptedRefreshToken = this.encryptionService.encrypt(userRefreshToken);

		fastifySession.set('sessionId', sessionId);
		fastifySession.set('sessionUserId', userId);

		await this.sessionsService.createDatabaseSession({
			accessToken: encryptedAccessToken,
			refreshToken: encryptedRefreshToken,
			sessionId,
			userId,
		});
	}

	@Get('sign-in')
	@Redirect(createRedirectUrl(), HttpStatus.TEMPORARY_REDIRECT)
	/*
	 * biome-ignore lint/suspicious/noEmptyBlockStatements: This method is
	 * already handled by decorators.
	 */
	public redirectToSignIn() {}
}
