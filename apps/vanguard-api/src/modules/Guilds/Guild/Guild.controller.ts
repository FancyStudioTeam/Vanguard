import type { RESTGetAPIGuildResponse } from '@vanguard/api-types/rest';

import { Controller, Get, HttpStatus, Inject, Param, Redirect } from '@nestjs/common';

import { BypassAuth } from '#common/Decorators/BypassAuth.js';
import { BypassGuildPermissions } from '#common/Decorators/BypassGuildPermissionsKey.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { ParserService } from '#modules/Parser/Parser.service.js';
import { createGuildInviteUrl } from '#utils/URL/createGuildInviteUrl.js';

@Controller()
export class GuildController {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(ParserService) private readonly parserService: ParserService,
	) {}

	@Get()
	protected async getGuild(@Param('guildId') guildId: string): Promise<RESTGetAPIGuildResponse> {
		const guild = await this.discordService.getGuild(guildId);
		const guildParsed = this.parserService.parseDiscordGuild(guild);

		return guildParsed;
	}

	@Get('invite')
	@Redirect()

	@BypassAuth()
	@BypassGuildPermissions()
	protected redirectToGuildInvite(@Param('guildId') guildId: string): Record<string, unknown> {
		return {
			statusCode: HttpStatus.FOUND,
			url: createGuildInviteUrl(guildId),
		};
	}
}
