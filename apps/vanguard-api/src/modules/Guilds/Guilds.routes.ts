import type { RouteTree } from '@nestjs/core';

import { GuildRoutes } from './Guild/Guild.routes.js';
import { GuildsModule } from './Guilds.module.js';

export const GuildsRoutes: RouteTree = {
	children: [
		GuildRoutes,
	],
	module: GuildsModule,
	path: 'guilds',
};
