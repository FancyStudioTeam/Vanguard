import type { GetDiscordUserResult } from '@vanguard/api-contracts/rest';

import { Controller, Get, Inject, Session } from '@nestjs/common';

import { BypassGuildPermissions } from '#common/Decorators/BypassGuildPermissionsKey.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { UserService } from './User.service.js';

@Controller()
@BypassGuildPermissions()
export class UserController {
	public constructor(@Inject(UserService) private readonly userService: UserService) {}

	@Get()
	protected async getCurrentUser(
		@Session() fastifySession: FastifySession,
	): Promise<GetDiscordUserResult> {
		return await this.userService.getCurrentUser(fastifySession);
	}
}
