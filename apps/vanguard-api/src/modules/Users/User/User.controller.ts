import type { GetDiscordUser } from '@vanguard/api-contracts/rest';

import { Controller, Get, Inject } from '@nestjs/common';

import { BypassGuildPermissions } from '#common/Decorators/BypassGuildPermissionsKey.js';
import { SessionId } from '#common/Decorators/SessionId.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { ParserService } from '#modules/Parser/Parser.service.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';

@Controller()
@BypassGuildPermissions()
export class UserController {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(ParserService) private readonly parserService: ParserService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get()
	protected async getCurrentUser(@SessionId() sessionId: string): Promise<GetDiscordUser> {
		const currentUserAccessToken = await this.sessionsService.getAccessToken(sessionId);

		const currentUser = await this.discordService.getCurrentUser(currentUserAccessToken);
		const currentUserParsed = this.parserService.parseDiscordUser(currentUser);

		return currentUserParsed;
	}
}
