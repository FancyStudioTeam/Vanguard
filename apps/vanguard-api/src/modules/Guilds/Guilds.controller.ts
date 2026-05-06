import { Controller, Get, Inject, UseGuards } from '@nestjs/common';

import { SessionId } from '#common/Decorators/SessionId.js';
import { SessionUserId } from '#common/Decorators/SessionUserId.js';
import { SessionGuard } from '#common/Guards/SessionGuard.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';
import { GuildsService } from './Guilds.service.js';

@Controller()
@UseGuards(SessionGuard)
export class GuildsController {
	public constructor(
		@Inject(GuildsService) private readonly guildsService: GuildsService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get()
	protected async getCurrentUserGuilds(@SessionId() sessionId: string, @SessionUserId() sessionUserId: string) {
		const currentUserAccessToken = await this.sessionsService.getAccessToken(sessionId);
		const currentUserGuilds = await this.guildsService.getGuilds(sessionUserId, currentUserAccessToken);

		return currentUserGuilds;
	}
}
