import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { DiscordUtilsModule } from '#modules/DiscordUtils/DiscordUtils.module.js';
import { DiscordService } from './Discord.service.js';

@Module({
	exports: [
		DiscordService,
	],
	imports: [
		CacheModule.register(),
		DiscordUtilsModule,
	],
	providers: [
		DiscordService,
	],
})
export class DiscordModule {}
