import type { RESTGetAPIGuildTicketsConfiguration } from '@vanguard/api-types/rest';

import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';

import { SessionGuard } from '#common/Guards/SessionGuard.js';
import { ParserService } from '#modules/Parser/Parser.service.js';
import { TicketsService } from './Tickets.service.js';

@Controller()
@UseGuards(SessionGuard(true))
export class TicketsController {
	public constructor(
		@Inject(ParserService) private readonly parserService: ParserService,
		@Inject(TicketsService) private readonly ticketsService: TicketsService,
	) {}

	@Get()
	protected async getTicketsConfiguration(@Param('guildId') guildId: string): Promise<RESTGetAPIGuildTicketsConfiguration> {
		const ticketsConfiguration = await this.ticketsService.getGuildTicketsConfiguration(guildId);
		const ticketsConfigurationParsed = this.parserService.parseGuildTicketsConfiguration(ticketsConfiguration);

		return ticketsConfigurationParsed;
	}
}
