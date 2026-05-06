import { Controller, Get, HttpStatus, Inject, Param, Redirect } from '@nestjs/common';
import { PermissionFlagsBits } from 'discord-api-types/v10';

import { SessionId } from '#common/Decorators/SessionId.js';
import { SessionUserId } from '#common/Decorators/SessionUserId.js';
import { UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { DiscordUtilsService } from '#modules/DiscordUtils/DiscordUtils.service.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';
import { createGuildInviteUrl } from '#utils/URL/createGuildInviteUrl.js';

@Controller(':guildId')
export class GuildController {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(DiscordUtilsService) private readonly discordUtilsService: DiscordUtilsService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get()
	protected async getGuild(@Param('guildId') guildId: string, @SessionId() sessionId: string, @SessionUserId() sessionUserId: string) {
		const currentUserAccessToken = await this.sessionsService.getAccessToken(sessionId);
		const currentUserPermissions = await this.discordService.getGuildMemberPermissions(guildId, sessionUserId, currentUserAccessToken);

		if (!this.discordUtilsService.hasPermission(currentUserPermissions, PermissionFlagsBits.ManageGuild)) {
			throw UNAUTHORIZED_RESPONSE();
		}

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
