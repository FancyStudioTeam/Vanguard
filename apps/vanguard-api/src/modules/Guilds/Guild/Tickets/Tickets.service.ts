import type { GuildTicketPanel, GuildTicketsConfiguration } from '@vanguard/prisma';

import { Inject, Injectable } from '@nestjs/common';
import { DiscordSnowflake } from '@sapphire/snowflake';

import { PrismaService } from '#modules/Prisma/Prisma.service.js';

@Injectable()
export class TicketsService {
	public constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

	public get guildTicketPanel() {
		return this.prismaService.guildTicketPanel;
	}

	public get guildTicketsConfiguration() {
		return this.prismaService.guildTicketsConfiguration;
	}

	public async createGuildTicketPanel(guildId: string, options: CreateGuildTicketPanelOptions): Promise<GuildTicketPanel> {
		const { channelId, title } = options;

		const panelIdBigInt = DiscordSnowflake.generate();
		const panelId = panelIdBigInt.toString();

		return await this.guildTicketPanel.create({
			data: {
				channelId,
				guildId,
				panelId,
				title,
			},
		});
	}

	public async getGuildTicketsConfiguration(guildId: string): Promise<
		GuildTicketsConfiguration & {
			panels: GuildTicketPanel[];
		}
	> {
		return await this.guildTicketsConfiguration.upsert({
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

interface CreateGuildTicketPanelOptions {
	channelId: string;
	title: string;
}
