import { type CanActivate, type ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionFlagsBits } from 'discord-api-types/v10';
import type { FastifyRequest } from 'fastify';

import { BypassAuthKey } from '#common/Decorators/BypassAuth.js';
import { BypassGuildPermissionsKey } from '#common/Decorators/BypassGuildPermissionsKey.js';
import { BadRequestException } from '#common/Exceptions/BadRequestException.js';
import { ForbiddenException } from '#common/Exceptions/ForbiddenException.js';
import { UnauthorizedException } from '#common/Exceptions/UnauthorizedException.js';
import type { FastifySession } from '#lib/Types/Fastify.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { hasPermission } from '#utils/Discord/hasPermission.js';

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(Reflector) private readonly reflector: Reflector,
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const contextHandler = context.getHandler();
		const contextClass = context.getClass();

		const shouldBypassAuth = this.shouldBypassAuthGuard(contextHandler, contextClass);
		const shouldBypassGuildPermissions = this.shouldBypassGuildPermissionsGuard(
			contextHandler,
			contextClass,
		);

		if (shouldBypassAuth) {
			return true;
		}

		const httpContext = context.switchToHttp();

		const fastifyRequest = httpContext.getRequest<FastifyRequest>();
		const fastifySession = fastifyRequest.session as FastifySession;

		const sessionAccessToken = fastifySession.get('accessToken');
		const sessionRefreshToken = fastifySession.get('refreshToken');

		const sessionUserId = fastifySession.get('userId');

		const isValidFastifySession = Boolean(
			sessionUserId && sessionAccessToken && sessionRefreshToken,
		);

		if (!isValidFastifySession) {
			throw new UnauthorizedException();
		}

		if (!shouldBypassGuildPermissions) {
			const fastifyParams: object = fastifyRequest.params ?? {};
			const fastifyGuildId = Reflect.get(fastifyParams, 'guildId');

			if (!fastifyGuildId) {
				throw new BadRequestException();
			}

			const guild = await this.discordService.getGuild(fastifyGuildId);
			const guildMember = await this.discordService.getGuildMember(
				fastifyGuildId,
				String(sessionUserId),
			);

			const permissions = this.discordService.permissionsOf(guild, guildMember);

			if (!hasPermission(permissions, PermissionFlagsBits.ManageGuild)) {
				throw new ForbiddenException();
			}
		}

		return true;
	}

	private shouldBypassAuthGuard(
		contextHandler: ExecutionContextHandler,
		contextClass: ExecutionContextClass,
	): boolean {
		return (
			this.reflector.getAllAndOverride<boolean>(BypassAuthKey, [
				contextHandler,
				contextClass,
			]) ?? false
		);
	}

	private shouldBypassGuildPermissionsGuard(
		contextHandler: ExecutionContextHandler,
		contextClass: ExecutionContextClass,
	): boolean {
		return (
			this.reflector.getAllAndOverride<boolean>(BypassGuildPermissionsKey, [
				contextHandler,
				contextClass,
			]) ?? false
		);
	}
}

type ExecutionContextClass = ReturnType<ExecutionContext['getClass']>;
type ExecutionContextHandler = ReturnType<ExecutionContext['getHandler']>;
