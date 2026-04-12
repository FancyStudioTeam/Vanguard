import { Controller, Get, HttpStatus, Inject, Param, Redirect, Session } from '@nestjs/common';
import { PermissionFlagsBits } from 'discord-api-types/v10';
import { UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { DiscordService } from '#modules/Utils/Discord/Discord.service.js';
import { SessionsService } from '#modules/Utils/Sessions/Sessions.service.js';
import { hasPermission } from '#utils/Discord/hasPermission.js';
import { createGuildInviteUrl } from '#utils/URL/createGuildInviteUrl.js';

@Controller('guilds/:guildId')
export class GuildsGuildController {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(SessionsService) private readonly sessionsService: SessionsService,
	) {}

	@Get()
	public async handleIndex(@Param('guildId') guildId: string, @Session() fastifySession: FastifySession) {
		const sessionId = fastifySession.get('sessionId');
		const sessionUserId = fastifySession.get('sessionUserId');

		if (!(sessionId && sessionUserId)) {
			throw UNAUTHORIZED_RESPONSE();
		}

		const userAccessToken = await this.sessionsService.getAccessToken(sessionId);
		const userPermissions = await this.discordService.getGuildMemberPermissions(
			userAccessToken,
			guildId,
			sessionUserId,
		);

		if (!hasPermission(userPermissions, PermissionFlagsBits.ManageGuild)) {
			throw UNAUTHORIZED_RESPONSE();
		}

		return await this.discordService.getGuild(guildId);
	}

	@Get('invite')
	@Redirect()
	public handleInvite(@Param('guildId') guildId: string) {
		return {
			statusCode: HttpStatus.FOUND,
			url: createGuildInviteUrl(guildId),
		};
	}
}
