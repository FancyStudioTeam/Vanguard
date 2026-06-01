import { Controller, Get, HttpStatus, Inject, Query, Redirect, Response } from '@nestjs/common';
import type { FastifyReply } from 'fastify';

import { BypassAuth } from '#common/Decorators/BypassAuth.js';
import { BypassGuildPermissions } from '#common/Decorators/BypassGuildPermissionsKey.js';
import { ACCESS_TOKEN_COOKIE_MAX_AGE, ACCESS_TOKEN_COOKIE_NAME } from '#lib/Constants/Cookies.js';
import { BASE_DASHBOARD_URL } from '#lib/Constants/Shared.js';
import { createRedirectUrl } from '#utils/URL/createRedirectUrl.js';
import { AuthService } from './Auth.service.js';
import { RequiredOAuth2CodePipe } from './Pipes/RequiredOAuth2CodePipe.js';

// TODO: Implement a "sign-out" handler to invalidate the current session.

@Controller('auth')
@BypassAuth()
@BypassGuildPermissions()
export class AuthController {
	public constructor(@Inject(AuthService) private readonly authService: AuthService) {}

	@Get('callback')
	@Redirect(BASE_DASHBOARD_URL, HttpStatus.FOUND)
	protected async handleDiscordCallback(
		@Query('code', RequiredOAuth2CodePipe) code: string,
		@Response({
			passthrough: true,
		})
		fastifyReply: FastifyReply,
	): Promise<void> {
		const jsonWebToken = await this.authService.signInWithDiscord(code);

		fastifyReply.cookie(ACCESS_TOKEN_COOKIE_NAME, jsonWebToken, {
			httpOnly: true,
			maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
			path: '/',
			sameSite: 'lax',
			secure: true,
		});
	}

	@Get('sign-in')
	@Redirect(createRedirectUrl(), HttpStatus.FOUND)
	/*
	 * biome-ignore lint/suspicious/noEmptyBlockStatements: This handler already
	 * uses the 'Redirect' decorator.
	 */
	protected redirectToSignIn(): void {}
}
