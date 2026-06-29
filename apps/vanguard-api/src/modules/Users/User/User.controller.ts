import type { RESTGetAPIUser } from '@vanguard/api-contracts/rest';

import { Controller, Get, HttpCode, HttpStatus, Inject, Session } from '@nestjs/common';

import { BypassGuildPermissions } from '#common/Decorators/BypassGuildPermissionsKey.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { UserService } from './User.service.js';

@Controller()
@BypassGuildPermissions()
export class UserController {
	public constructor(@Inject(UserService) private readonly userService: UserService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	protected async getCurrentUser(
		@Session() fastifySession: FastifySession,
	): Promise<RESTGetAPIUser> {
		return await this.userService.getCurrentUser(fastifySession);
	}
}
