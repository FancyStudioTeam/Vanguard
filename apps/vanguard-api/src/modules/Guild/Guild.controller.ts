import { Controller, Get, HttpStatus, Inject, Param, Redirect, UseGuards } from '@nestjs/common';

import { SessionGuard } from '#common/Guards/SessionGuard.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { createGuildInviteUrl } from '#utils/URL/createGuildInviteUrl.js';

@Controller()
export class GuildController {
	public constructor(@Inject(DiscordService) private readonly discordService: DiscordService) {}

	@Get()
	@UseGuards(SessionGuard(true))
	protected async getGuild(@Param('guildId') guildId: string) {
		return await this.discordService.getGuild(guildId);
	}

	@Get('invite')
	@Redirect()
	protected redirectToGuildInvite(@Param('guildId') guildId: string) {
		return {
			statusCode: HttpStatus.FOUND,
			url: createGuildInviteUrl(guildId),
		};
	}
}
