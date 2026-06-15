import type { RouteTree } from '@nestjs/core';

import { GuildModule } from './Guild.module.js';

export const GuildRoutes: RouteTree = {
	module: GuildModule,
	path: ':guildId',
};
