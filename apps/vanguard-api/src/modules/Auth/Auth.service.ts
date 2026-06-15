import { Inject, Injectable } from '@nestjs/common';

import type { FastifySession } from '#lib/Types/Fastify.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { EncryptionService } from '#modules/Encryption/Encryption.service.js';

@Injectable()
export class AuthService {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(EncryptionService) private readonly encryptionService: EncryptionService,
	) {}

	private static ONE_SECOND_MILLISECONDS = 1_000 as const;

	public getAccessToken(fastifySession: FastifySession): string {
		const accessToken = fastifySession.get('accessToken') ?? '';

		return this.encryptionService.decrypt(accessToken);
	}

	public async signInWithDiscord(code: string): Promise<SignInWithDiscordResult> {
		const {
			access_token: accessToken,
			expires_in: expiresIn,
			refresh_token: refreshToken,
			token_type: tokenType,
		} = await this.discordService.getUserAccess(code);
		const { id: userId } = await this.discordService.getCurrentUser(accessToken);

		const accessTokenExpiresIn = Date.now() + expiresIn * AuthService.ONE_SECOND_MILLISECONDS;

		const encryptedAccessToken = this.encryptionService.encrypt(accessToken);
		const encryptedRefreshToken = this.encryptionService.encrypt(refreshToken);

		return {
			accessToken: encryptedAccessToken,
			accessTokenExpiresIn,
			accessTokenType: tokenType,
			refreshToken: encryptedRefreshToken,
			userId,
		};
	}
}

interface SignInWithDiscordResult {
	accessToken: string;
	accessTokenExpiresIn: number;
	accessTokenType: string;
	refreshToken: string;
	userId: string;
}
