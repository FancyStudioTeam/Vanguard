import { Module } from '@nestjs/common';

import { DiscordUtilsService } from './DiscordUtils.service.js';

@Module({
	exports: [
		DiscordUtilsService,
	],
	providers: [
		DiscordUtilsService,
	],
})
export class DiscordUtilsModule {}
