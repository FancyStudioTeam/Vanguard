import { Controller, Get, HttpStatus, Inject, Query, Redirect, Session } from '@nestjs/common';

import { BypassAuth } from '#common/Decorators/BypassAuth.js';
import { BypassGuildPermissions } from '#common/Decorators/BypassGuildPermissionsKey.js';
import { BASE_DASHBOARD_URL } from '#lib/Constants/Shared.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { EncryptionService } from '#modules/Encryption/Encryption.service.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';
import { createRedirectUrl } from '#utils/URL/createRedirectUrl.js';
import { MissingOAuth2CodeException } from './Exceptions/MissingOAuth2CodeException.js';

@Controller('auth')
@BypassAuth()
@BypassGuildPermissions()
export class AuthController {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(EncryptionService) private readonly encryptionService: EncryptionService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get('callback')
	@Redirect(BASE_DASHBOARD_URL, HttpStatus.TEMPORARY_REDIRECT)
	protected async exchangeAuthorizationCode(
		@Query('code') code: string | undefined,
		@Session() fastifySession: FastifySession,
	): Promise<void> {
		if (!code) {
			throw new MissingOAuth2CodeException();
		}

		const { access_token: userAccessToken, refresh_token: userRefreshToken } =
			await this.discordService.getUserAccess(code);
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

		return;
	}

	@Get('sign-in')
	@Redirect(createRedirectUrl(), HttpStatus.FOUND)
	protected redirectToSignIn(): void {
		return;
	}
}
