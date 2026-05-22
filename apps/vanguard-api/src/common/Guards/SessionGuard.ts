import { type CanActivate, type ExecutionContext, Inject, Injectable, mixin, type Type } from '@nestjs/common';
import { PermissionFlagsBits } from 'discord-api-types/v10';
import type { FastifyRequest } from 'fastify';

import { BAD_REQUEST_RESPONSE, FORBIDDEN_RESPONSE, UNAUTHORIZED_RESPONSE } from '#lib/Responses/Shared.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { hasPermission } from '#utils/Discord/hasPermission.js';

export function SessionGuard(withPermissions: boolean = false): Type<CanActivate> {
	@Injectable()
	class SessionGuardMixin implements CanActivate {
		public constructor(@Inject(DiscordService) private readonly discordService: DiscordService) {}

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
					throw BAD_REQUEST_RESPONSE();
				}

				const guild = await this.discordService.getGuild(fastifyGuildId);
				const guildMember = await this.discordService.getGuildMember(fastifyGuildId, sessionUserId);

				const permissions = this.discordService.permissionsOf(guild, guildMember);

				if (!hasPermission(permissions, PermissionFlagsBits.ManageGuild)) {
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
