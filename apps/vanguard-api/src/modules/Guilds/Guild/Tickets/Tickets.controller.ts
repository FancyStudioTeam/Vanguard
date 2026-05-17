import type { RESTGetAPIGuildTicketsConfigurationResponse, RESTPostAPIGuildTicketPanelResponse } from '@vanguard/api-types/rest';

import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';

import { SessionGuard } from '#common/Guards/SessionGuard.js';
import { ZodValidationPipe } from '#common/Pipes/ZodValidation.pipe.js';
import { ParserService } from '#modules/Parser/Parser.service.js';
import { CreateGuildTicketPanelSchema, type CreateGuildTicketPanelSchemaDto } from './Schemas/CreateGuildTicketPanel.js';
import { TicketsService } from './Tickets.service.js';

@Controller()
@UseGuards(SessionGuard(true))
export class TicketsController {
	public constructor(
		@Inject(ParserService) private readonly parserService: ParserService,
		@Inject(TicketsService) private readonly ticketsService: TicketsService,
	) {}

	@Post('panels')
	protected async createGuildTicketPanel(
		@Body(new ZodValidationPipe(CreateGuildTicketPanelSchema)) createGuildTicketPanelData: CreateGuildTicketPanelSchemaDto,
		@Param('guildId') guildId: string,
	): Promise<RESTPostAPIGuildTicketPanelResponse> {
		const { channel_id: channelId, title } = createGuildTicketPanelData;

		const ticketPanel = await this.ticketsService.createGuildTicketPanel(guildId, {
			channelId,
			title,
		});
		const ticketPanelParsed = this.parserService.parseGuildTicketPanel(ticketPanel);

		return ticketPanelParsed;
	}

	@Get()
	protected async getTicketsConfiguration(@Param('guildId') guildId: string): Promise<RESTGetAPIGuildTicketsConfigurationResponse> {
		const ticketsConfiguration = await this.ticketsService.getGuildTicketsConfiguration(guildId);
		const ticketsConfigurationParsed = this.parserService.parseGuildTicketsConfiguration(ticketsConfiguration);

		return ticketsConfigurationParsed;
	}
}
