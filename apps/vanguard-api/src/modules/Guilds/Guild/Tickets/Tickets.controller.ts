import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';

import { SessionGuard } from '#common/Guards/SessionGuard.js';
import { TicketsService } from './Tickets.service.js';

@Controller()
@UseGuards(SessionGuard(true))
export class TicketsController {
	public constructor(@Inject(TicketsService) private readonly ticketsService: TicketsService) {}

	@Get()
	protected async getTicketsConfiguration(@Param('guildId') guildId: string) {
		const ticketsConfiguration = await this.ticketsService.getGuildTicketsConfiguration(guildId);

		return ticketsConfiguration;
	}
}
