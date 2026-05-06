import { Inject, Injectable } from '@nestjs/common';

import { UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE, UNABLE_TO_GET_USER_INFORMATION_RESPONSE } from '#lib/Responses/Auth.js';
import type { User, UserAccessResult } from '#lib/Types/Discord.js';
import { DiscordService } from '#modules/Utils/Discord/Discord.service.js';

@Injectable()
export class AuthService {
	public constructor(@Inject(DiscordService) private readonly discordService: DiscordService) {}

	public async getCurrentUser(accessToken: string): Promise<User> {
		try {
			return await this.discordService.getCurrentUser(accessToken);
		} catch {
			throw UNABLE_TO_GET_USER_INFORMATION_RESPONSE();
		}
	}

	public async getUserAccess(code: string): Promise<UserAccessResult> {
		try {
			return await this.discordService.exchangeToken(code);
		} catch {
			throw UNABLE_TO_EXCHANGE_AUTHORIZATION_CODE_RESPONSE();
		}
	}
}
