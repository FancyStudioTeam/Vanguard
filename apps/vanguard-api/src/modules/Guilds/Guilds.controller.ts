import type { RESTGetAPIUserGuilds } from '@vanguard/api-contracts/rest';

import { Controller, Get, HttpCode, HttpStatus, Inject, Put, Session } from '@nestjs/common';

import { BypassGuildPermissions } from '#common/Decorators/BypassGuildPermissionsKey.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { GuildsService } from './Guilds.service.js';

@Controller()
@BypassGuildPermissions()
export class GuildsController {
	public constructor(@Inject(GuildsService) private readonly guildsService: GuildsService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	protected async getCurrentUserGuilds(
		@Session() fastifySession: FastifySession,
	): Promise<RESTGetAPIUserGuilds> {
		return await this.guildsService.getCurrentUserGuilds(fastifySession);
	}

	@Put()
	@HttpCode(HttpStatus.NO_CONTENT)
	protected async updateBotProfile(): Promise<void> {}
}
