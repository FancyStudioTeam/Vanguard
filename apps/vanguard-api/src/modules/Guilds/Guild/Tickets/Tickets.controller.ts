import type { CreatePrismaGuildTicketPanel, GetPrismaGuildTicketsConfiguration } from '@vanguard/api-contracts/rest';

import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';

import { ZodValidationPipe } from '#common/Pipes/ZodValidation.pipe.js';
import { ParserService } from '#modules/Parser/Parser.service.js';
import { CreateGuildTicketPanelSchema, type CreateGuildTicketPanelSchemaDto } from './Schemas/CreateGuildTicketPanel.js';
import { TicketsService } from './Tickets.service.js';

@Controller()
export class TicketsController {
	public constructor(
		@Inject(ParserService) private readonly parserService: ParserService,
		@Inject(TicketsService) private readonly ticketsService: TicketsService,
	) {}

	@Post('panels')
	protected async createGuildTicketPanel(
		@Body(new ZodValidationPipe(CreateGuildTicketPanelSchema)) createGuildTicketPanelData: CreateGuildTicketPanelSchemaDto,
		@Param('guildId') guildId: string,
	): Promise<CreatePrismaGuildTicketPanel> {
		const { channel_id: channelId, title } = createGuildTicketPanelData;

		const ticketPanel = await this.ticketsService.createGuildTicketPanel(guildId, {
			channelId,
			title,
		});
		const ticketPanelParsed = this.parserService.parseGuildTicketPanel(ticketPanel);

		return ticketPanelParsed;
	}

	@Delete('panels/:panelId')
	protected async deleteGuildTicketPanel(@Param('guildId') guildId: string, @Param('panelId') panelId: string): Promise<unknown> {
		return await this.ticketsService.deleteGuildTicketPanel(guildId, panelId);
	}

	@Get()
	protected async getTicketsConfiguration(@Param('guildId') guildId: string): Promise<GetPrismaGuildTicketsConfiguration> {
		const ticketsConfiguration = await this.ticketsService.getGuildTicketsConfiguration(guildId);
		const ticketsConfigurationParsed = this.parserService.parseGuildTicketsConfiguration(ticketsConfiguration);

		return ticketsConfigurationParsed;
	}
}
