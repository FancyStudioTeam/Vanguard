import type { RESTGetAPIUserGuildsResponse } from '@vanguard/api-types/rest';

import { Controller, Get, Inject, UseGuards } from '@nestjs/common';

import { SessionId } from '#common/Decorators/SessionId.js';
import { SessionUserId } from '#common/Decorators/SessionUserId.js';
import { SessionGuard } from '#common/Guards/SessionGuard.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';

@Controller()
@UseGuards(SessionGuard(false))
export class GuildsController {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get()
	protected async getCurrentUserGuilds(
		@SessionId() sessionId: string,
		@SessionUserId() sessionUserId: string,
	): Promise<RESTGetAPIUserGuildsResponse> {
		const currentUserAccessToken = await this.sessionsService.getAccessToken(sessionId);
		const currentUserGuilds = await this.discordService.getCurrentUserGuilds(sessionUserId, currentUserAccessToken);

		return currentUserGuilds;
	}
}
