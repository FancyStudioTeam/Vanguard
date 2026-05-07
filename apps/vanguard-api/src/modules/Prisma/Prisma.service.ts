import { PrismaAdapter, PrismaClient } from '@vanguard/prisma/client';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService {
	private readonly prisma: PrismaClient;

	public constructor() {
		this.prisma = new PrismaClient({
			adapter: PrismaAdapter,
		});
	}

	public async createGuildTicketsConfig(guildId: string) {
		return await this.prisma.guildTicketsConfig.create({
			data: {
				guildId,
			},
		});
	}

	public async getGuildTicketsConfig(guildId: string) {
		return await this.prisma.guildTicketsConfig.findUnique({
			select: {
				panels: true,
			},
			where: {
				guildId,
			},
		});
	}
}
