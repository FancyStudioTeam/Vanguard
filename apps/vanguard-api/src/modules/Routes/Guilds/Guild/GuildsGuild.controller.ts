/*
 * biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: Biome
 * falsely reports unused private members when extracting them from 'this'.
 */

import { Controller, Get, HttpStatus, Inject, Param, Redirect, Session } from '@nestjs/common';
import { UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { DiscordService } from '#modules/Utils/Discord/Discord.service.js';
import { createGuildInviteUrl } from '#utils/URL/createGuildInviteUrl.js';

@Controller('guilds/:guildId')
export class GuildsGuildController {
	public constructor(@Inject(DiscordService) private readonly discordService: DiscordService) {}

	@Get()
	public async handleIndex(@Param('guildId') guildId: string, @Session() fastifySession: FastifySession) {
		const sessionId = fastifySession.get('sessionId');

		if (!sessionId) {
			throw UNAUTHORIZED_RESPONSE();
		}

		const { discordService } = this;
		const guild = await discordService.getGuild(guildId);

		return guild;
	}

	@Get('invite')
	@Redirect()
	public handleInvite(@Param('guildId') guildId: string) {
		const guildInviteUrl = createGuildInviteUrl(guildId);

		return {
			statusCode: HttpStatus.FOUND,
			url: guildInviteUrl,
		};
	}
}
