import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { ParserModule } from '#modules/Parser/Parser.module.js';
import { DiscordService } from './Discord.service.js';

@Module({
	exports: [
		DiscordService,
	],
	imports: [
		CacheModule.register(),
		ParserModule,
	],
	providers: [
		DiscordService,
	],
})
export class DiscordModule {}
