import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { DiscordParserModule } from '#modules/DiscordParser/DiscordParser.module.js';
import { DiscordService } from './Discord.service.js';

@Module({
	exports: [
		DiscordService,
	],
	imports: [
		CacheModule.register(),
		DiscordParserModule,
	],
	providers: [
		DiscordService,
	],
})
export class DiscordModule {}
