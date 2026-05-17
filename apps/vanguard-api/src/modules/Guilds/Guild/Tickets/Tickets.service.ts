import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '#modules/Prisma/Prisma.service.js';

@Injectable()
export class TicketsService {
	public constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

	public get guildTicketsConfig() {
		return this.prismaService.guildTicketsConfig;
	}

	public async getGuildTicketsConfiguration(guildId: string) {
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
