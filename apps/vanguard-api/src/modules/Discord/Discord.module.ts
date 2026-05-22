import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { DiscordService } from './Discord.service.js';

@Module({
	exports: [
		DiscordService,
	],
	imports: [
		CacheModule.register(),
	],
	providers: [
		DiscordService,
	],
})
export class DiscordModule {}
