import type { RESTGetAPIUserResponse } from '@vanguard/api-types/rest';

import { Controller, Get, Inject, UseGuards } from '@nestjs/common';

import { SessionId } from '#common/Decorators/SessionId.js';
import { SessionGuard } from '#common/Guards/SessionGuard.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';

@Controller()
@UseGuards(SessionGuard(false))
export class UserController {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get()
	protected async getCurrentUser(@SessionId() sessionId: string): Promise<RESTGetAPIUserResponse> {
		const currentUserAccessToken = await this.sessionsService.getAccessToken(sessionId);
		const currentUser = await this.discordService.getCurrentUser(currentUserAccessToken);

		return currentUser;
	}
}
