import { type CanActivate, type ExecutionContext, Inject, Injectable, mixin, type Type } from '@nestjs/common';
import { PermissionFlagsBits } from 'discord-api-types/v10';
import type { FastifyRequest } from 'fastify';

import { FORBIDDEN_RESPONSE, UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { SessionsService } from '#modules/Sessions/Sessions.service.js';
import { hasPermission } from '#utils/Discord/hasPermission.js';

export function SessionGuard(withPermissions: boolean = false): Type<CanActivate> {
	@Injectable()
	class SessionGuardMixin implements CanActivate {
		public constructor(
			@Inject(DiscordService) private readonly discordService: DiscordService,
			@Inject(SessionsService) private readonly sessionsService: SessionsService,
		) {}

		public async canActivate(context: ExecutionContext): Promise<boolean> {
			const httpContext = context.switchToHttp();

			const fastifyRequest = httpContext.getRequest<FastifyRequest>();
			const fastifySession = fastifyRequest.session as FastifySession;

			const sessionId = fastifySession.get('sessionId');
			const sessionUserId = fastifySession.get('sessionUserId');

			if (!(sessionId && sessionUserId)) {
				throw UNAUTHORIZED_RESPONSE();
			}

			if (withPermissions) {
				const fastifyParams: object = fastifyRequest.params ?? {};
				const fastifyGuildId = Reflect.get(fastifyParams, 'guildId');

				if (!fastifyGuildId) {
					throw FORBIDDEN_RESPONSE();
				}

				const currentUserAccessToken = await this.sessionsService.getAccessToken(sessionId);
				const currentUserPermissions = await this.discordService.getGuildMemberPermissions(
					fastifyGuildId,
					sessionUserId,
					currentUserAccessToken,
				);

				if (!hasPermission(currentUserPermissions, PermissionFlagsBits.ManageGuild)) {
					throw FORBIDDEN_RESPONSE();
				}
			}

			fastifyRequest.sessionId = sessionId;
			fastifyRequest.sessionUserId = sessionUserId;

			return true;
		}
	}

	return mixin(SessionGuardMixin);
}
