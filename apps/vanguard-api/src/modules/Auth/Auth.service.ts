import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DiscordService } from '#modules/Discord/Discord.service.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';

@Injectable()
export class AuthService {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(JwtService) private readonly jwtService: JwtService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	public async signInWithDiscord(code: string): Promise<string> {
		const {
			access_token: accessToken,
			expires_in: expiresIn,
			refresh_token: refreshToken,
			token_type: tokenType,
		} = await this.discordService.getUserAccess(code);
		const { id: userId } = await this.discordService.getCurrentUser(accessToken);

		const sessionId = this.sessionsService.generateSessionId();

		await this.sessionsService.createSession(sessionId, userId, {
			accessToken,
			expiresIn,
			refreshToken,
			tokenType,
		});

		return await this.signJsonWebToken(sessionId, userId);
	}

	public async signJsonWebToken(sessionId: string, userId: string): Promise<string> {
		return await this.jwtService.signAsync({
			sid: sessionId,
			sub: userId,
		});
	}
}
