import type { RESTGetAPIUserGuildsResponse } from '@vanguard/api-types/rest';

import { Controller, Get, Inject } from '@nestjs/common';

import { BypassGuildPermissions } from '#common/Decorators/BypassGuildPermissionsKey.js';
import { SessionId } from '#common/Decorators/SessionId.js';
import { SessionUserId } from '#common/Decorators/SessionUserId.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { ParserService } from '#modules/Parser/Parser.service.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';

@Controller()
@BypassGuildPermissions()
export class GuildsController {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(ParserService) private readonly parserService: ParserService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get()
	protected async getCurrentUserGuilds(
		@SessionId() sessionId: string,
		@SessionUserId() sessionUserId: string,
	): Promise<RESTGetAPIUserGuildsResponse> {
		const currentUserAccessToken = await this.sessionsService.getAccessToken(sessionId);

		const currentUserGuilds = await this.discordService.getCurrentUserGuilds(sessionUserId, currentUserAccessToken);
		const currentUserGuildsParsed = this.parserService.parseDiscordUserGuilds(currentUserGuilds);

		return currentUserGuildsParsed;
	}
}
