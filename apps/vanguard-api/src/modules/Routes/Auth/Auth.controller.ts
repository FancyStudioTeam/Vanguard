/*
 * biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: Biome
 * falsely reports unused private members when extracting them from 'this'.
 */

import { Controller, Get, HttpStatus, Inject, Query, Redirect, Session } from '@nestjs/common';
import { BASE_DASHBOARD_URL } from '#lib/Constants/Shared.js';
import {
	UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE,
	UNABLE_TO_GET_USER_INFORMATION_RESPONSE,
} from '#lib/Responses/Auth.js';
import { MISSING_QUERY_STRING_PARAM_RESPONSE } from '#lib/Responses/Shared.js';
import type { User, UserAccessResult } from '#lib/Types/Discord.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { DiscordService } from '#modules/Utils/Discord/Discord.service.js';
import { EncryptionService } from '#modules/Utils/Encryption/Encryption.service.js';
import { SessionsService } from '#modules/Utils/Sessions/Sessions.service.js';
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
	public async handleCallback(@Query('code') code: string | undefined, @Session() fastifySession: FastifySession) {
		const { discordService, encryptionService, sessionsService } = this;

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

		const { id: userId } = user;

		fastifySession.set('sessionId', sessionId);
		fastifySession.set('sessionUser', user);
		fastifySession.set('sessionUserId', userId);

		await sessionsService.createDatabaseSession({
			accessToken: encryptedAccessToken,
			refreshToken: encryptedRefreshToken,
			sessionId,
			userId,
		});
	}

	@Get('sign-in')
	@Redirect(createRedirectUrl(), HttpStatus.TEMPORARY_REDIRECT)
	/*
	 * biome-ignore lint/suspicious/noEmptyBlockStatements: This handler is
	 * already handled by decorators.
	 */
	public handleSignIn() {}
}
