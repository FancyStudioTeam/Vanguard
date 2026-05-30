import type {
	CreatePrismaGuildTicketPanel,
	GetPrismaGuildTicketsConfiguration,
} from '@vanguard/api-contracts/rest';

import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { ButtonStyle, ChannelType, ComponentType, MessageFlags } from 'discord-api-types/v10';

import { ZodValidationPipe } from '#common/Pipes/ZodValidation.js';
import { DiscordService } from '#modules/Discord/Discord.service.js';
import { ParserService } from '#modules/Parser/Parser.service.js';
import { InvalidTextChannelTypeException } from './Exceptions/InvalidTextChannelType.js';
import {
	CreateGuildTicketPanelSchema,
	type CreateGuildTicketPanelSchemaDto,
} from './Schemas/CreateGuildTicketPanel.js';
import { TicketsService } from './Tickets.service.js';

@Controller()
export class TicketsController {
	public constructor(
		@Inject(DiscordService) private readonly discordService: DiscordService,
		@Inject(ParserService) private readonly parserService: ParserService,
		@Inject(TicketsService) private readonly ticketsService: TicketsService,
	) {}

	@Post('panels')
	protected async createGuildTicketPanel(
		@Body(new ZodValidationPipe(CreateGuildTicketPanelSchema))
		createGuildTicketPanelData: CreateGuildTicketPanelSchemaDto,
		@Param('guildId') guildId: string,
	): Promise<CreatePrismaGuildTicketPanel> {
		const { channel_id: channelId, title } = createGuildTicketPanelData;

		const { type } = await this.discordService.getChannel(channelId);

		if (type !== ChannelType.GuildText) {
			throw InvalidTextChannelTypeException();
		}

		const ticketPanel = await this.ticketsService.createGuildTicketPanel(guildId, {
			channelId,
			title,
		});
		const ticketPanelParsed = this.parserService.parseGuildTicketPanel(ticketPanel);

		const ticketPanelId = ticketPanel.panelId;

		await this.discordService.createMessage(channelId, {
			components: [
				{
					components: [
						{
							content: '**Click the button below to create a ticket**',
							type: ComponentType.TextDisplay,
						},
						{
							type: ComponentType.Separator,
						},
						{
							components: [
								{
									custom_id: `ticket_panel:${ticketPanelId}`,
									label: 'Create Ticket',
									style: ButtonStyle.Secondary,
									type: ComponentType.Button,
								},
							],
							type: ComponentType.ActionRow,
						},
					],
					type: ComponentType.Container,
				},
			],
			flags: MessageFlags.IsComponentsV2,
		});

		return ticketPanelParsed;
	}

	@Delete('panels/:panelId')
	protected async deleteGuildTicketPanel(
		@Param('guildId') guildId: string,
		@Param('panelId') panelId: string,
	): Promise<unknown> {
		return await this.ticketsService.deleteGuildTicketPanel(guildId, panelId);
	}

	@Get()
	protected async getTicketsConfiguration(
		@Param('guildId') guildId: string,
	): Promise<GetPrismaGuildTicketsConfiguration> {
		const ticketsConfiguration =
			await this.ticketsService.getGuildTicketsConfiguration(guildId);
		const ticketsConfigurationParsed =
			this.parserService.parseGuildTicketsConfiguration(ticketsConfiguration);

		return ticketsConfigurationParsed;
	}
}
