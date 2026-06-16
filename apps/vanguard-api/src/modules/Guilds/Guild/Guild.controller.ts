import type { GetDiscordGuildResult } from '@vanguard/api-contracts/rest';

import { Controller, Get, HttpCode, HttpStatus, Inject, Param, Redirect } from '@nestjs/common';

import { BypassAuth } from '#common/Decorators/BypassAuth.js';
import { BypassGuildPermissions } from '#common/Decorators/BypassGuildPermissionsKey.js';
import { createGuildInviteUrl } from '#utils/URL/createGuildInviteUrl.js';
import { GuildService } from './Guild.service.js';

@Controller()
export class GuildController {
	public constructor(@Inject(GuildService) private readonly guildService: GuildService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	protected async getGuild(@Param('guildId') guildId: string): Promise<GetDiscordGuildResult> {
		return await this.guildService.getGuild(guildId);
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
