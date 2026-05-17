import type { GuildTicketPanel, GuildTicketsConfiguration } from '@vanguard/prisma';

import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '#modules/Prisma/Prisma.service.js';

@Injectable()
export class TicketsService {
	public constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

	public get guildTicketsConfig() {
		return this.prismaService.guildTicketsConfiguration;
	}

	public async getGuildTicketsConfiguration(guildId: string): Promise<
		GuildTicketsConfiguration & {
			panels: GuildTicketPanel[];
		}
	> {
		return await this.guildTicketsConfig.upsert({
			create: {
				guildId,
			},
			include: {
				panels: true,
			},
			update: {},
			where: {
				guildId,
			},
		});
	}
}
