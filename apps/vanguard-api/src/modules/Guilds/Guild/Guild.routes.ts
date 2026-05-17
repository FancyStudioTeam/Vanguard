import type { RouteTree } from '@nestjs/core';

import { GuildModule } from './Guild.module.js';
import { TicketsModule } from './Tickets/Tickets.module.js';

export const GuildRoutes: RouteTree = {
	children: [
		{
			module: TicketsModule,
			path: 'tickets',
		},
	],
	module: GuildModule,
	path: ':guildId',
};
