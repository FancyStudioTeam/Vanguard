import {
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Query,
	Redirect,
	Session,
} from '@nestjs/common';

import { BypassAuth } from '#common/Decorators/BypassAuth.js';
import { BypassGuildPermissions } from '#common/Decorators/BypassGuildPermissionsKey.js';
import { BASE_DASHBOARD_URL } from '#lib/Constants/Shared.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { createRedirectUrl } from '#utils/URL/createRedirectUrl.js';
import { AuthService } from './Auth.service.js';
import { RequiredOAuth2CodePipe } from './Pipes/RequiredOAuth2CodePipe.js';

@Controller('auth')
@BypassAuth()
@BypassGuildPermissions()
export class AuthController {
	public constructor(@Inject(AuthService) private readonly authService: AuthService) {}

	@Get('callback')
	@Redirect(BASE_DASHBOARD_URL, HttpStatus.FOUND)
	protected async signInWithDiscord(
		@Query('code', RequiredOAuth2CodePipe) code: string,
		@Session() fastifySession: FastifySession,
	): Promise<void> {
		const { accessToken, accessTokenExpiresIn, accessTokenType, refreshToken, userId } =
			await this.authService.signInWithDiscord(code);

		fastifySession.set('accessToken', accessToken);
		fastifySession.set('accessTokenExpiresIn', accessTokenExpiresIn);
		fastifySession.set('accessTokenType', accessTokenType);

		fastifySession.set('refreshToken', refreshToken);

		fastifySession.set('userId', userId);
	}

	@Get('sign-in')
	@Redirect(createRedirectUrl(), HttpStatus.FOUND)
	/*
	 * biome-ignore lint/suspicious/noEmptyBlockStatements: This handler already
	 * uses the 'Redirect' decorator.
	 */
	protected redirectToSignIn(): void {}

	@Delete('sign-out')
	@HttpCode(HttpStatus.NO_CONTENT)
	protected signOut(@Session() fastifySession: FastifySession): void {
		fastifySession.delete();
	}
}
